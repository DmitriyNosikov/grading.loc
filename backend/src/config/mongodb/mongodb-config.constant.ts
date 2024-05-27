import { MessagesType } from 'backend/src/app/libs/types';

export const DEFAULT_MONGODB_PORT = 27020;
export const DEFAULT_MONGODB_EXPRESS_PORT = 8083;

export const MongoDBMessage: MessagesType = {
  ERROR: {
    MONGODB_DBNAME_REQUIRED: '[UserValidation App MongoDB Config] database name is required',
    MONGODB_HOST_REQUIRED: '[UserValidation App MongoDB Config] host is required',
    MONGODB_USER_REQUIRED: '[UserValidation App MongoDB Config] user name is required',
    MONGODB_PASSWORD_REQUIRED: '[UserValidation App MongoDB Config] user password is required',
    MONGODB_AUTH_DATABASE_REQUIRED: '[UserValidation App MongoDB Config] auth database name is required',
  },
} as const;
