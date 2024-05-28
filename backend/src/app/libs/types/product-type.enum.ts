export const ProductType = {
  ELECTRO: 'electro',
  ACOUSTIC: 'acoustic',
  UKULELE: 'ukulele'
} as const;

export type ProductTypeEnum = (typeof ProductType)[keyof typeof ProductType];
export const productTypeList: ProductTypeEnum[] = ['electro', 'acoustic', 'ukulele'];
