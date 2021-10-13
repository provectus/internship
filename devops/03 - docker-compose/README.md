## Prerequsite

Docker 19.03 or greater

Docker-compose 1.26 or greater

## Legend

Docker compose with 3 applications (frontend + backend + DB).

### Instructions for running

1. Bootstrap the DB:

`docker-compose up -d db`

`docker-compose run --rm flaskapp /bin/bash -c "cd /opt/services/flaskapp/src && python -c  'import database; database.init_db()'"`

2. Boot up the cluster

`docker-compose up -d`

3. Browse to localhost:8080 to see the app in action.

Answer: I performed the above actions and I accessed web server as below shows.

![](https://i.imgur.com/ZIgtQaR.png)


## Questions

1. What is the difference between Docker Compose and dockerfile? Why do I need Docker Compose?

Answer 1: 
***Docker file is used to create an image and it contains text based configurations and commands to assemble and the neccesarry steps to containerize an application, wherease the docker compose is used to run multi-container docker application.***

***Suppose we have a web app that uses the web server (i.e. nginx) and database (i.e mangodb). What we can do is to create a docker compose file which runs many services or images at once so we don't need to have one docker file for each service. docker compose is a powerful tool which makes things very easy***


2. How do I parameterize compose for different environments?

Answer 2: ***To parameterize a docker compose file, the easy way is to use .env file. we can put all the variables in this file and call them in docker compose.yaml file. this is a best practice of better control of the flow and to have less error fault***


3. What types of entities are used in docker-compose and for what purpose?

Answer 3: ***This question is a bit unclear for me. if I understood correctly this means all the configuration blocks such as building block, network block, port block, enviromental variables block, dependencies block and command blocks. from thier names they are self explainatory.***
4. `*` How to output application logs?
Answer 4: ***We can use below config in our docker file to output the log of the nginx application***
```

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
```
***As it is shown below i can access the log of nginx***

![](https://i.imgur.com/gP485XN.png)


5. `*` How to copy\upload a file from host machine to the container?

Answer 5: ***Below is the command***

```
hamid@ubuntu:$ sudo docker ps | grep nginx
b7c9cbc77177   nginx:1.13.5       "nginx -g 'daemon of…"   About an hour ago   Up About an hour   0.0.0.0:8080->80/tcp, :::8080->80/tcp   example_nginx_1
hamid@ubuntu:$ sudo docker cp ~/Desktop/testfile b7c9cbc77177:/
hamid@ubuntu:$ sudo docker exec -it b7c9cbc77177 bash
root@b7c9cbc77177:/# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  testfile  tmp  usr  var
root@b7c9cbc77177:/# 
```
***Note: we can also coply the file while building image using docker file or docker compose***

6. `*` How to save file changes made inside the container?

Answer 6: ***Whatever changes that we make can be persist by commiting it. Below is the command***

```
sudo docker commit [CONTAINER_ID] [new_image_name]
```
***Note: we can also assign a folder in our host machine to make the container persistent in some cases we need***


## Tasks

Answer : *** I have less time for this task otherwise i would do that***

* Docker-compose has a bug - investigate it! What would you improve?

* Docker-compose with an environment file. Create 2 different environment files for docker-compose

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

