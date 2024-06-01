
import useProductDetail from '@frontend/src/hooks/useProductDetail';
import { useState } from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumds';
import Spinner from '../spinner/spinner';

function convertType(type: string): String {
  switch(type) {
    case('guitar'): return 'Акустическая';
    case('el-guitar'): return 'Электрогитара';
    case('ukulele'): return 'Укулеле';
    default: return 'Невиданный доселе инструмент';
  }
}

export default function ProductDetail() {
  const productDetail = useProductDetail();
  const [activeTab, setActiveTab] = useState('characteristics');

  if(!productDetail) {
    return <Spinner />;
  }

  const characteristicsTabClass = (activeTab === 'characteristics') ? 'button button--medium' : 'button button--black-border button--medium';
  const descriptionTabClass = (activeTab === 'description') ? 'button button--medium' : 'button button--black-border button--medium';
  const isCharacteristicsActive = (activeTab !== 'characteristics') ? 'hidden' : '';
  const isDescriptionActive = (activeTab !== 'description') ? 'hidden' : '';

  function handleTabClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    const target = e.currentTarget;
    const activeTab = target.href.split('#').at(1);

    setActiveTab(activeTab ?? 'characteristics');
  }

  return (
    <>
      <h1 className="page-content__title title title--bigger">Товар</h1>

      <Breadcrumbs />

      <div className="product-container">
        <img className="product-container__img" src={productDetail.photo} srcSet="img/content/catalog-product-1@2x.png 2x" width="90" height="235" alt="" />
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{productDetail.title}</h2>
          <br />
          <br />
          <div className="tabs">
            <a className={`tabs__button ${characteristicsTabClass}`} href="#characteristics" onClick={handleTabClick}>Характеристики</a>
            <a className={`tabs__button ${descriptionTabClass}`} href="#description" onClick={handleTabClick}>Описание</a>
            <div className="tabs__content" id="characteristics">
              <table className={`tabs__table ${isCharacteristicsActive}`}>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{productDetail.vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{convertType(productDetail.type)}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{Number(productDetail.stringsCount)} струнная</td>
                </tr>
              </table>
              <p className={`tabs__product-description ${isDescriptionActive}`}>{productDetail.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
