type ParsedCommands = Record<string, string[]>;
export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommands {
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
