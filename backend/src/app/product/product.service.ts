import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from '@backend/product/dto/create-product.dto';
import { ProductFactory } from './product.factory';
import { UpdateProductDTO } from '@backend/product/dto/update-product.dto';
import { SearchQuery } from '@backend/libs/types';

@Injectable()
export class ProductService {
  constructor(
    private readonly productFactory: ProductFactory,
    private readonly productRepository: ProductRepository
  ){}

  public async getDetail(productId: string) {
    const product = await this.productRepository.findById(productId);

    if(!product) {
      throw new NotFoundException(`Can't find product with id " ${productId}"`);
    }

    return product;
  }

  public async search(query?: SearchQuery) {
    const products = await this.productRepository.search(query);

    if(!products && query) {
      throw new NotFoundException(`Can't find products by passed params " ${query}"`);
    }

    return products;
  }

  public async create(dto: CreateProductDTO) {
    const productEntity = this.productFactory.create(dto);
    const product = await this.productRepository.create(productEntity);

    if(!product) {
      throw new BadRequestException(`Can't create product with passed data: ${dto}`);
    }

    return product;
  }

  public async update(productId: string, dto: UpdateProductDTO) {
    if(!dto) {
      throw new BadRequestException(`Can't update product without passed fields to update. Passed: ${dto}`);;
    }

    await this.isExists(productId);

    const product = await this.productRepository.updateById(productId, dto);

    if(!product) {
      throw new NotFoundException(`Can't update product "${productId}" with passed data: ${dto}`);
    }

    return product;
  }

  public async delete(productId: string) {
    await this.isExists(productId);
    await this.productRepository.deleteById(productId);
  }

  private async isExists(productId: string) {
    const isExists = await this.productRepository.isExists(productId);

    if(!isExists) {
      throw new NotFoundException(`Can't find product with id " ${productId}"`);
    }

    return true;
  }
}
