# DVC spec

```sh
# get table name
$ dvc get task1 task2
task1.version1.table

# increment version
$ dvc bump task1
task1.version2.table

# get a new table
$ dvc get task2
task2.version2.table

# show tables in version
$ dvc version 1
task1

$ dvc version 2
task1
task2



```
