import { Namespace } from '@frontend/src/const';
import { ProductStateNamespace } from '@frontend/src/types/selector';
import { CreateProductRDO, ProductWithPaginationRDO } from '@shared/product';

export function getProducts(state: ProductStateNamespace): ProductWithPaginationRDO {
  return state[Namespace.PRODUCT].paginated_products;
}

export function getProduct(state: ProductStateNamespace): CreateProductRDO | null {
  return state[Namespace.PRODUCT].product;
}
