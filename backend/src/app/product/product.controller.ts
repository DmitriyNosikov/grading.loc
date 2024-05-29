import { Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDTO } from '@backend/product/dto/create-product.dto';
import { CreateProductRDO } from '@backend/product/rdo/create-product.rdo';
import { fillDTO } from '@backend/libs/helpers';
import { SearchQuery, SortDirection, SortType, StringsCount } from '@backend/libs/types';
import { JWTAuthGuard } from '../user/guards/jwt-auth.guard';
import { DEFAULT_PAGE_NUMBER, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, MAX_ITEMS_PER_PAGE, ProductMessage } from './product.constant';
import { ProductWithPaginationRDO } from './rdo/product-with-pagination.rdo';

@ApiTags('products')
@UseGuards(JWTAuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ){}

  @Post('/')
  public async create(dto: CreateProductDTO): Promise<CreateProductRDO | null> {
    const product = await this.productService.create(dto);

    return fillDTO(CreateProductRDO, product.toPOJO());
  }

  @Get('/')
  @ApiOperation({ summary: 'Get products list by passed params (or without it)' })
  @ApiQuery({
    name: "title",
    description: `Product title`,
    example: "Richie Sambora`s guitar",
    required: false
  })
  @ApiQuery({
    name: "stringsCount",
    description: `Product strings count`,
    enum: typeof StringsCount,
    example: "/?stringsCount=4",
    required: false
  })
  @ApiQuery({
    name: "createdAt",
    description: `Product creation date`,
    example: "/?createdAt=2024-05-29",
    required: false
  })
  @ApiQuery({
    name: "limit",
    description: `Items per page (pagination). Max limit: ${MAX_ITEMS_PER_PAGE}`,
    example: "/?limit=7",
    required: false
  })
  @ApiQuery({
    name: "page",
    description: `Current page in pagination (if items count more than "limit"). Default page: ${DEFAULT_PAGE_NUMBER}`,
    example: "/?page=1",
    required: false
  })
  @ApiQuery({
    name: "sortType",
    description: `Sorting type. Default sort type: ${DEFAULT_SORT_TYPE}`,
    enum: SortType,
    example: "/?sortType=createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `Sorting direction. Default direction: ${DEFAULT_SORT_DIRECTION}`,
    enum: SortDirection,
    example: "/?sortDirection=desc",
    required: false
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductMessage.SUCCESS.FOUND,
    type: ProductWithPaginationRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductMessage.ERROR.NOT_FOUND
  })
  public async index(@Query() query: SearchQuery): Promise<ProductWithPaginationRDO | null> {
    const products = await this.productService.search(query);

    if(!products.entities || products.entities.length <= 0) {
      return;
    }

    return products;
  }

  @Get('/:productId')
  public async show(@Param('productId') productId: string): Promise<CreateProductDTO | null> {
    const product = await this.productService.getDetail(productId);

    if(!product) {
      return;
    }

    return fillDTO(CreateProductDTO, product.toPOJO());
  }

  @Patch('/:productId')
  public async update(
    @Param('productId') productId: string,
    dto: CreateProductDTO): Promise<CreateProductRDO | null> {
    const updatedProduct = await this.productService.update(productId, dto);

    return fillDTO(CreateProductRDO, updatedProduct.toPOJO());
  }

  @Delete('/:productId')
  public async delete(@Param('productId') productId: string): Promise<void> {
    await this.productService.delete(productId);
  }
}
