#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const listTemplates = require('./src/commands/listTemplates');
const addTemplate = require('./src/commands/addTemplate');
const deleteTemplate = require('./src/commands/deleteTemplate');
const useTemplate = require('./src/commands/useTemplate');
const help = require('./src/commands/help');

program
  .command('list')
  .description('List all templates with description')
  .action(listTemplates);

program
  .command('add')
  .description('Add a new template')
  .action(addTemplate);

program
  .command('delete <name>')
  .description('Delete a template by name')
  .action(deleteTemplate);

program
  .command('use <name>')
  .description('Use a template')
  .action(useTemplate);

program
  .command('help')
  .description('Show help menu')
  .action(help);

program.parse(process.argv);
