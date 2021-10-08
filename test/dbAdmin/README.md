### common ops

creating a fresh db with 1 user
```
node purge.js mongodb://timelog:timelog@localhost:27017/timelog yesReally!
node createUser.js --name=test
mongodump \
  --uri="mongodb://timelog:timelog@localhost:27017/timelog" \
  --archive \
  > ./002.002.archive
```

create a db with 12 users, 256 entries
```
node purge.js --uri="mongodb://timelog:timelog@localhost:27017/timelog" --yesReally
node createUsers.js --name=test --count=12
node createEntries.js --count=256
```

### clearing the db

Just fire up mongo-express, open the db, and delete each collection.

### create user

see createUser.js
