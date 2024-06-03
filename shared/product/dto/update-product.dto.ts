import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import * as types from '@backend/libs/types';
import { ProductValidation } from '@backend/product/product.constant';

export class UpdateProductDTO {
  @ApiProperty({
    description: 'Product vendor code',
    example: 'pv9230ndfg92381203i9hn-g0924',
    minimum: ProductValidation.VENDOR_CODE.MIN_LENGTH,
    maximum: ProductValidation.VENDOR_CODE.MAX_LENGTH,
  })
  @MaxLength(ProductValidation.VENDOR_CODE.MAX_LENGTH)
  @MinLength(ProductValidation.VENDOR_CODE.MIN_LENGTH)
  @IsString()
  @IsOptional()
  vendorCode?: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Richie Sambora`s guitar',
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @MaxLength(ProductValidation.TITLE.MAX_LENGTH)
  @MinLength(ProductValidation.TITLE.MIN_LENGTH)
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Product description',
    example: 'It`s a perfect and rair guitar, that was firstly presented on LP concert',
    minimum: ProductValidation.DESCRIPTION.MIN_LENGTH,
    maximum: ProductValidation.DESCRIPTION.MAX_LENGTH,
  })
  @MaxLength(ProductValidation.DESCRIPTION.MAX_LENGTH)
  @MinLength(ProductValidation.DESCRIPTION.MIN_LENGTH)
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product photo URL (.jpg/.png)',
    example: 'http://some.interesting/photo.jpg',
  })
  @IsString()
  @IsOptional()
  @IsOptional()
  photo?: string;

  @ApiProperty({
    description: 'Product type',
    example: 'electro',
    enum: types.ProductType,
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @IsIn(types.productTypeList)
  @IsString()
  @IsOptional()
  type?: types.ProductTypeEnum;

  @ApiProperty({
    description: 'Product strings count',
    example: '4',
    enum: types.StringsCount,
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @IsIn(types.StringsCount)
  @Min(ProductValidation.STRINGS_COUNT.MIN)
  @IsNumber()
  @IsOptional()
  stringsCount?: number;

  @ApiProperty({
    description: 'Product price',
    example: '100000',
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @Min(ProductValidation.PRICE.MIN)
  @Max(ProductValidation.PRICE.MAX)
  @IsNumber()
  @IsOptional()
  price?: number;
}
