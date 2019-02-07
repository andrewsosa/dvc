const findUp = require('find-up');
const fs = require('fs');
const path = require('path');

module.exports = (commands, datastore) => {
  // First, see if we can find a .dvc directory
  let dir = findUp.sync('.dvc');
  if (dir) {
    const db = datastore(dir);
    const actions = commands(db);
    return { actions, db };
  }
  // We couldn't find .dvc, so we need to:
  //  1. Disable all commands
  const db = {};
  const actions = commands(db);
  Object.keys(actions).forEach(key => {
    actions[key] = () =>
      console.log(
        'fatal: not a dvc repository (or any of the parent directories): .dvc',
      );
  });

  //  2. Re-enable init, now can be called
  actions.init = () => {
    // Create the .dvc
    dir = path.join(process.cwd(), '.dvc');
    fs.mkdirSync(dir);
    // Create a new DB
    datastore(dir);
    // Print success
    console.log(`Initialized empty Git repository in ${dir}`);
  };

  return { actions, db };
};
