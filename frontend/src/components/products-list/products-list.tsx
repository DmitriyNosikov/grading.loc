import { useAppSelector } from '@frontend/src/hooks';
import { getProducts } from '@frontend/src/store/slices/product-process/product-process.selectors';
import { ReactElement } from 'react';
import ProductsListItem from '../products-list-item/products-list-item';

export default function ProductsList(): ReactElement {
  const paginatedProductsList = useAppSelector(getProducts);

  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {
          (
            paginatedProductsList.totalItems > 0) &&
            paginatedProductsList.entities.slice()
              .map((product) => <ProductsListItem key={product.id} product={product}/>
          )
        }
      </ul>
    </div>
  );
}
