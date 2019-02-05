/* eslint-env jest */

const fs = require('fs');
const { DB_PATH, ...db } = require('../src/db');
const { makeTableName } = require('../src/name');
const rmdb = done => fs.unlink(DB_PATH, done);

beforeAll(rmdb);

describe('#get', () => {
  afterAll(rmdb);

  const [name, version] = ['name', 1];
  it('creates a name that did not exist', () => {
    expect(db.get(name))
      .toBeDefined()
      .toMatchObject({
        name,
        version,
        table: makeTableName({ name, version }),
      });
  });

  it('returns an existing name', () => {
    expect(db.get(name))
      .toBeDefined()
      .toMatchObject({
        name,
        version,
        table: makeTableName({ name, version }),
      });
  });
});
