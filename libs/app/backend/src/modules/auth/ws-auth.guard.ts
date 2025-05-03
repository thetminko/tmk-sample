import { Injectable, type ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard.js';
import type { PrincipalDto } from '@app/shared';
import type { Request } from '@core/backend';

@Injectable()
export class WsAuthGuard extends AuthGuard<PrincipalDto> {
  protected override getRequest(context: ExecutionContext): Request {
    return context.switchToWs().getClient();
  }
}
