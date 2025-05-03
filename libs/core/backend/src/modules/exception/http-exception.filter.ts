import { ExceptionDto } from '@core/shared';
import type { ArgumentsHost, ExceptionFilter as NestJsExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements NestJsExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json(new ExceptionDto(request.id, status, exception.getResponse(), request.url));
  }
}
