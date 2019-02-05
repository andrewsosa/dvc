const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('dvc.db');
const db = low(adapter);

// Set defaults (required if JSON file is empty)
db.defaults({ records: [], versions: [], current: 1 }).write();

module.exports = {
  new: name => {
    const version = db.get('current').value();
    return db
      .get('records')
      .push({ name, version })
      .write();
  },
  get: name => {
    return (
      db
        .get('records')
        .find({ name })
        .value() || module.exports.new(name)
    );
  },
  getAll: version => {
    return db
      .get('records')
      .find({ version })
      .value();
  },
  bump: (...names) => {
    // Increment current version
    const version = db.update('current', n => n + 1).write();
    // Record new version number
    db.get('versions').push(version);
    // Add new records for bumped names
    names.forEach(this.new);
  },
};
