import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';
import { ProductTypeEnum, StringsCountEnum } from '../../types'

export interface ProductInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  vendorCode: string;
  title: string;
  description: string;
  photo: string;
  type: ProductTypeEnum;
  stringsCount: StringsCountEnum;
  price: number;
}
