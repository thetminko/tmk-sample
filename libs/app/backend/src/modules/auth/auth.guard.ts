import { Authority } from '@app/shared';
import { BaseAuthGuard } from '@core/backend';
import type { Reflector } from '@nestjs/core';
import type { EnvService } from '../env/env.service.js';
import type { ExecutionContext } from '@nestjs/common';
import type { Nullish } from '@core/shared';

export abstract class AuthGuard<Principal extends { authorities?: Authority[] }> extends BaseAuthGuard<
  Principal,
  Authority
> {
  constructor(
    protected override readonly reflector: Reflector,
    protected readonly envService: EnvService
  ) {
    super(reflector);
  }

  protected override getPrincipal(context: ExecutionContext): Principal | Nullish {
    const request = this.getRequest(context);
    return request.principal as Principal | Nullish;
  }

  protected override getAuthorities(principal: Principal): Nullish | Authority[] {
    return principal.authorities ?? [];
  }
}
