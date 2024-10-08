import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import mongodbConfig from '../../config/mongodb/mongodb-config';
import { BCryptHasher } from '../libs/helpers';
import { CLIService } from './cli.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [mongodbConfig],
      envFilePath: resolve('backend/.env'),
    }),
  ],
  controllers: [],
  providers: [
    CLIService,
    {
      provide: 'Hasher',
      useClass: BCryptHasher,
    }
  ]
})
export class CLIModule {}
