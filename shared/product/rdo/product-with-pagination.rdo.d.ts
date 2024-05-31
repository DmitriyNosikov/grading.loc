import { CreateProductRDO } from './create-product.rdo';
export declare class ProductWithPaginationRDO {
    entities: CreateProductRDO[];
    totalPages: number;
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
}
