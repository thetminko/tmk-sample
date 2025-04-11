import { Module } from '@nestjs/common';
import { imports, controllers, exportedProviders } from './api.const.js';

@Module({
  imports,
  controllers,
  providers: exportedProviders
})
export class ApiModule {}
