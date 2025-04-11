import { BaseAppModule } from '@app/backend';
import { ApiController } from './api.controller.js';

export const controllers = [ApiController];
export const providers = [];
export const exportedProviders = providers;

export const imports = [BaseAppModule.forRoot({ instanceType: 'api' })];
