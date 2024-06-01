import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function AddProductButton() {
  return (
    <Link className="button product-list__button button--red button--big" to={AppRoute.ADD_PRODUCT} >Добавить новый товар</Link>
  );
}
