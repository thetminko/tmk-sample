import { Module } from '@nestjs/common';
import { imports, controllers, exportedProviders } from './api.const';

@Module({
  imports,
  controllers,
  providers: exportedProviders
})
export class ApiModule {}
