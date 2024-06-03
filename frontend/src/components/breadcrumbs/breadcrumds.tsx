import { ReactElement } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Breadcrumbs(): ReactElement {
  const productId = String(useParams().id);
  const location = useLocation();
  const crumbs = location.pathname.split('/').slice(1);

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.MAIN}>Вход</Link>
      </li>
      {
        (crumbs.at(0) === AppRoute.PRODUCTS.slice(1)) && (
          <li className="breadcrumbs__item">
            <Link className="link" to={AppRoute.MAIN}>Каталог</Link>
          </li>
        )
      }
      {
        (productId && crumbs.at(1) === productId) && (
          <li className="breadcrumbs__item">
            <Link className="link" to={AppRoute.MAIN}>Товар</Link>
          </li>
        )
      }
    </ul>
  );
}
