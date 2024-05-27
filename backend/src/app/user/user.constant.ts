import { MessagesType } from '../libs/types/';

export const UserValidation = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  },
} as const;

export const UserMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'User already exists',
    NOT_FOUND: 'User not found',
    INCORRECT_CREDENTIALS: 'Incorrect user email/password',
    CANT_UPDATE: 'Can`t update user. Possible reason: Object with fields to update are empty',
    SAME_SUBSCRIPTIONS: 'User and subscribtion target can`t be the same person',
    CANT_CREATE_TOKENS: 'Can`t get get a new access/refresh tokens',
  },
  SUCCESS: {
    LOGGED_IN: 'User logged in',
    CREATED: 'User has been successfully created',
    NEW_TOKENS: 'Successfully get a new access/refresh tokens',

    FOUND: 'User found',
    UPDATED: 'User has been successfully updated',
    DELETED: 'User has been successfully deleted',
  },
  DESCRIPTION: {
    USER_DETAIL: 'Get detail info about user',
    USER_SUBSCRIBERS: 'Get all user subscribers',
    SUBSCRIBE: 'Add subscribtion to target user',
    UNSUBSCRIBE: 'Remove target user from subscription',
  },
} as const;
