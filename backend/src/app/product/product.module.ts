import { Module } from '@nestjs/common';

import { ProductFactory } from './product.factory';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';


@Module({
  imports: [PrismaClientModule],
  controllers: [ProductController],
  providers: [ProductFactory, ProductService, ProductRepository],
  exports: [ProductFactory, ProductService, ProductRepository],
})
export class ProductModule {}
