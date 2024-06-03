import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsIn, IsNumber, IsOptional, IsString, IsArray, Max } from 'class-validator';
import { DEFAULT_PAGE_NUMBER, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, MAX_ITEMS_PER_PAGE } from '@backend/product/product.constant';
import { ProductTypeEnum, productTypeList, StringsCount } from '@backend/libs/types';
import { SortDirection, SortDirectionEnum, SortType, SortTypeEnum } from './sort-type.enum';

export class SearchQuery {
  @Expose()
  @IsString()
  @IsOptional()
  public title?: string;

  @Expose()
  @Transform(({ value }) => {
    if(value && !Array.isArray(value)) {
      value = [value];
    }

    return value;
  })
  @IsIn(productTypeList, { each: true })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  public type?: ProductTypeEnum[];

  @Expose()
  @Transform(({ value }) => {
    if(value) {

      if(!Array.isArray(value)) {
        value = [value];
      }

      value = value.map((item: unknown) => Number(item));
      value = value.filter((item: number) => {
        return ((item !== undefined) && !isNaN(item));
      })

      if(value.length <= 0) {
        return undefined;
      }
    }

    return value;
  })
  @IsIn(Object.values(StringsCount), { each: true })
  @IsNumber({}, {each: true})
  @IsArray()
  @IsOptional()
  public stringsCount?: number | number[];

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
