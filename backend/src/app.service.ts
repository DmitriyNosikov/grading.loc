import { Injectable } from '@nestjs/common';
import { User } from 'shared/types/user.type';
@Injectable()
export class AppService {
  getHello(test?: User): string {
    if (test) {
      return;
    }

    return 'Hello World!';
  }
}
