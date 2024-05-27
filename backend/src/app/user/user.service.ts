import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BCryptHasher } from '../libs/helpers/hasher/bcrypt.hasher';
import { validateMongoID } from '../libs/helpers/mongoose';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

import { UserMessage } from './user.constant';

@Injectable()
export class UserService {
  constructor(
    private readonly blogUserRepository: UserRepository,

    @Inject('Hasher')
    private readonly hasher: BCryptHasher
  ) {}

  public async getUserDetail(userId: string): Promise<UserEntity | null> {
    await validateMongoID(userId);

    const user = await this.blogUserRepository.findById(userId);

    if(!user) {
      throw new NotFoundException(UserMessage.ERROR.NOT_FOUND);
    }

    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    await validateMongoID(userId);

    const isUserExists = await this.blogUserRepository.exists(userId);

    if(!isUserExists) {
      return;
    }

    return await this.blogUserRepository.deleteById(userId);
  }
}
