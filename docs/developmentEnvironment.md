## mongo docker

specifying the MONGO_INITDB_DATABASE env var won't actually create that database. It's just the database that will be provided if you provide some init scripts as well.

mongo-express container is probably a better admin ui because it doesn't require installing a .deb package.

To get that to work you need to run both containers on the same network.

If you create these fresh, then you'll need to use the admin ui to create a database and user.

```
docker network create -d bridge timelog
```

```
docker run \
  -d \
  --net timelog \
  --rm \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=rootpwd \
  -v /home/levi/git/time-log-server/mongoData:/data/db \
  -p "27017:27017" \
  --name mongo \
  mongo:4.4.3-bionic --auth
```

```
docker run \
  -d \
  --rm \
  --net timelog \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=root \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=rootpwd \
  -p "8081:8081" \
  --name mongo-express \
  mongo-express
```

## initialise db

you can't create users via mongo-express

```
mongosh "mongodb://root:rootpwd@localhost:27017"
```

```
use timelog
```

```
db.createUser(
  {
    user: "timelog",
    pwd: "timelog",
    roles: [ { role: "readWrite", db: "timelog" } ]
  }
)
```

```
exit
```
