import { useAppSelector } from '@frontend/src/hooks';
import { getProducts } from '@frontend/src/store/slices/product-process/product-process.selectors';
import { ReactElement } from 'react';
import ProductsListItem from '../products-list-item/products-list-item';
import Spinner from '../spinner/spinner';

export default function ProductsList(): ReactElement {
  const paginatedProductsList = useAppSelector(getProducts);

  // console.log('PRODUCTS LIST: ', paginatedProductsList);

  if(!paginatedProductsList ?? paginatedProductsList.totalItems <= 0) {
    return <Spinner />;
  }

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
