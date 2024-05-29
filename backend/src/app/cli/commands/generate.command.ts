import { Command } from './command.interface.js';

export class GenerateCommand implements Command {
  private mockData: MockData | null = null;

  public getName(): string {
    return '--generate';
  }

  public async generate() {

  }

  public async fillDatabase() {

  }

  public async execute(...parameters: string[]) {
    const [dataCount, postgresqlConnectionString] = parameters;
    const safeDataCount = Number.parseInt(dataCount, 10);

    console.log('RECEIVED CLI-GENERATOR PARAMETERS: ', safeDataCount, postgresqlConnectionString);
  }
}
