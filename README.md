# `dvc.js`

> Prototype data version control CLI

The idea is to be able to map a `(name, version)` pair to a unique identifier such as a table name.

## Example

```sh
# create a new id
$ dvc get andrew
andrew.version1.table

# make more ids...
$ dvc get morgan
morgan.version1.table

# show everything in version 1
$ dvc show 1
{ name: 'andrew', version: 1, table: 'andrew.version1.table' }
{ name: 'morgan', version: 1, table: 'morgan.version1.table' }

# introduce a new version, with a new identifier for `andrew`
$ dvc bump andrew
andrew
morgan

# morgan still references version 1 table name
$ dvc show 2
{ name: 'andrew', version: 2, table: 'andrew.version2.table' }
{ name: 'morgan', version: 2, table: 'morgan.version1.table' }
```

## Usage

Not available on NPM. Use `npm link` after cloning.
