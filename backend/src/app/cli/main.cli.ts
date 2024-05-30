import { NestFactory } from '@nestjs/core';
import { CLIModule } from './cli.module';
import { CLIService } from './cli.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CLIModule);
  const cliService = app.get(CLIService);

  cliService.execute();
}

bootstrap();
