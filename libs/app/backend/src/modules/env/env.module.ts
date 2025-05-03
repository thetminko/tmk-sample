import { EnvModule as CoreEnvModule } from '@core/backend';
import { DynamicModule, Module } from '@nestjs/common';

import { envSchema } from './env.dto.js';
import { EnvService } from './env.service.js';

const providers = [EnvService];

@Module({})
export class EnvModule {
  static forRoot(options: { instanceType: string }): DynamicModule {
    return {
      global: true,
      imports: [CoreEnvModule.forRoot({ instanceType: options.instanceType, envSchema: envSchema })],
      module: EnvModule,
      providers: providers,
      exports: providers
    };
  }
}
