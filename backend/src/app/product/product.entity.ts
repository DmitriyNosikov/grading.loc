
import { Entity } from '@backend/libs/entities';
import { StorableEntityInterface } from '@backend/libs/interfaces';
import { ProductInterface } from '@backend/libs/interfaces/product/product.interface';
import { ProductTypeEnum } from '@backend/libs/types';

export class ProductEntity extends Entity implements StorableEntityInterface<ProductInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public vendorCode: string;
  public title: string;
  public description: string;
  public photo: string;
  public type: ProductTypeEnum;
  public stringsCount: number;
  public price: number;

  constructor(product?: ProductInterface) {
    super();
    this.populate(product);
  }

  public populate(product?: ProductInterface) {
    if (!product) {
      return;
    }

    this.id = product.id;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
    this.vendorCode = product.vendorCode;
    this.title = product.title;
    this.description = product.description;
    this.photo = product.photo;
    this.type = product.type;
    this.stringsCount = product.stringsCount;
    this.price = product.price;
  }


  public toPOJO(): ProductInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      vendorCode: this.vendorCode,
      title: this.title,
      description: this.description,
      photo: this.photo,
      type: this.type,
      stringsCount: this.stringsCount,
      price: this.price
    };
  }
}
