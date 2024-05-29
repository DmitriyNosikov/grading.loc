import { SortDirection, SortType } from '../libs/types/search/sort-type.enum'
import { MessagesType } from '../libs/types/';

export const MAX_ITEMS_PER_PAGE = 7; // Максимальное количество результатов при запросе списка
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_SORT_TYPE = SortType.CREATED_AT;
export const DEFAULT_SORT_DIRECTION = SortDirection.ASC;

export const ProductValidation = {
  TITLE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 100,
  },
  VENDOR_CODE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 40,
  },
  DESCRIPTION: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 1024,
  },
  STRINGS_COUNT: {
    MIN: 4,
    MAX: 12,
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
    FOUND: 'Product found',
    UPDATED: 'Product has been successfully updated',
    DELETED: 'Product has been successfully deleted',
  },
  DESCRIPTION: {
    PRODUCT_DETAIL: 'Get detail info about product',
  },
} as const;
