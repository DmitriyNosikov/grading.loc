import { Logger } from '@nestjs/common';
import { resolve } from 'node:path';
import { glob } from 'glob';
import { Command } from './commands/command.interface';

const WINDOWS_FILE_PROTOCOL = 'file:///';
const COMMANDS_DIR = './commands/';

const MessageText = {
  PARSE: 'Trying to parse command:',
  SUCCESS: 'Command successfully parsed:',
  PARSED_COMMANDS: 'Parsed commands count:',
} as const;

const ErrorText = {
  IMPORT: ' Can`t import command module. Error:'
} as const;

type ParsedCommands = Record<string, string[]>;

export class CLIHelper {
  private readonly logger: Logger;
  private importedCommands: Command[] = [];
  private commandFiles;

  constructor() {
    this.logger = new Logger('[App CLI]');
    this.commandFiles = glob.sync(`${COMMANDS_DIR}/*.command.ts`);
  }

  public async importCommands() {
    for(const file of this.commandFiles) {
      this.logger.log(`${MessageText.PARSE} ${file}`);

      const filePath = resolve(file);
      const commandPath = `${WINDOWS_FILE_PROTOCOL}${filePath}`;

      try {
        const importedModule = await import(commandPath);
        const [CommandClassName] = Object.keys(importedModule);

        if(typeof importedModule[CommandClassName] !== 'function') {
          continue;
        }


        const commandInstance = new importedModule[CommandClassName]();

        this.logger.log(`${MessageText.SUCCESS} ${CommandClassName}`);

        if(!this.importedCommands[commandInstance]) {
          this.importedCommands.push(commandInstance);
        }
      } catch(err) {
        this.logger.error(ErrorText.IMPORT, err);

        if(err instanceof Error) {
          this.logger.error(err.message);
        }
      }
    }

    this.logger.log(`${MessageText.PARSED_COMMANDS} ${this.importedCommands.length}`);

    return this.importedCommands;
  }

  public parseCommands(cliArguments: string[]): ParsedCommands {
    const parsedCommands: ParsedCommands = {};
    let command = '';

    cliArguments.forEach((argument) => {
      if(argument.startsWith('--')) {
        command = argument;
        parsedCommands[argument] = [];
      } else if(command && argument && !parsedCommands[command].includes(argument)) {
        parsedCommands[command].push(argument);
      }
    });

    return parsedCommands;
  }
}
