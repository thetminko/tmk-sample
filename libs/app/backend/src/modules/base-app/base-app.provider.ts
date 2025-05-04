import { AllExceptionFilter } from '@core/backend';
import type { Provider } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

export const baseAppProviders: Provider[] = [
  {
    provide: APP_PIPE,
    useClass: ZodValidationPipe
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionFilter
  }
];
