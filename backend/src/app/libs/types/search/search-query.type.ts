import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsIn, IsNumber, IsOptional, IsString, Max } from 'class-validator';
import { DEFAULT_PAGE_NUMBER, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, MAX_ITEMS_PER_PAGE } from '../../../product/product.constant';
import { ProductTypeEnum, productTypeList } from '../product-type.enum';
import { StringsCount } from '../strings-count.enum';
import { SortDirection, SortDirectionEnum, SortType, SortTypeEnum } from './sort-type.enum';

export class SearchQuery {
  @Expose()
  @IsString()
  @IsOptional()
  public title?: string;

  @Expose()
  @IsIn(productTypeList)
  @IsString()
  @IsOptional()
  public type?: ProductTypeEnum;

  @Expose()
  @Transform(({ value }) => {
    const stringsCount = Number(value);

    if((value === undefined) || isNaN(stringsCount)) {
      return undefined;
    }

    return stringsCount;
  })
  @IsIn(Object.values(StringsCount))
  @IsNumber()
  @IsOptional()
  public stringsCount?: number;

  @Expose()
  @IsDateString()
  @IsOptional()
  public createdAt?: Date;

  @Expose()
  @Transform(({ value }) => Number(value) || MAX_ITEMS_PER_PAGE)
  @Max(MAX_ITEMS_PER_PAGE)
  @IsNumber()
  @IsOptional()
  public limit?: number = MAX_ITEMS_PER_PAGE;

  @Expose()
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortType?: SortTypeEnum = DEFAULT_SORT_TYPE;

  @Expose()
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirectionEnum = DEFAULT_SORT_DIRECTION;

  @Expose()
  @Transform(({ value }) => Number(value) || DEFAULT_PAGE_NUMBER)
  @IsOptional()
  public page?: number = DEFAULT_PAGE_NUMBER;
};
