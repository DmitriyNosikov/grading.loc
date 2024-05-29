import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigEnvironment } from './config/config.constant';
import { ConfigEnum } from './config/config.schema';

import { AppModule } from './app/app.module';
import { generateSpecYaml } from '@backend/libs/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Генерация Swagger-документации
  const swaggerConfig = new DocumentBuilder() // Настраиваем Swagger для формирования документации
  .setTitle('The "Guitar Shop" service')
  .setDescription('Guitar Shop service API')
  .setVersion('1.0')
  .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('spec', app, swaggerDocument);

  // Генерация Spec.yml
  generateSpecYaml(swaggerDocument);

  // Запуск сервера
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
