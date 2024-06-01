import { ProductTypeEnum } from '@backend/libs/types';
import Spinner from '@frontend/src/components/spinner/spinner';
import { AppRoute } from '@frontend/src/const';
import useProductItem from '@frontend/src/hooks/useProductItem';
import { store } from '@frontend/src/store';
import { updateProductItemAction } from '@frontend/src/store/actions/api-action';
import { getFormattedDate } from '@frontend/src/utils/common';
import { CreateProductRDO } from '@shared/product';
import { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumds';
import SelectProductType from '../../components/select-product-type/select-product-type';
import SelectStringsCount from '../../components/select-strings-count/select-strings-count';

export default function EditProduct(): ReactElement {
  const productId = String(useParams().id);
  const productDetail = useProductItem({ productId });
  const navigate = useNavigate();

  const [type, setType] = useState(productDetail?.type);
  const [stringsCount, setStringsCount] = useState(productDetail?.stringsCount);

  if(!productDetail) {
    return <Spinner />;
  }

  const productType = type ?? productDetail?.type;
  const productStringsCount = stringsCount ?? productDetail?.stringsCount;
  const productDate = productDetail.createdAt ? getFormattedDate(new Date(productDetail.createdAt)) : '';

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const updateProductData: Partial<CreateProductRDO> = {
      id: productDetail?.id ?? undefined,
      title: String(formData.get('title')),
      type: String(formData.get('item-type')) as ProductTypeEnum,
      description: String(formData.get('description')),
      photo: productDetail?.photo ?? '',
      price: Number(formData.get('price')),
      stringsCount: Number(formData.get('string-qty')),
    };

    store.dispatch(updateProductItemAction(updateProductData));
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setType(target.value as ProductTypeEnum);
  }

  function handleStringsCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setStringsCount(Number(target.value));
  }

  function handleReturnBtnClick() {
    navigate(AppRoute.MAIN);
  }

  return (
    <section className="edit-item">
      <div className="container">
        <h1 className="edit-item__title">{productDetail.title}</h1>

        <Breadcrumbs />

        <form className="edit-item__form" action="#" method="get" onSubmit={handleFormSubmit}>
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

            <SelectProductType selectedValue={productType} additionalClassName='edit-item__form-radio' onChangeHandler={handleTypeChange} />

            <SelectStringsCount selectedValue={Number(productStringsCount)} additionalClassName='edit-item__form-radio' onChangeHandler={handleStringsCountChange} />
          </div>
          <div className="edit-item__form-right">
            <div className="custom-input edit-item__form-input">
              <label><span>Дата добавления товара</span>
                <input type="text" name="date" defaultValue={productDate} placeholder="Дата в формате 00.00.0000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label><span>Наименование товара</span>
                <input type="text" name="title" defaultValue={productDetail.title} placeholder="Наименование"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input edit-item__form-input--price">
              <label><span>Цена товара</span>
                <input type="text" name="price" defaultValue={productDetail.price} placeholder="Цена в формате 00 000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label><span>Артикул товара</span>
                <input type="text" name="sku" defaultValue={productDetail.vendorCode} placeholder="Артикул товара"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea edit-item__form-textarea">
              <label><span>Описание товара</span>
                <textarea name="description" placeholder="" defaultValue={productDetail.description}/>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="edit-item__form-buttons-wrap">
            <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
            <button className="button button--small edit-item__form-button" type="button" onClick={handleReturnBtnClick}>Вернуться к списку товаров</button>
          </div>
        </form>
      </div>
    </section>
  );
}
