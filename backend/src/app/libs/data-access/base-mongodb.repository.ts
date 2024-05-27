import { NotFoundException } from '@nestjs/common';
import { Document, InferId, Model, UpdateQuery } from 'mongoose';

import { Entity } from '../entities/';
import { Repository } from '../interfaces/repository.interface';

import { EntityFactoryInterface, StorableEntityInterface } from '../interfaces/';
import { RepositoryMessage } from './repository.constant';

export class BaseMongoDbRepository<T extends Entity & StorableEntityInterface<ReturnType<T['toPOJO']>>, DocumentType extends Document>
  implements Repository<T>
{
  constructor(
    protected readonly entityFactory: EntityFactoryInterface<T>,
    protected readonly model: Model<DocumentType>,
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (!document) {
      return null;
    }

    const plainObject = document.toObject({ getters: true, versionKey: false, flattenObjectIds: true });

    return this.entityFactory.create(plainObject);
  }

  async findById(entityId: T['id']): Promise<T | null> {
    const document = await this.model.findById(entityId).exec();

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  async create(entity: T): Promise<T | null> {
    const entityPlainObject = entity.toPOJO();
    const document = await this.model.create(entityPlainObject);

    entity.id = document.id;

    return this.createEntityFromDocument(document);
  }

  async updateById(entityId: T['id'], updatedFields: Partial<T>): Promise<T | null> {
    const updatedDocument = await this.model.findByIdAndUpdate(entityId, updatedFields as UpdateQuery<DocumentType>, { new: true, runValidators: true }).exec();

    if (!updatedDocument && RepositoryMessage.ERROR) {
      throw new NotFoundException(RepositoryMessage.ERROR.ENTITY_NOT_FOUND);
    }

    return this.createEntityFromDocument(updatedDocument as DocumentType);
  }

  async deleteById(entityId: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(entityId).exec();

    if (!deletedDocument && RepositoryMessage.ERROR) {
      throw new NotFoundException(RepositoryMessage.ERROR.ENTITY_NOT_FOUND);
    }
  }

  async exists(entityId: InferId<DocumentType>): Promise<boolean> {
    const document = await this.model.exists({ _id: entityId });

    return document !== null;
  }
}
