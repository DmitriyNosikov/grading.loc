import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ConfigEnvironment } from '../../config';
import { ConfigEnum } from '../../config/config.schema';
import { CLIModule } from './cli.module';
import { CLIService } from './cli.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CLIModule);
  const logger = new Logger('CLI App');
  const cliService = app.get(CLIService);
  const configService = app.get(ConfigService);

  logger.log(configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.HOST}`));

  cliService.execute();
}

bootstrap();
