## Prerequsite

Docker 19.03 or greater

Docker-compose 1.26 or greater

## Legend

Docker compose with 3 applications (MINIO + postgres + pgadmin).

### Instructions for running

`docker-compose up -d`

### Instructions for stopping

`docker-compose down`

### Credentials

## Postgres
```
username: postgres
password: postgres
port: 5432
```

## MINIO
```
access-key=minio-access-key
secret-key=minio-secret-key
port: 9000
```

## PGAdmin
```
port: 5050
```