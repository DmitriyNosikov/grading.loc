import { PrismaClient } from '@prisma/client'
import { getProducts } from './mock-data';

async function seedDB(prismaClient: PrismaClient) {
  // Guitar Shop Products
  const mockProducts = getProducts();
  for(const product of mockProducts) {
    await prismaClient.product.create({
      data: {
        type: product.type,
        vendorCode: product.vendorCode,
        title: product.title,
        description: product.description,
        photo: product.photo,
        stringsCount: product.stringsCount,
        price: product.price,
      }
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDB(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
