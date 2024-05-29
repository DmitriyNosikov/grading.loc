import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  constructor() {}

  public getName() {
    return '--help';
  }

  execute() {
    console.info(`
                  ╔╦╗════════╔═╗═════╔╦╗══════
                  ║╩╠═╦═╦═╦╦╗║║╠═╦╦╦╗║║╠═╦═╦╦╗
                  ║╦║╬║╬║╬║║║║║║╩╣║║║╠╗║╩╣╬║╔╝
                  ╚╩╩╩╣╔╣╔╬╗║╚╩╩═╩══╝╚═╩═╩╩╩╝
                  ════╚╝╚╝╚═╝═════════════════
      ${chalk.cyan('Программа для подготовки данных для REST API сервера.')}

      Пример: npm run ts ./src/main.cli.ts --<${chalk.blue('command')}> [--arguments]

      Команды:

        ${chalk.magenta('--help:')}                       ${chalk.cyan('# печатает этот текст')}
        ${chalk.magenta('--generate:')} <${chalk.blue('n')}> <${chalk.blue('PostgreSQL connection string')}> ${chalk.cyan('# генерирует n-ое количество тестовых данных и заполняет ими базу данных')}
    `);
  }
}
