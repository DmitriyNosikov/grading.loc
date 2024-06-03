import { ReactElement } from 'react';

import { ProductTypeEnum } from '@backend/libs/types';
import { useAppDispatch } from '@frontend/src/hooks';
import { searchProduct } from '@frontend/src/store/actions/api-product-action';
import { SearchQuery } from '@shared/product/types/search/search-query.type';
import AddProductButton from '../../components/add-product-button/add-product-button';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumds';
import Filter from '../../components/filter/filter';
import Pagination from '../../components/pagination/pagination';
import ProductsList from '../../components/products-list/products-list';
import Sort from '../../components/sort/sort';

export default function Products(): ReactElement {
  const dispatch = useAppDispatch();

  dispatch(searchProduct({}));

  let timer: NodeJS.Timeout | null = null;

  function handleFilterChange(productType: string, selectedStringsCount: number) {
    if(timer) {
      clearInterval(timer);
    }

    let queryData: SearchQuery = {};
    const type = Array.isArray(productType) ? productType : [productType];
    const stringsCount = Array.isArray(selectedStringsCount) ? selectedStringsCount : [selectedStringsCount];

    if(type.length > 0) {
      queryData['type'] = type as ProductTypeEnum[];
    }

    if(stringsCount.length > 0) {
      queryData['stringsCount'] = stringsCount;
    }

    timer = setTimeout(() => {
      dispatch(searchProduct(queryData));
    }, 800)
  }

  return (
    <section className="product-list">
      <div className="container">
        <h1 className="product-list__title">Список товаров</h1>

        <Breadcrumbs />

        <div className="catalog">
          <Filter onChangeHandler={handleFilterChange} />
          <Sort />
          <ProductsList />
        </div>

        <AddProductButton />

        <Pagination />
      </div>
    </section>
  );
}
