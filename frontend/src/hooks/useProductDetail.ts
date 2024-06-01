import { CreateProductRDO } from '@shared/product';
import { useParams } from 'react-router-dom';
import useProductItem from './useProductItem';

export default function useProductDetail(): CreateProductRDO | null {
  const productId = String(useParams().id);
  const productDetail = useProductItem({ productId });

  return productDetail;
}
