import { ReactElement } from 'react';
import ProductsListItem from '../products-list-item/products-list-item';

export default function ProductsList(): ReactElement {
  const mockProducts = [1, 2, 3];

  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {
          (mockProducts.length > 0) &&
          mockProducts.slice().map((product) => <ProductsListItem key={product} />)
        }
      </ul>
    </div>
  );
}
