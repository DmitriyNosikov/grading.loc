import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Command } from 'commander';
import { Pool } from 'pg';
import { BCryptHasher } from '../libs/helpers';
import { MongoDatabaseClient } from './database-client/mongo.database-client';
import { getMockProduct } from './mock/mock.data';

@Injectable()
export class CLIService {
  private readonly logger: Logger = new Logger(CLIService.name);
  private mongoDBConnection = new MongoDatabaseClient();
  private readonly program: Command;


  constructor(
    @Inject('Hasher')
    private readonly hasher: BCryptHasher
  ) {
    this.program = new Command();
    // Регистрируем команды
    this.registerCommands();
    // Включаем парсинг коммандной строки
    this.program.parse();
  }

  public execute() {
    this.logger.log(`🚀 CLI Application is executing`)
  }

  private registerCommands() {
    this.program
      .name('GuitarShopCLI')
      .description('CLI service to generate mock data and fill database')

    this.registerGenerateCommand();
  }

  private registerGenerateCommand() {
    this.program
      .command('generate')
      .argument('<n>', 'generate items count')
      .argument('<dbConnectionString>', 'correct PostgreSQL connection string')
      .action((itemsCount, connectionString) => {
        // DATABASE_URL = postgres://admin:admin@localhost:5432/grading-product
        const products = Array.from({ length: itemsCount }, getMockProduct);
        console.log('CONNECTION STRING: ', connectionString);
        console.log('GENERATED PRODUCTS: ', products);
      })
  }

  private async connectToMongoDB(connectionUri: string) {
    this.mongoDBConnection.connect(connectionUri);
  }

  private connectToPostgreSQL(conenctionString: string) {
    const pool = new Pool({ conenctionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
  }
}
