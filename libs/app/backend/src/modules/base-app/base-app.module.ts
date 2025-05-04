import { PinoLoggerConfig } from '@core/backend';
import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';

import type { Env } from '../env/index.js';
import { EnvModule } from '../env/index.js';
import { baseAppProviders } from './base-app.provider.js';
import { authHeaders } from '@app/shared';

@Module({})
export class BaseAppModule {
  static forRoot(options: { instanceType: Env['INSTANCE_TYPE'] }): DynamicModule {
    return {
      module: BaseAppModule,
      providers: baseAppProviders,
      imports: [
        LoggerModule.forRoot(PinoLoggerConfig({ redact: { headers: authHeaders } })),
        EnvModule.forRoot(options)
        //   RedisModule.registerAsync({
        //     isGlobal: true,
        //     useFactory: (envService: EnvService) => ({
        //       host: envService.get('REDIS_HOST')!,
        //       port: envService.get('REDIS_PORT')!
        //     }),
        //     inject: [EnvService]
        //   })
      ]
    };
  }
}
