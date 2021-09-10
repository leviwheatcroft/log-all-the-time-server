docker run -d \
    --rm \
    --name latt-postgres \
    -e POSTGRES_USER=latt \
    -e POSTGRES_PASSWORD=latt \
    -e POSTGRES_DB=latt-db \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v /home/levi/git/log-all-the-time-server/postgres:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres


docker run -d \
    --rm \
    --link latt-postgres:db \
    -p 8080:8080 \
    adminer
