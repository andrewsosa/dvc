/* eslint-disable no-unused-vars */

module.exports = db => ({
  // We don't want init called normally
  init: () => console.log('Nested DVC repositories are not supported.'),
  // stuff
  get: (names, args) => {
    names.forEach(name => {
      console.log(db.get(name).table);
    });
  },
  // more stuff
  show: (version, args) => {
    db.getAll(Number.parseInt(version, 10)).forEach(el => console.log(el));
  },
  // things
  bump: (names, args) => {
    db.bump(...names);
  },
});
