import { createNestApp } from '@core/backend';
import { ApiModule } from './api/api.module';
import { EnvService } from '@app/backend';
import cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const { app, globalPrefix } = await createNestApp({
    appModule: ApiModule
  });

  const envService = app.get(EnvService);
  const port = envService.get('API_PORT');
  const env = envService.get('ENVIRONMENT');

  app.use(cookieParser());

  if (env === 'development') {
    // setup swagger
  }

  await app.listen(port);

  Logger.log(`Instance type: ${envService.get('INSTANCE_TYPE')}`);
  Logger.log(`Running environment: ${env}`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
