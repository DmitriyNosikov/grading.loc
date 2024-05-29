import { ApiProperty } from '@nestjs/swagger';
import { ProductType, ProductTypeEnum, StringsCount, StringsCountEnum } from '@backend/libs/types';
import { ProductValidation } from '@backend/product/product.constant';
import { Expose } from 'class-transformer';

export class CreateProductRDO {
  @ApiProperty({
    description: 'Product id',
    example: 'pv9230ndfg92381203i9hn-g0924',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Product created date',
    example: '2024-05-28 15:01:51.449',
  })
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    description: 'Product updated date',
    example: '2024-05-28 15:01:51.449',
  })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({
    description: 'Product vendor code',
    example: 'pv9230ndfg92381203i9hn-g0924',
    minimum: ProductValidation.VENDOR_CODE.MIN_LENGTH,
    maximum: ProductValidation.VENDOR_CODE.MAX_LENGTH,
  })
  @Expose()
  vendorCode: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Richie Sambora`s guitar',
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Product description',
    example: 'It`s a perfect and rair guitar, that was firstly presented on LP concert',
    minimum: ProductValidation.DESCRIPTION.MIN_LENGTH,
    maximum: ProductValidation.DESCRIPTION.MAX_LENGTH,
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Product photo URL (.jpg/.png)',
    example: 'http://some.interesting/photo.jpg',
  })
  @Expose()
  photo: string;

  @ApiProperty({
    description: 'Product type',
    example: 'electro',
    enum: ProductType,
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @Expose()
  type: ProductTypeEnum;

  @ApiProperty({
    description: 'Product strings count',
    example: '4',
    enum: StringsCount,
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @Expose()
  stringsCount: StringsCountEnum;

  @ApiProperty({
    description: 'Product price',
    example: '100000',
    minimum: ProductValidation.TITLE.MIN_LENGTH,
    maximum: ProductValidation.TITLE.MAX_LENGTH,
  })
  @Expose()
  price: number;
}
