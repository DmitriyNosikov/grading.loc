import { MessagesType } from '../libs/types/';

export const ProductValidation = {
  TITLE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 100,
  },
  VENDOR_CODE: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  },
  DESCRIPTION: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  },
  STRINGS_COUNT: {
    MIN: 4
  },
  PRICE: {
    MIN: 100,
    MAX: 1000000,
  },
} as const;

export const ProductMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'Product already exists',
    NOT_FOUND: 'Product not found',
  },
  SUCCESS: {
    LOGGED_IN: 'User logged in',
    CREATED: 'User has been successfully created',
    NEW_TOKENS: 'Successfully get a new access/refresh tokens',

    FOUND: 'Product found',
    UPDATED: 'Product has been successfully updated',
    DELETED: 'Product has been successfully deleted',
  },
  DESCRIPTION: {
    PRODUCT_DETAIL: 'Get detail info about product',
  },
} as const;
