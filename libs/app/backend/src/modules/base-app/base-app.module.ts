import { PinoLoggerConfig } from '@core/backend';
import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { LoggerModule } from 'nestjs-pino';

import type { Env } from '../env/index.js';
import { EnvModule } from '../env/index.js';
import { baseAppProviders } from './base-app.provider.js';

@Module({})
export class BaseAppModule {
  static forRoot(options: { instanceType: Env['INSTANCE_TYPE'] }): DynamicModule {
    return {
      module: BaseAppModule,
      providers: baseAppProviders,
      imports: [
        LoggerModule.forRoot(PinoLoggerConfig({})),
        EnvModule.forRoot(options)
        // SequelizeModule.forRootAsync({
        //   inject: [EnvService],
        //   useFactory: (envService: EnvService) => {
        //     const logger = new Logger('SequelizeModule');

        //     return {
        //       dialect: 'mysql',
        //       username: envService.get('DB_USER'),
        //       password: envService.get('DB_PASSWORD'),
        //       host: envService.get('DB_HOST'),
        //       port: envService.get('DB_PORT'),
        //       database: 'chatsg',
        //       models: entities,
        //       synchronize: false,
        //       logging: false,
        //       // logging: msg => logger.debug(msg),
        //       timezone: '+08:00',
        //       define: {
        //         freezeTableName: true
        //       }
        //     };
        //   }
        // }),
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
