env_file=$1 docker-compose up -d db
echo "Mister Snorlax is tired and going to sleep while database is starting" && sleep 5
#env_file=$1 docker-compose run --rm flaskapp /bin/bash -c "cd /opt/services/flaskapp/src && python -c 'import database; database.init_db()'"
# env_file=$1 docker-compose up -d flaskapp_db_migration
# echo "Mister Snorlax still tired and wants to sleep a bit more while database import is in progress" && sleep 5
env_file=$1 docker-compose up -d
echo "Mister Snorlax feels better after sleep and all containers should be up and running. Please check localhost:8080"
