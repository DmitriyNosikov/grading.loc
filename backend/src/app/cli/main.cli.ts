#!/usr/bin/env node
import 'reflect-metadata';
import { CLIApplication } from './cli-application';
import { Command } from './commands/command.interface';
import { importCommands } from './import-commands';

async function bootstrap() {
  const importedCommands: Command[] = await importCommands();

  const application = new CLIApplication();

  application.registrCommands(importedCommands);
  application.executeCommand(process.argv);
}

bootstrap();
