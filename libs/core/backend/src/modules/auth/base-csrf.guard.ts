import { type CanActivate, type ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { Request } from 'express';

export abstract class BaseCsrfGuard implements CanActivate {
  private readonly methodsToProtect = new Set<string>(['POST', 'PUT', 'PATCH', 'DELETE']);

  protected abstract getReq(context: ExecutionContext): Request;

  protected abstract isValid(req: Request): boolean;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = this.getReq(context);
    const method = req.method;

    if (!this.methodsToProtect.has(method)) {
      return true;
    }

    return this.isValid(req);
  }
}
