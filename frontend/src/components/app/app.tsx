import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../../const';
import Layout from '../layout/layout';
import Page404 from '../page404/page404';
import { ReactElement } from 'react';

export default function App(): ReactElement {
  return (
    <Routes>
      <Route path={AppRoute.MAIN} element={<Layout />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
