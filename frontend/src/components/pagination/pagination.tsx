import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { getPaginationPage } from '@frontend/src/store/actions/api-product-action';
import { getProducts } from '@frontend/src/store/slices/product-process/product-process.selectors';
import { useEffect } from 'react';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const paginatedProducts = useAppSelector(getProducts);

  // Получаем из количества страниц псевдо-массив
  const pages = Array.from({ length: paginatedProducts.totalPages }, (_, i) => i+1);

  // Формируем пагинацию
  const pagination = pages.map((index) => {
    const paginationItemClass = (index === paginatedProducts.currentPage) ? 'pagination__page--active' : '';
    const isLastPage = (index === pages[pages.length - 1]);

    return (
      <>
        <li className={`pagination__page  ${paginationItemClass}`} key={index}>
          <a className="link pagination__page-link" href={`${index}`} data-page={index} onClick={handlePaginationClick}>{index}</a>
        </li>

        {
          isLastPage && (
            <li className={`pagination__page  pagination__page--next`} key={`next`}>
              <a className="link pagination__page-link" href="next" data-page="next" onClick={handlePaginationClick}>Далее</a>
            </li>
          )
        }
      </>
    );
  })

  function handlePaginationClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    const target = e.currentTarget;
    const page = target.dataset.page;
    const pageNumber = (page !== 'next') ? Number(page) : (paginatedProducts.currentPage + 1);

    if(pageNumber > paginatedProducts.totalPages) {
      return;
    }

    dispatch(getPaginationPage(pageNumber));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [paginatedProducts]);

  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        { pagination }
      </ul>
    </div>
  );
}
