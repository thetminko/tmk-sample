import { createParamDecorator, SetMetadata, type ExecutionContext } from '@nestjs/common';
import { authguardMetadata } from './auth.const.js';

type AuthorityType = string | number;

export const Public = () => SetMetadata(authguardMetadata.PUBLIC, true);

export const Authenticated = () => SetMetadata(authguardMetadata.IS_AUTHENTICATED, true);

export const HasAuthority =
  () =>
  <T extends AuthorityType>(...authorities: T[]) =>
    SetMetadata(authguardMetadata.REQUIRE_ALL, authorities);

export const HasAnyAuthority = <T extends AuthorityType>(...authorities: T[]) =>
  SetMetadata(authguardMetadata.REQUIRE_ANY, authorities);

export const NotWithAuthority = <T extends AuthorityType>(...authorities: T[]) =>
  SetMetadata(authguardMetadata.NOT_WITH_AUTHORITY, authorities);

export const Principal = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export const WsPrincipal = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const client = ctx.switchToWs().getClient();
  return client.user;
});
