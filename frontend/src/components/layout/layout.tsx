import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout(): ReactElement {
  return (
    <main className="page-content">
      <Outlet />
    </main>
  )
}
