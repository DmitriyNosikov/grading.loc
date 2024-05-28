import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigEnvironment, appConfig, jwtConfig, mongoDBConfig, smtpConfig } from '../config';

import { getMongooseOptions } from './libs/helpers';

import { UserModule } from './user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Cписок конфигураций для загрузки
      load: [appConfig, mongoDBConfig, jwtConfig, smtpConfig],

      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync(
      getMongooseOptions(ConfigEnvironment.MONGODB)
    ),

    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
