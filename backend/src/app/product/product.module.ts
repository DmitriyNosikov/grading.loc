import { Module } from '@nestjs/common';

import { ProductFactory } from './product.factory';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';


@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductFactory, ProductService, ProductRepository],
})
export class ProductModule {}
