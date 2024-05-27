import { Injectable } from '@nestjs/common';
import { AuthUserInterface, EntityFactoryInterface } from '@backend/libs/interfaces';
import { UserEntity } from './user.entity';

@Injectable()
export class UserFactory implements EntityFactoryInterface<UserEntity> {
  public create(entityPlainData: AuthUserInterface): UserEntity {
    return new UserEntity(entityPlainData);
  }
}
