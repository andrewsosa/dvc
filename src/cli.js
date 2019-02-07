#!/usr/bin/env node

const program = require('commander');
const commands = require('./commands');
const datastore = require('./db');
const setup = require('./setup');

const { actions } = setup(commands, datastore);

program
  .command('init')
  .description('Initialize DVC')
  .action(actions.init);

program
  .command('get <name...>')
  .description('Get names for items')
  .action(actions.get);

program
  .command('show <version>')
  .description('List names in version')
  .action(actions.show);

program
  .command('bump <name...>')
  .description('Update version on some tables')
  .action(actions.bump);

program.parse(process.argv);
