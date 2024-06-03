import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CreateProductRDO } from './create-product.rdo';

export class ProductWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Product entities array',
    type: CreateProductRDO,
  })
  @Type(() => CreateProductRDO)
  public entities!: CreateProductRDO[];

  @Expose()
  @ApiProperty({
    description: 'Paginated product pages count',
    example: 2
  })
  public totalPages!: number;

  @Expose()
  @ApiProperty({
    description: 'Total producs count',
    example: 23
  })
  public totalItems!: number;

  @Expose()
  @ApiProperty({
    description: 'Current page number in pagination',
    example: 1
  })
  public currentPage!: number;

  @Expose()
  @ApiProperty({
    description: 'product per page',
    example: 7
  })
  public itemsPerPage!: number;
}
