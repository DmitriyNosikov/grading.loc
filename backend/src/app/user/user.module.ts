import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BCryptHasher } from '@backend/libs/helpers';

import { UserModel, UserSchema } from './user.model';
import { UserFactory } from './user.factory';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ])
  ],
  controllers: [UserController],
  // Провайдеры модуля (API)
  providers: [
    UserService,
    UserRepository,
    UserFactory,

    {
      provide: 'Hasher',
      useClass: BCryptHasher,
    },
  ],
  //Провайдеры, доступные в других модулях при импорте данного модуля (внешнее API)
  exports: [UserFactory, UserService, UserRepository],
})
export class UserModule {}
