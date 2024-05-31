import { ReactElement } from 'react';

import Breadcrumbs from '../../components/breadcrumbs/breadcrumds';
import Filter from '../../components/filter/filter';
import Sort from '../../components/sort/sort';
import ProductsList from '../../components/products-list/products-list';
import AddProductButton from '../../components/add-product-button/add-product-button';
import Pagination from '../../components/pagination/pagination';

export default function Products(): ReactElement {
  return (
    <section className="product-list">
      <div className="container">
        <h1 className="product-list__title">Список товаров</h1>

        <Breadcrumbs />

        <div className="catalog">
          <Filter />
          <Sort />
          <ProductsList />
          <AddProductButton />
          <Pagination />
        </div>
      </div>
    </section>
  );
}
