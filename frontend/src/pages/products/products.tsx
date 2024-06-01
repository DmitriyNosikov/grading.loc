import { ReactElement } from 'react';

import { store } from '@frontend/src/store';
import { fetchProductsAction } from '@frontend/src/store/actions/api-action';
import AddProductButton from '../../components/add-product-button/add-product-button';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumds';
import Filter from '../../components/filter/filter';
import Pagination from '../../components/pagination/pagination';
import ProductsList from '../../components/products-list/products-list';
import Sort from '../../components/sort/sort';

export default function Products(): ReactElement {
  store.dispatch(fetchProductsAction());

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
