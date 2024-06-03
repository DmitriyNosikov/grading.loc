import { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

export default function Layout(): ReactElement {
  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
