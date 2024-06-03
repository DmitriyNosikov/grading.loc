export const SortType = {
  PRICE: 'price',
  CREATED_AT: 'createdAt'
} as const;

export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

export type SortTypeEnum = (typeof SortType)[keyof typeof SortType];
export type SortDirectionEnum = (typeof SortDirection)[keyof typeof SortDirection];
