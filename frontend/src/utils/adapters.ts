import { ProductTypeEnum } from '@backend/libs/types';
import { CreateProductDTO, CreateProductRDO } from '@shared/product';
import { SearchQuery } from '@shared/product/types/search/search-query.type';

export function adaptProductToClient(product: CreateProductRDO): CreateProductRDO {
  product.type = adaptTypeToClient(product.type) as ProductTypeEnum;

  return product;
}

export function adaptProductsToClient(products: CreateProductRDO[]): CreateProductRDO[] {
  return products.map((product) => adaptProductToClient(product)) as CreateProductRDO[];
}

export function adaptTypeToClient(type: string) {
  switch(type) {
    case('acoustic'): return 'guitar';
    case('electro'): return 'el-guitar';
    case('ukulele'): return 'ukulele';
    default: return type;
  }
}

export function adaptTypeToServer(type: string) {
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

export function adaptQueryParams(queryString: SearchQuery) {
  let adaptedQueryString = '';
  let tempStorage: string[] = [];

  for(const [key, value] of Object.entries(queryString)) {
    if((key === 'type' || key === 'stringsCount') && Array.isArray(value)) {
      tempStorage.push(getUrlStringFromArray(key, value));
    } else {
      tempStorage.push(`${key}=${value}`);
    }

  }

  if(tempStorage.length > 0) {
    adaptedQueryString = tempStorage.join('&');
  }

  return adaptedQueryString;
}

function getUrlStringFromArray(key: string, values: string[]): string {
  let temp = [];
  let preparedString = '';

  temp = values.map((item) => `${key}[]=${item}`)
  preparedString = temp.join('&');

  return preparedString;
}
