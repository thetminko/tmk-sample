import { Logger, UnauthorizedException, type CanActivate, type ExecutionContext } from '@nestjs/common';
import type { Nullish, ValueOf } from '@core/shared';
import { authguardMetadata } from './auth.const.js';
import type { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';
import type { Request } from 'express';

export type Authority<T> = T extends string ? string : number;

export abstract class BaseAuthGuard<Principal, Authority> implements CanActivate {
  private readonly map = new Map<number, ValueOf<typeof authguardMetadata>>();
  private readonly logger = new Logger(BaseAuthGuard.name);

  //! This order matters
  constructor(protected readonly reflector: Reflector) {
    this.map.set(0, authguardMetadata.PUBLIC);
    this.map.set(1, authguardMetadata.IS_AUTHENTICATED);
    this.map.set(2, authguardMetadata.REQUIRE_ALL);
    this.map.set(3, authguardMetadata.REQUIRE_ANY);
    this.map.set(4, authguardMetadata.NOT_WITH_AUTHORITY);
  }

  protected abstract getRequest(context: ExecutionContext): Request;

  protected abstract getPrincipal(context: ExecutionContext): Principal | Nullish;

  protected abstract getAuthorities(principal: Principal): Authority[] | Nullish;

  protected checker(type: ValueOf<typeof authguardMetadata>, authorities: unknown, context: ExecutionContext) {
    const principal = this.getPrincipal(context);

    switch (type) {
      case authguardMetadata.PUBLIC:
        if (authorities) {
          return true;
        }
        throw new UnauthorizedException();

      case authguardMetadata.IS_AUTHENTICATED:
        if (!!authorities && !!principal) {
          return true;
        }
        throw new UnauthorizedException();

      case authguardMetadata.REQUIRE_ALL:
        return this.checkAuthorities(authorities as Authority[], principal, true);

      case authguardMetadata.REQUIRE_ANY:
        return this.checkAuthorities(authorities as Authority[], principal);

      case authguardMetadata.NOT_WITH_AUTHORITY:
        return !this.checkAuthorities(authorities as Authority[], principal);

      default:
        this.logger.error(`Unknown authguard type: ${type}`);
        throw new UnauthorizedException();
    }
  }

  protected checkAuthorities(authorities: Authority[], principal?: Principal | Nullish, mustHaveAll?: true): boolean {
    if (!principal) {
      this.logger.log('No principal found');
      throw new UnauthorizedException();
    }

    const principalAuthorities = this.getAuthorities(principal);
    // Return false so it will fallback to default ForbiddenException
    if (!authorities.length || !principalAuthorities?.length) {
      this.logger.log('No authorities found');
      return false;
    }

    if (mustHaveAll) {
      const hasAll = authorities.every(authority => principalAuthorities.includes(authority));
      if (!hasAll) {
        this.logger.log('Principal does not have all authorities');
        return false;
      }
    }

    const anyAuthority = authorities.some(authority => principalAuthorities.includes(authority));
    if (!anyAuthority) {
      this.logger.log('Principal does not have any authority');
      return false;
    }
    return anyAuthority;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const methodHandlers: (boolean | string | undefined)[] = [];
    this.map.forEach(value => methodHandlers.push(this.reflector.get(value, context.getHandler())));

    const idxOfNonUndefinedHandler = methodHandlers.findIndex(handler => !!handler);
    if (idxOfNonUndefinedHandler >= 0) {
      return this.checker(this.map.get(idxOfNonUndefinedHandler)!, methodHandlers[idxOfNonUndefinedHandler], context);
    }

    const classHandlers: (boolean | string | undefined)[] = [];
    this.map.forEach(value => classHandlers.push(this.reflector.get(value, context.getClass())));

    const idxOfNonUndefinedClassHandler = classHandlers.findIndex(handler => !!handler);
    if (idxOfNonUndefinedClassHandler >= 0) {
      return this.checker(
        this.map.get(idxOfNonUndefinedClassHandler)!,
        classHandlers[idxOfNonUndefinedClassHandler],
        context
      );
    }

    return false;
  }
}
