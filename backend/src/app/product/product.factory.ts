import { Injectable } from '@nestjs/common';
import { ProductInterface, EntityFactoryInterface } from '@backend/libs/interfaces';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductFactory implements EntityFactoryInterface<ProductEntity> {
  public create(entityPlainData: ProductInterface): ProductEntity {
    return new ProductEntity(entityPlainData);
  }
}
