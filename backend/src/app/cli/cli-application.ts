import { CLIHelper } from './cli-helper';
import { Command } from './commands/command.interface';

const DEFAULT_COMMAND = '--help';

const ErrorText = {
  ALREADY_EXISTS: 'Command already exists:',
  NO_DEFAULT_COMMAND: 'Default command doesn`t registered.'
} as const;

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};
  private CLIHelper;

  constructor(
    private readonly defaultCommand: string = DEFAULT_COMMAND
  ) {
    this.CLIHelper = new CLIHelper();
  }

  public registrCommands(commandClassList: Command[]): void {
    commandClassList.forEach((commandClass) => {
      if(Object.hasOwn(this.commands, commandClass.getName())) {
        throw new Error(`${ErrorText.ALREADY_EXISTS} ${commandClass.getName()}`);
      }

      this.commands[commandClass.getName()] = commandClass;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand() {
    if(!this.commands[this.defaultCommand]) {
      throw new Error(ErrorText.NO_DEFAULT_COMMAND);
    }

    return this.commands[this.defaultCommand];
  }

  public executeCommand(cliArgv: string[]):void {
    const parsedCommands = this.CLIHelper.parseCommands(cliArgv);
    const [commandName] = Object.keys(parsedCommands);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommands[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
