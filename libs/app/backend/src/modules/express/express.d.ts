import type { Nullish } from '@core/shared';
import type { PrincipalDto } from '@app/shared';

declare global {
  namespace Express {
    export interface Request {
      principal?: PrincipalDto | Nullish;
    }
  }
}
