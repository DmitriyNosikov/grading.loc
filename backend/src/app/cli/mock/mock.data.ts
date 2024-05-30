import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

import { StringsCount, productTypeList } from '../../libs/types';
import { ProductValidation } from '../../product/product.constant';



export function getMockAdmin() {
  return {
    name: 'admin',
    password: 'admin',
    passwordHash: '',
    email: 'root@grading.loc'
  };
};

export function getMockProduct() {
  const musicalInstruments = [
    'Gibson',
    'Fender',
    'Trully Hawaian Ukulele',
    'Chester Bennington`s guitar',
    'Richie Sambora`s guitar'
  ];

  return {
    vendorCode: randomUUID(),
    title: `${faker.helpers.arrayElement(musicalInstruments)} .no#${faker.number.int({ max: 1000 })}`,
    description: faker.lorem.words(10),
    photo: "https://some.interesting/photo.jpg",
    type: faker.helpers.arrayElement(Object.values(productTypeList)),
    stringsCount: faker.helpers.arrayElement(StringsCount),
    price: faker.number.int({
      min: ProductValidation.PRICE.MIN,
      max: ProductValidation.PRICE.MAX,
    })
  };
}
