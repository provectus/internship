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

## Questions

1. What is the difference between Docker Compose and dockerfile? Why do I need Docker Compose?

There are 2 main differences:

1) The Dockerfile is used primarily for managing a single container in a simple text form which describes how to build an image. The Docker Compose in another hand is used as a kind of orchestration tool for managing multiple containers which give us more granularity in regards to deployment. For example, with the Docker Compose, we can define things like network, volumes etc. Docker Compose define the services that make up your app in docker-compose.yml so they can be run together in an isolated environment. It get an app running in one command by just running docker-compose up. Docker compose uses the Dockerfile if one add the build command to your project’s docker-compose.yml. 

2) The Dockerfile uses imperative style where we strictly define instructions (commands) in a sequential way and imperative mood. The Docker Compose, in contrast, uses a declarative style that expresses the logic of a computation without describing its control flow.


2. How do I parameterize compose for different environments?

We can use multiple Compose files for different environments such as staging, prod etc. By default, Compose reads two files, a docker-compose.yml and an optional docker-compose.override.yml. Usually, the docker-compose.yml contains our base configuration. The override file, as it is stated in the name, can contain configuration overrides for existing services or entirely new services. In case of the files are contain the same services then Compose will merge them in certain rules defined separately for different value options. 
For production, it is recommended to use an additional Compose file, let's name it production.yaml which will contain the appropriate configuration. We should keep in mind that this configuration file only needs to include the changes we would like to make from the original Compose file. Once we created the second file we can use it with the -f option:

 $ docker-compose -f docker-compose.yml -f production.yml up -d

3. What types of entities are used in docker-compose and for what purpose?

The main entities of the Compose are the following:

- Services - here we define compute components for applications like db, front-end etc. In most cases with compose we set multiple containers which have to both run together with adequate shared resources and communication channels. When we talk about these 2 functions (shared resources and communication channels) we come to the next 2 important entities: networks and volumes
- Networks - the main function of which is to provide communication between services and/or containers 
- Volumes - basically these are persistent data stores which could be shared folders provisioned via CIFS/NFS protocols, or LUNs provisioned via block-level protocols like FC or iSCSI or object-level storage provisioned via protocols like S3 or Swift 
- Configs - dedicated concept for services that require configuration data. Due to *nix-based nature where pretty much everything is a file from a container point of view, Configs are comparable to Volumes because they also files mounted to the container.  
- Secrets - if we have sensitive data that needs to be protected and shouldn't be exposed without security considerations then we can user Secters which are basically a flavour of Configs
- Project - primarily used to group resources together and isolate them from other applications of the same Compose specified application


4. `*` How to output application logs?

- In case if we want to see output logs from a specific service we can use: 

docker-compose logs <name-of-service>

- Logs for all services:

docker-compose logs -t -f --tail <no-of-lines>

- To show information logged by all containers participating in a service (dy default STDOUT and STDERR)

docker service logs <name-of-service>

- To show logs of a running container (dy default STDOUT and STDERR):

docker logs <container id>

In 2 cases docker logs may not be quite informative: 

1) If we use a logging driver which sends logs to a file, an external host, a database, or another logging back-end. Keep in mind that reading this log information requires decompressing rotated log files, which causes a temporary increase in disk and CPU usage while decompressing.
In this case we should check individually how to access the logs.

2) If our image runs a non-interactive process such as a web server or a database, that application may send its output to log files instead of STDOUT and STDERR.
In this case for nginx:
The official nginx image creates a symbolic link from /var/log/nginx/access.log to /dev/stdout, and creates another symbolic link from /var/log/nginx/error.log to /dev/stderr, overwriting the log files and causing logs to be sent to the relevant special device instead.
For Apache:
The official httpd driver changes the httpd application’s configuration to write its normal output directly to /proc/self/fd/1 (which is STDOUT) and its errors to /proc/self/fd/2 (which is STDERR).

By default, Docker uses the json-file logging driver, which caches container logs as JSON internally. In addition to using the logging drivers included with Docker, we can also implement and use logging driver plugins. To find current default logging driver for the Docker daemon, run:
docker info --format '{{.LoggingDriver}}'


4. `*` How to copy\upload a file from host machine to the container?

docker cp <source paht> <desination path>

For example, from host to the container:
docker cp default.conf a-container:/etc/nginx/conf.d/default.conf
To check run docker exec a-container cat /etc/nginx/conf.d/default.conf

5. `*` How to save file changes made inside the container?

One way is to change it in the host, save and then copy to the container. Another way there are text editors like vi or nano and cli like ash or bash we can use docker exec <container-name> bash command. 

If the question was about saving data inside of the container after stopping them then using persistent volumes is one of the most obvious solutions.  

## Tasks

* Docker-compose has a bug - investigate it! What would you improve?

There are 2 bugs I have found:

1) Running 'Bootstrap the DB' command causing an error, the same with starting the application:
sqlalchemy.exc.NoSuchModuleError: Can't load plugin: sqlalchemy.dialects:postgres
ERROR: 1

The fix can be found in Stackoverflow:
In database.py there should be
'postgresql://' instead of 'postgres://'

After that DB can be initiated as in README.md and then the app starts.

2) A bug in the submission forma - it redirects to:
http://localhost%2Clocalhost:8080/success

This is because of duplicate header in Nginx config:
conf.d/flaskapp.conf

        proxy_set_header   Host                 $host;
...
proxy_set_header Host $http_host;

We need to remove the first so the config looks like:

    location / {
        proxy_set_header   X-Real-IP            $remote_addr;
        proxy_set_header   X-Forwarded-For      $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto    $scheme;
        proxy_set_header   Host                 $http_host;

        proxy_pass http://flaskapp:5090;
    }

It works redirecting to http://localhost:8080/success printing on form submit:
Thank you for signing up!

* Docker-compose with an environment file. Create 2 different environment files for docker-compose

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

