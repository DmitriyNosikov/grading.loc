import { AppRoute } from '@frontend/src/const';
import { useAppDispatch } from '@frontend/src/hooks';
import { deleteProductItemAction } from '@frontend/src/store/actions/api-product-action';
import { getFormattedDate } from '@frontend/src/utils/common';
import { CreateProductRDO } from '@shared/product';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type ProductListItemProps = {
  product: CreateProductRDO
};

export default function ProductsListItem({ product }: ProductListItemProps): ReactElement {
  const dispatch = useAppDispatch();
  const productDate = product.createdAt ? getFormattedDate(new Date(product.createdAt)) : '';

  function handleDeleteProductClick() {
    if(!product.id || !confirm('Are you sure that you want to delete this product?')) {
      return;
    }

    dispatch(deleteProductItemAction(product.id));
  }

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={product.photo} srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка музыкального инструмента" />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`${AppRoute.PRODUCTS}/${product.id}`}>
            <p className="catalog-item__data-title">{product.title}</p>
          </Link>
          <br />
          <p className="catalog-item__data-date">Дата добавления {productDate}</p>
          <p className="catalog-item__data-price">{product.price}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link className="button button--small button--black-border" to={`${AppRoute.EDIT_PRODUCT}/${product.id}`} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={handleDeleteProductClick}>Удалить</button>
      </div>
    </li>
  );
}
