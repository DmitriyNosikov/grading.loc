#!/usr/bin/env ts-node

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Command } from 'commander';

import { ConfigEnvironment } from 'backend/src/config';
import { UserSchema } from '../user/user.model';
import { MongoDatabaseClient } from './database-client/mongo.database-client';

import { BCryptHasher, getMongoConnectionString } from '../libs/helpers';
import { getMockAdmin, getMockProduct } from './mock/mock.data';

/**
 * Commands-list:
 * npm run cli --generate 3 postgresql_conection_string
 * npm run cli -- --help
 */
@Injectable()
export class CLIService {
  private readonly logger: Logger = new Logger(CLIService.name);
  private readonly program: Command;
  private mongoDBCLient: MongoDatabaseClient;
  private prismaClient:PrismaClient;


  constructor(
    @Inject('Hasher') private readonly hasher: BCryptHasher,

    private readonly configService: ConfigService,
  ) {
    this.program = new Command();
    this.registerCommands();
  }

  public execute() {
    this.logger.log(`🚀 CLI Application is executing`);
    this.program.parse(process.argv);
  }

  private registerCommands() {
    this.program
      .name('GuitarShopCLI')
      .description('CLI service to generate mock data and fill database')
      .passThroughOptions()

    this.registerHelpCommand();
    this.registerGenerateCommand();
  }

  private registerHelpCommand() {
    this.program
      .command('--help', { isDefault: true })
      .alias('help')
      .description('Displays availible CLI commands list')
      .action(() => {
        this.logger.log('Running "Help" command ...');

        this.program.outputHelp();
      });

    this.logger.log('📃 Command "--help" registered');
  }

  private async registerGenerateCommand() {
    this.program
      .command('--generate')
      .alias('generate')
      .argument('<n>', 'generate items count')
      .argument('<dbConnectionString>', 'correct PostgreSQL connection string')
      .action(async (itemsCount, connectionString) => {
        this.logger.log('Running "Generate" command ...');

        // Insert root user
        this.connectToMongoDB();
        await this.insertRootAdmin();
        this.disconnectFromMongoDB();

        itemsCount = parseInt(itemsCount, 10);

        if(!itemsCount) {
          this.program.error(`Generating items count must be an integer number. Passed: ${itemsCount}`);
        }

        // Insert Products
        this.connectToPostgreSQL(connectionString);
        await this.insertProducts(itemsCount);
        this.disconnectFromPostgreSQL();
      });

    this.logger.log('📃 Command "--generate" registered');
  }

  private async insertRootAdmin() {
    this.logger.log('📃 Create root user ...');

    const rootUser = getMockAdmin();
    rootUser.passwordHash = await this.hasher.getHash(rootUser.password);

    const mongoDBConnection = this.mongoDBCLient.getConnection();
    const UserModel = mongoDBConnection.model('UserModel', UserSchema);
    const isUserExists = await UserModel.findOne({ email: rootUser.email }).exec();

    if(isUserExists) {
      this.logger.log(`⚠️ Root user with email ${rootUser.email} already exists`);
      return;
    }

    await UserModel.create(rootUser);
  }

  private async insertProducts(itemsCount) {
    this.logger.log('📃 Fill products database ...');

    const products = Array.from({ length: itemsCount }, getMockProduct);
    const result = await this.prismaClient.product.createMany({
      data: products,
      skipDuplicates: true
    });

    this.logger.log(`🤘️ Items count successfully inserted into PostgreSQL database: ${result.count}`);
  }

  private async connectToMongoDB(conenctionString?: string) {
    if(!conenctionString) {
      conenctionString = getMongoConnectionString({
        host: this.configService.get<string>(`${ConfigEnvironment.MONGODB}.host`),
        port: this.configService.get<string>(`${ConfigEnvironment.MONGODB}.port`),
        dbName: this.configService.get<string>(`${ConfigEnvironment.MONGODB}.dbName`),
        username: this.configService.get<string>(`${ConfigEnvironment.MONGODB}.user`),
        password: this.configService.get<string>(`${ConfigEnvironment.MONGODB}.password`),
        authDatabase: this.configService.get<string>(`${ConfigEnvironment.MONGODB}.authDatabase`),
      })
    }

    this.logger.log(`⌛ Connect to MongoDB via link: ${conenctionString} ...`);

    this.mongoDBCLient = new MongoDatabaseClient();
    this.mongoDBCLient.connect(conenctionString);
  }

  private async disconnectFromMongoDB() {
    this.logger.log('🚫 Disconnect from MongoDB');

    this.mongoDBCLient.disconnect();
  }

  private connectToPostgreSQL(conenctionString: string) {
    // postgres://admin:admin@localhost:5432/grading-product
    this.logger.log(`⌛ Connect to PostgreSQL via link: ${conenctionString} ...`);
    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: conenctionString
        }
      }
     });
  }

  private disconnectFromPostgreSQL() {
    this.logger.log('🚫 Disconnect from PostgreSQL');
    this.prismaClient.$disconnect();
  }
}
