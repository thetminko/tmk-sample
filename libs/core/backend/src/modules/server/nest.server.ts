import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

import { Logger as PinoLogger } from 'nestjs-pino';

type CreateNestAppOptions = {
  appModule: unknown;
  globalPrefix?: string;
  bufferLogs?: boolean;
  securityOptions?: {
    disableCors?: boolean;
    disableHelmet?: boolean;
  };
};

const defaultOptions: Required<Omit<CreateNestAppOptions, 'ws'>> = {
  appModule: null,
  globalPrefix: 'api',
  bufferLogs: true,
  securityOptions: {
    disableCors: false,
    disableHelmet: false
  }
};

type CreateNestAppReturn = {
  app: NestExpressApplication;
  globalPrefix: string;
};

export async function createNestApp(options: CreateNestAppOptions): Promise<CreateNestAppReturn> {
  const appModule = options.appModule;
  const bufferLogs = options.bufferLogs ?? defaultOptions.bufferLogs;
  const globalPrefix = options.globalPrefix ?? defaultOptions.globalPrefix;
  const disableCors = options.securityOptions?.disableCors ?? defaultOptions.securityOptions?.disableCors;
  const disableHelmet = options.securityOptions?.disableHelmet ?? defaultOptions.securityOptions?.disableHelmet;

  const app = await NestFactory.create<NestExpressApplication>(appModule, {
    bufferLogs
  });

  app.useLogger(app.get(PinoLogger));

  if (!disableHelmet) {
    app.use(helmet());
  }

  if (!disableCors) {
    app.enableCors();
  }

  // https://expressjs.com/en/guide/behind-proxies.html
  // https://docs.nestjs.com/security/rate-limiting
  app.set('trust proxy', true);

  app.setGlobalPrefix(globalPrefix);

  return { app, globalPrefix };
}
