import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ConfigEnvironment } from './app/app.constant';
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

  console.log('ENV: ', configService);
  console.log('ENV2: ', process.env.HOST);

  const host = configService.get(configService.get(`${ConfigEnvironment.APP}.host`));
  const port = configService.get(configService.get('PORT'));

  console.log('HOST: ', host, ' PORT: ', port);

  // await app.listen(port, host);

  // Logger.log(`🚀 Application is running on: http://${host}:${port}/${globalPrefix}`);
}

bootstrap();
