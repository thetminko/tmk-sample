import { uuid } from '@core/shared';
import type { Params } from 'nestjs-pino';

function constructHeader(value: string) {
  return `req.headers["${value}"]`;
}

export interface PinoLoggerConfigOptions {
  redact?: {
    headers?: string[];
  };
}

export const PinoLoggerConfig = ({ redact }: PinoLoggerConfigOptions): Params => ({
  pinoHttp: {
    autoLogging: true,
    redact: [...(redact?.headers?.map(val => constructHeader(val)) ?? []), constructHeader('cookie')],
    genReqId: req => req.id ?? uuid(),
    level: process.env['NODE_ENV'] !== 'production' ? 'debug' : 'info',
    customLogLevel: function (_req, res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res.statusCode >= 500 || err) {
        return 'error';
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        return 'silent';
      }
      return 'info';
    },
    // install 'pino-pretty' package in order to use the following option
    transport:
      process.env['NODE_ENV'] !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true
            }
          }
        : undefined
  }
});
