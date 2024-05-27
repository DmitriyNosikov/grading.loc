import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ConfigEnvironment } from './config/config.constant';
import { ConfigEnum } from './config/config.schema';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  // Подключаем валидацию DTO на основе class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // + трансформация типов данных на основе DTO
    }),
  );

  const host = configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.HOST}`);
  const port = configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.PORT}`);

  await app.listen(port, host);

  Logger.log(`🚀 Application is running on: http://${host}:${port}/${globalPrefix}`);
}

bootstrap();
