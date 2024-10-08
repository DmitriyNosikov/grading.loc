import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import * as types from '@backend/libs/types';
import { ProductValidation } from '@backend/product/product.constant';

export class CreateProductDTO {
  @ApiProperty({
    description: 'Product vendor code',
    example: 'pv9230ndfg92381203i9hn-g0924',
    minimum: ProductValidation.VENDOR_CODE.MIN_LENGTH,
    maximum: ProductValidation.VENDOR_CODE.MAX_LENGTH,
  })
  @MaxLength(ProductValidation.VENDOR_CODE.MAX_LENGTH)
  @MinLength(ProductValidation.VENDOR_CODE.MIN_LENGTH)
  @IsString()
  vendorCode!: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Richie Sambora`s guitar',
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @MaxLength(ProductValidation.TITLE.MAX_LENGTH)
  @MinLength(ProductValidation.TITLE.MIN_LENGTH)
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Product description',
    example: 'It`s a perfect and rare guitar, that was firstly presented on LP concert',
    minimum: ProductValidation.DESCRIPTION.MIN_LENGTH,
    maximum: ProductValidation.DESCRIPTION.MAX_LENGTH,
  })
  @MaxLength(ProductValidation.DESCRIPTION.MAX_LENGTH)
  @MinLength(ProductValidation.DESCRIPTION.MIN_LENGTH)
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'Product photo URL (.jpg/.png)',
    example: 'http://some.interesting/photo.jpg',
  })
  @IsString()
  @IsOptional()
  photo!: string;

  @ApiProperty({
    description: 'Product type',
    example: 'electro',
    enum: types.ProductType,
  })
  @IsIn(types.productTypeList)
  @IsString()
  type!: types.ProductTypeEnum;

  @ApiProperty({
    description: 'Product strings count',
    example: '4',
    enum: types.StringsCount,
    minimum: ProductValidation.STRINGS_COUNT.MIN,
    maximum: ProductValidation.STRINGS_COUNT.MAX,
  })
  @IsIn(Object.values(types.StringsCount))
  @Min(ProductValidation.STRINGS_COUNT.MIN)
  @Max(ProductValidation.STRINGS_COUNT.MAX)
  @IsNumber()
  stringsCount!: number;

  @ApiProperty({
    description: 'Product price',
    example: '100000',
    minimum: ProductValidation.PRICE.MIN,
    maximum: ProductValidation.PRICE.MAX,
  })
  @Min(ProductValidation.PRICE.MIN)
  @Max(ProductValidation.PRICE.MAX)
  @IsNumber()
  price!: number;
}
