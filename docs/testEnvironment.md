

## mongorestore

you'll need mongorestore so the tests can load snapshots

doesn't hurt to have mongodump as well so you can create snapshots

https://docs.mongodb.com/database-tools/installation/installation-linux/

## create a snapshot

in bson...
```
mongodump \
  --uri="mongodb://timelog:timelog@localhost:27017/timelog" \
  --archive \
  > ./002.002.archive
```

exporting to json is more problematic than it's worth. mongoexport can export single collections but not the whole db.
