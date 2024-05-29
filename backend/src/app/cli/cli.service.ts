import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Command } from 'commander';
import { BCryptHasher } from '../libs/helpers';
import { MongoDatabaseClient } from './database-client/mongo.database-client';
import { getMockProduct } from './mock/mock.data';

@Injectable()
export class CLIService {
  private readonly logger: Logger = new Logger(CLIService.name);
  private readonly program: Command;
  private mongoDBCLient: MongoDatabaseClient;
  private prismaClient:PrismaClient;


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

  private async registerGenerateCommand() {
    await this.program
      .command('generate')
      .argument('<n>', 'generate items count')
      .argument('<dbConnectionString>', 'correct PostgreSQL connection string')
      .action((itemsCount, connectionString) => {
        const products = Array.from({ length: itemsCount }, getMockProduct);

        this.logger.log('📃 Fill PostgreSQL database ...');
        this.connectToPostgreSQL(connectionString);
        this.insertProducts(products);
      })
  }

  private async insertProducts(products) {
    const result = await this.prismaClient.product.createMany({
      data: products,
      skipDuplicates: true
    });

    this.logger.log(`🤘️ Items count successfully inserted into PostgreSQL database: ${result.count}`);
  }

  private async connectToMongoDB(conenctionString: string) {
    this.mongoDBCLient = new MongoDatabaseClient();
    this.mongoDBCLient.connect(conenctionString);
  }

  private connectToPostgreSQL(conenctionString: string) {
    // postgres://admin:admin@localhost:5432/grading-product
    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: conenctionString
        }
      }
     });
  }
}
