import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZodSchema } from 'zod';

import { parseConfig } from './env.validator.js';

@Module({})
export class EnvModule {
  static forRoot(options: { instanceType: string; envSchema: ZodSchema }): DynamicModule {
    return {
      global: true,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validate: config => parseConfig(options.envSchema, config, options.instanceType),
          expandVariables: true
        })
      ],
      module: EnvModule
    };
  }
}
