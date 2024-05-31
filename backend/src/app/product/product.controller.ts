import { fillDTO } from '@backend/libs/helpers';
import { SearchQuery, SortDirection, SortType, StringsCount } from '@backend/libs/types';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProductDTO } from '@shared/product/dto/create-product.dto';
import { UpdateProductDTO } from '@shared/product/dto/update-product.dto';
import { CreateProductRDO } from '@shared/product/rdo/create-product.rdo';
import { ProductWithPaginationRDO } from '@shared/product/rdo/product-with-pagination.rdo';

import { JWTAuthGuard } from '../user/guards/jwt-auth.guard';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
  MAX_ITEMS_PER_PAGE,
  ProductMessage
} from './product.constant';
import { ProductService } from './product.service';

@ApiTags('products')
@ApiHeader({
  name: 'Authorization',
  description: 'Authorization JWT-token',
  example: 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU1YjNiN2FmYmYwNWQzYjUxM2RmNzEiLCJlbWFpbCI6Imlyb24tbWFuQHN0YXJraW5kdXN0cmllcy5pdCIsIm5hbWUiOiJUb255IiwiaWF0IjoxNzE2OTg1MjIxLCJleHAiOjE3MTY5ODU4MjF9.5FNKOfz_RLGRVW7FxdbrnWF3IUcZnTFoBbgcgvyB-OU',
  required: true
})
@UseGuards(JWTAuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ){}

  @Post('/')
  @ApiOperation({ summary: 'Crate new products item' })
  @ApiBody({
    type: CreateProductRDO,
    required: true
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ProductMessage.SUCCESS.CREATED,
    type: CreateProductRDO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ProductMessage.ERROR.UNAUTHORIZED
  })
  public async create(@Body() dto: CreateProductDTO): Promise<CreateProductRDO | null> {
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
    enum: Object.values(StringsCount),
    example: "4",
    type: Number || String || undefined,
    required: false
  })
  @ApiQuery({
    name: "createdAt",
    description: `Product creation date`,
    example: "2024-05-29",
    required: false
  })
  @ApiQuery({
    name: "limit",
    description: `Items per page (pagination). Max limit: ${MAX_ITEMS_PER_PAGE}`,
    example: "7",
    required: false
  })
  @ApiQuery({
    name: "page",
    description: `Current page in pagination (if items count more than "limit"). Default page: ${DEFAULT_PAGE_NUMBER}`,
    example: "1",
    required: false
  })
  @ApiQuery({
    name: "sortType",
    description: `Sorting type. Default sort type: ${DEFAULT_SORT_TYPE}`,
    enum: SortType,
    example: "createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `Sorting direction. Default direction: ${DEFAULT_SORT_DIRECTION}`,
    enum: SortDirection,
    example: " Pdesc",
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
  public async index(@Query() query?: SearchQuery): Promise<ProductWithPaginationRDO | null> {
    const preparedQuery = this.productService.filterQuery(query);
    const documents = await this.productService.search(preparedQuery);

    if(!documents.entities || documents.entities.length <= 0) {
      return;
    }

    const products = {
      ...documents,
      entities: documents.entities.map((document) => document.toPOJO())
    }

    return products;
  }

  @Get('/:productId')
  @ApiParam({
    name: "productId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: 'Product id',
    required: true
  })
  @ApiOperation({ summary: 'Get detail information about product with passed id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductMessage.SUCCESS.FOUND,
    type: CreateProductDTO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductMessage.ERROR.NOT_FOUND
  })
  public async show(@Param('productId') productId: string): Promise<CreateProductRDO | null> {
    const product = await this.productService.getDetail(productId);

    if(!product) {
      return;
    }

    return fillDTO(CreateProductRDO, product.toPOJO());
  }

  @Patch('/:productId')
  @ApiOperation({ summary: 'Update product fields with passed id' })
  @ApiParam({
    name: "productId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: 'Product id',
    required: true
  })
  @ApiBody({
    type: UpdateProductDTO
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ProductMessage.SUCCESS.UPDATED,
    type: CreateProductRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductMessage.ERROR.NOT_FOUND
  })
  public async update(
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDTO): Promise<CreateProductRDO | null> {
    const updatedProduct = await this.productService.update(productId, dto);

    return fillDTO(CreateProductRDO, updatedProduct.toPOJO());
  }

  @Delete('/:productId')
  @ApiOperation({ summary: 'Delete product with passed id' })
  @ApiParam({
    name: "productId",
    example: 'b0103f3e-a6ac-4719-94bc-60c8294c08c6',
    description: 'Product id',
    required: true
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ProductMessage.SUCCESS.DELETED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductMessage.ERROR.NOT_FOUND
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('productId') productId: string): Promise<void> {
    await this.productService.delete(productId);
  }
}
