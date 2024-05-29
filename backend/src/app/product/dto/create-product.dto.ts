import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import { ProductType, ProductTypeEnum, productTypeList, StringsCount } from '@backend/libs/types';
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
  vendorCode: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Richie Sambora`s guitar',
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @MaxLength(ProductValidation.TITLE.MAX_LENGTH)
  @MinLength(ProductValidation.TITLE.MIN_LENGTH)
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Product description',
    example: 'It`s a perfect and rair guitar, that was firstly presented on LP concert',
    minimum: ProductValidation.DESCRIPTION.MIN_LENGTH,
    maximum: ProductValidation.DESCRIPTION.MAX_LENGTH,
  })
  @MaxLength(ProductValidation.DESCRIPTION.MAX_LENGTH)
  @MinLength(ProductValidation.DESCRIPTION.MIN_LENGTH)
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product photo URL (.jpg/.png)',
    example: 'http://some.interesting/photo.jpg',
  })
  @IsString()
  @IsOptional()
  photo: string;

  @ApiProperty({
    description: 'Product type',
    example: 'electro',
    enum: ProductType,
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @IsIn(productTypeList)
  @IsString()
  type: ProductTypeEnum;

  @ApiProperty({
    description: 'Product strings count',
    example: '4',
    enum: StringsCount,
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @IsIn(StringsCount)
  @Min(ProductValidation.STRINGS_COUNT.MIN)
  @IsNumber()
  stringsCount: number;

  @ApiProperty({
    description: 'Product price',
    example: '100000',
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @IsIn(StringsCount)
  @Min(ProductValidation.PRICE.MIN)
  @Max(ProductValidation.PRICE.MAX)
  @IsNumber()
  price: number;
}
