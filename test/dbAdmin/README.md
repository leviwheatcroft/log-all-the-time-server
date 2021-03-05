###

creating a fresh db with 1 user
```
node purge.js mongodb://timelog:timelog@localhost:27017/timelog yesReally!
node createUser.js --username=test
mongodump \
  --uri="mongodb://timelog:timelog@localhost:27017/timelog" \
  --archive \
  > ./002.002.archive
```

### clearing the db

Just fire up mongo-express, open the db, and delete each collection.

### create user

see createUser.js
