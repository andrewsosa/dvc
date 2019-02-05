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
      console.log(db.get(name).table);
    });
  });

program
  .command('show <version>')
  .description('List names in version')
  .action((version, args) => {
    db.getAll(Number.parseInt(version, 10)).forEach(el => console.log(el));
  });

program
  .command('bump <name...>')
  .description('Update version on some tables')
  .action((names, args) => {
    db.bump(...names);
  });

program.parse(process.argv);
