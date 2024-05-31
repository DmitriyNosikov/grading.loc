import { ReactElement } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumds';
import SelectProductType from '../../components/select-product-type/select-product-type';
import SelectStringsCount from '../../components/select-strings-count/select-strings-count';

export default function EditProduct(): ReactElement {
  return (
    <section className="edit-item">
      <div className="container">
        <h1 className="edit-item__title">СURT Z30 Plus</h1>

        <Breadcrumbs />

        <form className="edit-item__form" action="#" method="get">
          <div className="edit-item__form-left">
            <div className="edit-item-image edit-item__form-image">
              <div className="edit-item-image__image-wrap">
                <img className="edit-item-image__image" src="img/content/add-item-1.png" srcSet="img/content/add-item-1@2x.png 2x" width="133" height="332" alt="СURT Z30 Plus" />
              </div>
              <div className="edit-item-image__btn-wrap">
                <button className="button button--small button--black-border edit-item-image__btn">Заменить
                </button>
                <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
              </div>
            </div>

            <SelectProductType  additionalClassName='edit-item__form-radio' onChangeHandler={ console.log } />

            <SelectStringsCount additionalClassName='edit-item__form-radio' onChangeHandler={ console.log } />
          </div>
          <div className="edit-item__form-right">
            <div className="custom-input edit-item__form-input">
              <label><span>Дата добавления товара</span>
                <input type="text" name="date" value="19.09.2022" placeholder="Дата в формате 00.00.0000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label><span>Наименование товара</span>
                <input type="text" name="title" value="СURT Z30 Plus" placeholder="Наименование"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input edit-item__form-input--price">
              <label><span>Цена товара</span>
                <input type="text" name="price" value="27 000" placeholder="Цена в формате 00 000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label><span>Артикул товара</span>
                <input type="text" name="sku" value="SO757575" placeholder="Артикул товара"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea edit-item__form-textarea">
              <label><span>Описание товара</span>
                <textarea name="description" placeholder="">
                  Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений.
                  Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.
                </textarea>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="edit-item__form-buttons-wrap">
            <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
            <button className="button button--small edit-item__form-button" type="button">Вернуться к списку товаров</button>
          </div>
        </form>
      </div>
    </section>
  );
}
