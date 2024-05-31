import { BasePostgresRepository } from '@backend/libs/data-access';
import { ProductInterface } from '@backend/libs/interfaces';
import { PaginationResult, SearchFilters, SearchQuery, SortDirectionEnum, SortType, SortTypeEnum } from '@backend/libs/types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE, MAX_ITEMS_PER_PAGE } from './product.constant';
import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';

@Injectable()
export class ProductRepository extends BasePostgresRepository<ProductEntity, ProductInterface> {
  constructor(
    entityFactory: ProductFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async create(entity: ProductEntity): Promise<ProductEntity> {
    const document = await this.dbClient.product.create({
      data: entity
    });

    const product = this.createEntityFromDocument(document);

    return product;
  }

  public async updateById(
    id: string,
    updatedFields: Partial<ProductEntity>): Promise<ProductEntity> {
    const document = await this.dbClient.product.update({
      where: { id },
      data: { ...updatedFields }
    });

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.dbClient.product.delete({
      where: { id }
    });
  }

  public async findById(id: string): Promise<ProductEntity> {
    const document = await this.dbClient.product.findFirst({
      where: { id }
    });

    return this.createEntityFromDocument(document);
  }

  public async search(query?: SearchQuery): Promise<PaginationResult<ProductEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = (!query?.limit || query?.limit > MAX_ITEMS_PER_PAGE) ? MAX_ITEMS_PER_PAGE : query.limit;
    const { where, orderBy } = this.getSearchFilters(query);

    // Запрос на получение результата поиска
    const [items, totalItemsCount] = await Promise.all([
      this.dbClient.product.findMany({
        where,

        // Pagination
        take,
        skip,
        orderBy
      }),
      this.getItemsCount(where)
    ]);

    const itemsEntities = items.map((item) => this.createEntityFromDocument(item));

    return {
      entities: itemsEntities,
      currentPage:  query?.page ?? 0,
      totalPages: this.calculateItemsPage(totalItemsCount, take),
      totalItems: totalItemsCount,
      itemsPerPage: take ?? totalItemsCount,
    }
  }

  public async isExists(id: string): Promise<boolean> {
    const product = await this.dbClient.product.findFirst({
      where: { id }
    });

    if(!product) {
      return false;
    }

    return true;
  }

  //////////////////// Вспомогательные методы поиска и пагинации ////////////////////
  private getSearchFilters(query: SearchQuery): SearchFilters {
    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    // Поиск по заголовку
    if(query?.title) {
      where.title = {
        contains: query.title,
        mode: 'insensitive'
      }
    }

    // Поиск по определенному типу
    if(query?.type) {
      where.type = query.type;
    }

    // Поиск по количеству струн
    if(query?.stringsCount) {
      where.stringsCount = query.stringsCount;
    }

    // Сортировка и направление сортировки
    const { key, value } = this.getSortKeyValue(query.sortType, query.sortDirection);

    orderBy[key] = value;

    return { where, orderBy };
  }

  private getSortKeyValue(sortType: SortTypeEnum, sortDirection: SortDirectionEnum) {
    switch(sortType) {
      case(SortType.CREATED_AT): {
        return { key: 'createdAt', value: sortDirection };
      }
      case(SortType.PRICE): {
        return { key: 'price', value: sortDirection };
      }
      default: {
        return { key: DEFAULT_SORT_TYPE, value: DEFAULT_SORT_DIRECTION };
      }
    }
  }

  private async getItemsCount(where: Prisma.ProductWhereInput): Promise<number> {
    return this.dbClient.product.count({ where });
  }

  private calculateItemsPage(totalCount: number, limit: number): number {
    const postsPages = Math.ceil(totalCount / limit);
    return postsPages;
  }
}
