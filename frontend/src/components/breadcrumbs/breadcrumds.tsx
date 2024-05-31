import { AppRoute } from '../../../const';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs(): ReactElement {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.MAIN}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.MAIN}>Каталог</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.MAIN}>Товар</Link>
      </li>
    </ul>
  );
}
