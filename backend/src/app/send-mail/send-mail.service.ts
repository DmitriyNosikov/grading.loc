import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';


import { smtpConfig } from '../../config';
import { UserInterface } from '../libs/interfaces';
import { EMAIL_NEW_USER } from './send-mail.constant';

@Injectable()
export class SendMailService {
  private readonly logger = new Logger(SendMailService.name);

  constructor(private readonly mailerService: MailerService) {}

  @Inject(smtpConfig.KEY)
  private readonly smtpConfig: ConfigType<typeof smtpConfig>

  public async sendNewUserEmail(user: UserInterface) {
    this.logger.log(`Sending mail to user: ${user.email}`);

    await this.mailerService.sendMail({
      from: `👻 ${this.smtpConfig.from}`,
      to: user.email,
      subject: EMAIL_NEW_USER,
      template: './new-user',
      context: {
        user: `${user.name}`,
        email: `${user.email}`,
      }
    })
  }
}
