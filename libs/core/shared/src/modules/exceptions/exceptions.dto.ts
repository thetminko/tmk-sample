export class ExceptionDto {
  traceId: string | number | object;
  statusCode: number;
  message: string;
  path: string;
  constructor(traceId: string | number | object, statusCode: number, message: string | object, path: string) {
    this.traceId = traceId;
    this.statusCode = statusCode;

    let msg = message as string;
    if (typeof message === 'object' && message !== null && 'message' in message) {
      msg = message['message'] as string;
    }

    this.message = msg;
    this.path = path;
  }
}
