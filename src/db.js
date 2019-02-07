/* eslint-disable no-param-reassign */
const _ = require('lodash');
const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const { makeTableName } = require('./name');

module.exports = dir => {
  const DB_PATH = path.join(dir, 'dvc.db');
  const adapter = new FileSync(DB_PATH);
  const db = low(adapter);

  // Set defaults (required if JSON file is empty)
  db.defaults({
    dvc_version: '1',
    current: 1,
    versions: [1],
    records: [],
  }).write();

  const Controller = {
    create: (name, version, table) => {
      table = table || makeTableName({ name, version });
      db.get('records')
        .push({ name, version, table })
        .write();
    },
    new: name => {
      Controller.create(name, db.get('current').value());
      return Controller.get(name);
    },
    get: name => {
      const version = db.get('current').value();
      const result = db
        .get('records')
        .find({ name, version })
        .value();
      return result || Controller.new(name);
    },
    getAll: version => {
      return db
        .get('records')
        .filter({ version })
        .value();
    },
    bump: (...names) => {
      // Increment current version
      db.update('current', n => n + 1).write();
      const version = db.get('current').value();
      // Record new version number
      db.get('versions')
        .push(version)
        .write();
      // Add new records for all names
      db.get('records')
        .filter({ version: version - 1 })
        .value()
        .forEach(({ name, table }) => {
          console.log(name);
          // If the new record is being bumped, give it a new name.
          if (_.indexOf(names, name) >= 0) {
            Controller.create(name, version);
          }
          // Non-bumped records should keep the same name as before.
          else {
            Controller.create(name, version, table);
          }
        });
    },
  };

  return Controller;
};
