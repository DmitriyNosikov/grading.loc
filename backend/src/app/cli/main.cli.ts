#!/usr/bin/env node
import { Command } from './commands/command.interface';
import { CLIApplication } from './cli-application';
import { CLIHelper } from './cli-helper';

async function bootstrap() {
  console.log('PROCESS ARGV: ', process.argv);
  const cliHelper = new CLIHelper();
  const importedCommands: Command[] = await cliHelper.importCommands();

  const application = new CLIApplication();

  application.registrCommands(importedCommands);
  application.executeCommand(process.argv);
}

bootstrap();
