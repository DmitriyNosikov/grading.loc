import { Prisma } from '@prisma/client';

export type SearchFilters = {
  where: Prisma.ProductWhereInput,
  orderBy: Prisma.ProductOrderByWithRelationInput
};
