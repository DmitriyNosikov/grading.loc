#!/usr/bin/env node
import { CLIApplication } from './cli-application';
import { CLIHelper } from './cli-helper';
import { Command } from './commands/command.interface';

async function bootstrap() {
  console.log('PROCESS ARGV: ', process.argv);
  const cliHelper = new CLIHelper();
  const importedCommands: Command[] = await cliHelper.importCommands();

  const application = new CLIApplication();

  application.registrCommands(importedCommands);
  application.executeCommand(process.argv);
}

bootstrap();
