

## mongorestore

you'll need mongorestore so the tests can load snapshots

doesn't hurt to have mongodump as well so you can create snapshots

https://docs.mongodb.com/database-tools/installation/installation-linux/

## create a snapshot

```
mongodump \
  --uri="mongodb://timelog:timelog@localhost:27017/timelog" \
  --archive \
  > ./001.001.archive
```
