module.exports = {
  makeTableName: ({ name, version }) => `${name}.version${version}.table`,
};
