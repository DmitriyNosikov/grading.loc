import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigEnvironment, appConfig, jwtConfig, mongoDBConfig, smtpConfig } from '../config';

import { getMongooseOptions } from './libs/helpers';

import { UserModule } from './user/user.module';

import { ProductModule } from './product/product.module';

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

    UserModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
