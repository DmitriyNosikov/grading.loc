import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../../const';
import Layout from '../layout/layout';
import Page404 from '../../pages/page404/page404';
import { ReactElement } from 'react';
import PrivateRoute from '../private-route/private-route';
import ProductsList from '../products-list/products-list';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import AddProduct from '../../pages/add-product/add-product';
import EditProduct from '../../pages/edit-product/edit-product';
import OnlyUnauthorizedRoute from '../only-unauthorized-route/only-unauthorized-route';
import Registration from '../../pages/registration/registration';

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={<Layout />} >
          <Route index element={
            <PrivateRoute redirectTo={AppRoute.LOGIN}>
              <Main />
            </PrivateRoute>
          } />

          <Route path={AppRoute.LOGIN} element={<Login />}/>

          <Route path={AppRoute.PRODUCTS} element={
              <PrivateRoute redirectTo={AppRoute.LOGIN}>
                <ProductsList />
              </PrivateRoute>
            } />

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
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
