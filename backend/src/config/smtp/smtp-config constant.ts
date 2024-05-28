import { MessagesType } from '../../app/libs/types';

export const DEFAULT_SMTP_PORT = 8025
export const DEFAULT_SMTP_FROM = 'admin@grading.loc'

export const SmtpMessage: MessagesType = {
  ERROR: {
    // SMTP
    SMTP_HOST_REQUIRED: '[App SMTP Config] host is required',
    SMTP_USER_REQUIRED: '[App SMTP Config] user name is required',
    SMTP_PASSWORD_REQUIRED: '[App SMTP Config] user password is required',
  },
} as const;
