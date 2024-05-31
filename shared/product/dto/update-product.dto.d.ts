import { ProductTypeEnum } from '@backend/libs/types';
export declare class UpdateProductDTO {
    vendorCode?: string;
    title?: string;
    description?: string;
    photo?: string;
    type?: ProductTypeEnum;
    stringsCount?: number;
    price?: number;
}
