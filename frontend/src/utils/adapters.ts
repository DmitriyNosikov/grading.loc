import { ProductTypeEnum } from '@backend/libs/types';
import { CreateProductDTO, CreateProductRDO } from '@shared/product';

export function adaptProductToClient(product: CreateProductRDO): CreateProductRDO {
  product.type = adaptTypeToClient(product.type) as ProductTypeEnum;

  return product;
}

export function adaptProductsToClient(products: CreateProductRDO[]): CreateProductRDO[] {
  return products.map((product) => adaptProductToClient(product)) as CreateProductRDO[];
}

function adaptTypeToClient(type: string) {
  switch(type) {
    case('acoustic'): return 'guitar';
    case('electro'): return 'el-guitar';
    case('ukulele'): return 'ukulele';
    default: return type;
  }
}

function adaptTypeToServer(type: string) {
  switch(type) {
    case('guitar'): return 'acoustic';
    case('el-guitar'): return 'electro';
    case('ukulele'): return 'ukulele';
    default: return type;
  }
}

export function adaptProductToServer(product: CreateProductRDO): CreateProductDTO {
  product.type = adaptTypeToServer(product.type) as ProductTypeEnum;

  return product as CreateProductDTO;
}

export function adaptProductsToServer(products: CreateProductRDO[]): CreateProductRDO[] {
  return products.map((product) => adaptProductToClient(product)) as CreateProductRDO[];
}
