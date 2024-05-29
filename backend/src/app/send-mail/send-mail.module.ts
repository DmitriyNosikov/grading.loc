import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { ConfigEnvironment } from 'backend/src/config';
import { getMailerAsyncOptions } from '../libs/helpers/mailer';
import { SendMailService } from './send-mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(
      getMailerAsyncOptions(ConfigEnvironment.SMTP)
    )
  ],

  controllers: [],
  providers: [SendMailService],
  exports: [SendMailService]

})
export class SendMailModule {}
