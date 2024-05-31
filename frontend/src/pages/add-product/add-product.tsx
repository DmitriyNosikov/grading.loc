import { ReactElement } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumds';
import SelectProductType from '../../components/select-product-type/select-product-type';
import SelectStringsCount from '../../components/select-strings-count/select-strings-count';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { getPaddedNum } from '../../utils/common';

export default function AddProduct(): ReactElement {
  const navigate = useNavigate();

  const date = new Date();
  const day = getPaddedNum(date.getDate());
  const month = getPaddedNum(date.getMonth());
  const currentDate = `${day}.${month}.${date.getFullYear()}`;

  function handleReturnBtnClick() {
    navigate(AppRoute.MAIN);
  }

  return (
    <section className="add-item">
      <div className="container">
        <h1 className="add-item__title">Новый товар</h1>

        <Breadcrumbs />

        <form className="add-item__form" action="#" method="get">
          <div className="add-item__form-left">
            <div className="edit-item-image add-item__form-image">
              <div className="edit-item-image__image-wrap">
              </div>

              <div className="edit-item-image__btn-wrap">
                <button className="button button--small button--black-border edit-item-image__btn">Добавить
                </button>
                <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
              </div>
            </div>

            <SelectProductType additionalClassName='add-item__form-radio' onChangeHandler={ console.log } />

            <SelectStringsCount additionalClassName='add-item__form-radio' onChangeHandler={ console.log } />
          </div>

          <div className="add-item__form-right">
            <div className="custom-input add-item__form-input">
              <label><span>Дата добавления товара</span>
                <input type="text" name="date" value={currentDate} placeholder="Дата в формате 00.00.0000" />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите наименование товара</span>
                <input type="text" name="title" value="" placeholder="Наименование"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
              <label><span>Введите цену товара</span>
                <input type="text" name="price" value="" placeholder="Цена в формате 00 000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите артикул товара</span>
                <input type="text" name="sku" value="" placeholder="Артикул товара"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea add-item__form-textarea">
              <label><span>Введите описание товара</span>
                <textarea name="description" placeholder=""></textarea>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>

          <div className="add-item__form-buttons-wrap">
            <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
            <button className="button button--small add-item__form-button" type="button" onClick={handleReturnBtnClick}>Вернуться к списку товаров</button>
          </div>
        </form>
      </div>
    </section>
  );
}
