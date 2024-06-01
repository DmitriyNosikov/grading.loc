import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchProductItemAction } from '../store/actions/api-action';
import { getProduct } from '../store/slices/product-process/product-process.selectors';


type UseProductItemProps = {
  productId: string;
}

export default function useProductItem({ productId }: UseProductItemProps) {
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(getProduct);

  useEffect(() => {
    let isMounted = true;

    if(isMounted && currentProduct?.id !== productId) {
      dispatch(fetchProductItemAction(productId));
    }

    return () => {
      isMounted = false;
    };
  });

  return currentProduct;
}
