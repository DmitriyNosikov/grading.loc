import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import AddProduct from '../../pages/add-product/add-product';
import EditProduct from '../../pages/edit-product/edit-product';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Page404 from '../../pages/page404/page404';
import Registration from '../../pages/registration/registration';
import Layout from '../layout/layout';
import OnlyUnauthorizedRoute from '../only-unauthorized-route/only-unauthorized-route';
import PrivateRoute from '../private-route/private-route';
import ProductDetail from '../product-detail/product-detail';
import ProductsList from '../products-list/products-list';

// TODO: Нужен Helmet для смены заголовков

export default function App(): ReactElement {
  return (
    <Routes>
      <Route path={AppRoute.MAIN} element={<Layout />} >
        <Route index element={
          <PrivateRoute redirectTo={AppRoute.LOGIN}>
            <Main />
          </PrivateRoute>
        } />

        <Route path={AppRoute.LOGIN} element={
          <OnlyUnauthorizedRoute children={
            <Login />
          }/>
        }/>

        <Route path={AppRoute.REGISTRATION} element={
          <OnlyUnauthorizedRoute children={
            <Registration />
          }/>
        }/>

        <Route path={AppRoute.PRODUCTS} element={
          <PrivateRoute redirectTo={AppRoute.LOGIN}>
            <ProductsList />
          </PrivateRoute>
        } />

        <Route path={`${AppRoute.PRODUCTS}/:id`} element={<ProductDetail />} />

        <Route path={`${AppRoute.ADD_PRODUCT}`} element={
          <PrivateRoute redirectTo={AppRoute.LOGIN}>
            <AddProduct />
          </PrivateRoute>
        }/>

        <Route path={`${AppRoute.EDIT_PRODUCT}/:id`} element={
          <PrivateRoute redirectTo={AppRoute.LOGIN}>
            <EditProduct />
          </PrivateRoute>
        }/>

        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
