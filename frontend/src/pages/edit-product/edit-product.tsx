import Spinner from '@frontend/src/components/spinner/spinner';
import { AppRoute } from '@frontend/src/const';
import useProductItem from '@frontend/src/hooks/useProductItem';
import { getFormattedDate } from '@frontend/src/utils/common';
import { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumds';
import SelectProductType from '../../components/select-product-type/select-product-type';
import SelectStringsCount from '../../components/select-strings-count/select-strings-count';

export default function EditProduct(): ReactElement {
  const productId = String(useParams().id);
  const productDetail = useProductItem({ productId });
  const navigate = useNavigate();

  if(!productDetail) {
    return <Spinner />;
  }

  const productDate = productDetail.createdAt ? getFormattedDate(new Date(productDetail.createdAt)) : '';
  const productType = adaptType(productDetail.type);

  function handleSaveBtnClick() {
    console.log('Saving is not implemented yet');
  }

  function handleReturnBtnClick() {
    navigate(AppRoute.MAIN);
  }

  function adaptType(type: string) {
    switch(type) {
      case('acoustic'): return 'guitar';
      case('electro'): return 'el-guitar';
      case('ukulele'): return 'ukulele';
    }
  }

  return (
    <section className="edit-item">
      <div className="container">
        <h1 className="edit-item__title">{productDetail.title}</h1>

        <Breadcrumbs />

        <form className="edit-item__form" action="#" method="get">
          <div className="edit-item__form-left">
            <div className="edit-item-image edit-item__form-image">
              <div className="edit-item-image__image-wrap">
                <img className="edit-item-image__image" src={productDetail.photo} srcSet="img/content/add-item-1@2x.png 2x" width="133" height="332" alt={productDetail.title} />
              </div>
              <div className="edit-item-image__btn-wrap">
                <button className="button button--small button--black-border edit-item-image__btn">Заменить
                </button>
                <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
              </div>
            </div>

            <SelectProductType selectedValue={productType} additionalClassName='edit-item__form-radio' onChangeHandler={ console.log } />

            <SelectStringsCount selectedValue={Number(productDetail.stringsCount)} additionalClassName='edit-item__form-radio' onChangeHandler={ console.log } />
          </div>
          <div className="edit-item__form-right">
            <div className="custom-input edit-item__form-input">
              <label><span>Дата добавления товара</span>
                <input type="text" name="date" value={productDate} placeholder="Дата в формате 00.00.0000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label><span>Наименование товара</span>
                <input type="text" name="title" value={productDetail.title} placeholder="Наименование"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input edit-item__form-input--price">
              <label><span>Цена товара</span>
                <input type="text" name="price" value={productDetail.price} placeholder="Цена в формате 00 000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label><span>Артикул товара</span>
                <input type="text" name="sku" value={productDetail.vendorCode} placeholder="Артикул товара"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea edit-item__form-textarea">
              <label><span>Описание товара</span>
                <textarea name="description" placeholder="">{productDetail.description}</textarea>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="edit-item__form-buttons-wrap">
            <button className="button button--small edit-item__form-button" type="submit" onClick={handleSaveBtnClick}>Сохранить изменения</button>
            <button className="button button--small edit-item__form-button" type="button" onClick={handleReturnBtnClick}>Вернуться к списку товаров</button>
          </div>
        </form>
      </div>
    </section>
  );
}
