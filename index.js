#!/usr/bin/env node
/* eslint-disable no-unused-vars */

const program = require('commander');
const db = require('./db');

program
  .command('init')
  .description('Initialize DVC')
  .action(args => {
    console.log('hello, world!');
  });

program
  .command('get <name...>')
  .description('Get names for items')
  .action((names, args) => {
    names.forEach(name => {
      console.log(db.get(name));
    });
  });

program
  .command('show <version>')
  .description('List names in version')
  .action((version, args) => {
    db.getAll(version).forEach(console.log);
  });

program.parse(process.argv);
