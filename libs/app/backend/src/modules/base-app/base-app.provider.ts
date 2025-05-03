import { HttpExceptionFilter } from '@core/backend';
import type { Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

export const baseAppProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }
];
