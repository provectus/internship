#! /bin/bash
docker exec $(docker ps -q -f name=$STACK_NAME'_flaskapp') /bin/bash -c "cd /opt/services/flaskapp/src && python -c  'import database; database.init_db()'"
