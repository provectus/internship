#! /bin/bash
for var in $(cat .env)
do
    export $var
done
docker stack deploy -c ./docker-compose.yml $STACK_NAME
