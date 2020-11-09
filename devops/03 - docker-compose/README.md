Prerequsite:

Docker 19.03 or grather

Docker-compose 1.26 or grather

Legend:

Докер композ с 3 приложениями (фронт + бек + БД). 
1 Bootstrap the DB:

`docker-compose up -d db`

`docker-compose run --rm flaskapp /bin/bash -c "cd /opt/services/flaskapp/src && python -c  'import database; database.init_db()'"`

2 Bring up the cluster

`docker-compose up -d`

3 Browse to localhost:8080 to see the app in action.

Вопросы

1 Чем отличается докер композ от докерфайла? Для чего нужен compose?

2 Как параметризировать композ для разных сред?

3 Какие виды сущностей используются в docker-compose и для чего?

`*` 4 Какой командой вывести логи приложения и как скопировать\залить файл в контейнер?

`*` 5 Как сохранить изменения сделанные внутри контейнера?


Задания

* Docker-compose with some bug - invistigate it! what you improve?

* Docker-compose with environment file. Create 2 different environment file and params docker-compose

`*` Изменить докер композ на запуск через docker stack с переиспользованием кода (do not repeat you self)

