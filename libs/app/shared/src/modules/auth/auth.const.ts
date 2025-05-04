export enum Authority {
  RESOURCE_ACTION = 'resource:action'
}

export enum AuthHeader {
  csrfToken = 'x-csrf-token'
}

export const authHeaders = [AuthHeader.csrfToken];
