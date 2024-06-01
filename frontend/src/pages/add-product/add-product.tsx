import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumds';
import SelectProductType from '../../components/select-product-type/select-product-type';
import SelectStringsCount from '../../components/select-strings-count/select-strings-count';
import { AppRoute } from '../../const';
import { getFormattedDate } from '../../utils/common';

export default function AddProduct(): ReactElement {
  const navigate = useNavigate();

  const currentDate = getFormattedDate(new Date());
  const [type, setType] = useState('guitar');
  const [stringsCount, setStringsCount] = useState(4);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleAddImageClick() {
    console.log('Image adding is not implemented yet');
  }

  function handleRemoveImageClick() {
    console.log('Image deleting is not implemented yet');
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setType(target.value);
  }

  function handleStringsCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setStringsCount(Number(target.value));
  }

  function handleSaveBtnClick() {
    console.log('Saving is not implemented yet');
  }

  function handleReturnBtnClick() {
    navigate(AppRoute.MAIN);
  }

  return (
    <section className="add-item">
      <div className="container">
        <h1 className="add-item__title">Новый товар</h1>

        <Breadcrumbs />

        <form className="add-item__form" action="#" method="get" onSubmit={handleFormSubmit}>
          <div className="add-item__form-left">
            <div className="edit-item-image add-item__form-image">
              <div className="edit-item-image__image-wrap">
              </div>

              <div className="edit-item-image__btn-wrap">
                <button className="button button--small button--black-border edit-item-image__btn" onClick={handleAddImageClick}>Добавить
                </button>
                <button className="button button--small button--black-border edit-item-image__btn" onClick={handleRemoveImageClick}>Удалить</button>
              </div>
            </div>

            <SelectProductType selectedValue={type}  additionalClassName='add-item__form-radio' onChangeHandler={handleTypeChange}/>

            <SelectStringsCount selectedValue={stringsCount} additionalClassName='add-item__form-radio' onChangeHandler={handleStringsCountChange} />
          </div>

          <div className="add-item__form-right">
            <div className="custom-input add-item__form-input">
              <label><span>Дата добавления товара</span>
                <input type="text" name="date" defaultValue={currentDate} placeholder="Дата в формате 00.00.0000" />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите наименование товара</span>
                <input type="text" name="title" defaultValue="" placeholder="Наименование"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
              <label><span>Введите цену товара</span>
                <input type="number" name="price" defaultValue="" placeholder="Цена в формате 00 000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите артикул товара</span>
                <input type="text" name="sku" defaultValue="" placeholder="Артикул товара"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea add-item__form-textarea">
              <label><span>Введите описание товара</span>
                <textarea name="description" placeholder="" defaultValue=""/>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>

          <div className="add-item__form-buttons-wrap">
            <button className="button button--small add-item__form-button" type="submit" onClick={handleSaveBtnClick}>Сохранить изменения</button>
            <button className="button button--small add-item__form-button" type="button" onClick={handleReturnBtnClick}>Вернуться к списку товаров</button>
          </div>
        </form>
      </div>
    </section>
  );
}
