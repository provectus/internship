## Prerequsite:

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Вопросы

1 Что такое gitflow и его разновидности?

2 Что такое Continuous integration ?

3 Что такое Continuous deployment ?

4 Какие виды deployment можете назвать и дать их описание ? (Green-blue, etc.)

5 Какие виды тестирования вы знаете? В чем их суть?

`*` 6 Опишите как код с компьютера разработчика доходит до production окружения? Какие этапы вы бы настроили?


## Задания

* deploy jenkins and registry helm to you minikube and configure it

* create pipeline for:

 * build you [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into registry

 `*` update you [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) to new tag and create new release with changelog

 `*` update you helm charts and umbrella helm chart, redeploy umbrella helm chart to minikube
