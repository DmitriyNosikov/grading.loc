import { ProductTypeEnum, StringsCountEnum } from '@backend/libs/types';
export declare class CreateProductRDO {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    vendorCode: string;
    title: string;
    description: string;
    photo: string;
    type: ProductTypeEnum;
    stringsCount: StringsCountEnum;
    price: number;
}
