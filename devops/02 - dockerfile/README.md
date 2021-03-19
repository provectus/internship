## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?

Docker is a software platform for building applications based on containers — small and lightweight execution environments that make shared use of the operating system kernel but otherwise run in isolation from one another. While containers as a concept have been around for some time, Docker, an open-source project launched in 2013, helped drive the trend towards containerization and microservices in software development that has come to be known as cloud-native development.

2. Look at the Docker file – what would you change in it?

I would change the following:

 
- Add comments to each layer 
- Install active LTS version of node.js at time of writing on stage 1. LTS stands for Long Term Support and the recommended version for most users. Moreover, I would use a specific version also for a reason that if you or someone else builds this image on a different machine, they will get the same version
- We also can switch to slim version to reduce docker image further: 978 MB to 328 MB or to Alpine-based base image to reduce docker image even more further: 978 MB to 179 MB
- Remove not used Apache HTTP Server
- Combine few RUN commands into one to reduce layers
- Resorted order of commands so caching for more layers is used during docker build (here we expect app.js to be changed most of all, supervisord.conf at this stage (for current task) also but later can be moved up)
- Specify the node's image version. We will leave the image "node" to see how multistage helped to shrink the size of the image
- Add a user node to the config file to reduce security risks of using root and follow principle of least privilege
- Add changing ownership  --chown=node:node ./
- Use JSON array format 
- In this case, app is using port 3000 so we exposed this port:
app.listen(3000, () => console.log('Server ready'))
But in my local machine port 3000 was busy so I used 8080 
- If the same project is built locally (without Docker) then it makes sense to add a .dockerignore file to exclude files and directories and make the size of the image lighter. For this node.js example we could use the following syntax:

# Exclude local modules and debug logs from being copied to the Docker image
node_modules
npm-debug.log

-add LABEL with maintainer contacts

3. How do I pass variables to the Docker file when building and running the container?

During the build phase, we can use ARG instruction to defines a variable that can be passed in conjunction with the docker build command using the --build-arg <varname>=<value> flag. However, to make it work we should specify a build argument in the Dockerfile. For example:

$ docker build --build-arg user=root . -t internship01

During the run, we can pass it by using CMD or ENTRYPOINT which defines what command gets executed when running a container. As well as we can specify them in the docker run command via an environment variable (-e) like in the following example: docker run -e env_var_name=value1

## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address

It is not possible to do with ENV in Dockerfile because ENV is defined during Docker build phase whereas container IP can be fetched only during start up

If the task should be done through Dockerfile only then we can keep original supervisord.conf but pass container IP through CMD by adding the following line to the Dockerfile:

CMD ["/bin/bash", "-c", "HOST=\"${HOST:-$(hostname -i)}\" exec /usr/bin/supervisord"]  

So our Dockerfile will look like:

#Slim version will be used to reduce docker image further: 978 MB to 328 MB
FROM node:lts-slim

#Put the image maintainer email 
LABEL maintainer="airatvf@gmail.com" 

#Install the software and create directories 
RUN apt-get update && \
    apt-get install -y openssh-server supervisor && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p /var/run/sshd /var/log/supervisor
	
#Create and set work/default directory and set up ownership for the directory to follow principle of least privilege 	
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

#Copy both files package.json and package-lock.json and app.js to the root directory of the node.js image  
COPY ["example/package.json", "./"]

#Change user to node to follow principle of least privilege and install npm under node 
USER node 

#Install npm 
RUN npm install

#To ensure that the files are owned by the unprivileged node user rather than root 
COPY --chown=node:node . .

#Open port 3000 because node.js is listening it 
EXPOSE 3000

#In bash run hostname -i to display the IP address of the container and assign it to HOST variable  and execute supervisord 
CMD ["/bin/bash", "-c", "HOST=\"${HOST:-$(hostname -i)}\" exec /usr/bin/supervisord"]

#Copy file supervisord.conf to container's /etc 
COPY ["supervisord.conf", "/etc/supervisor/conf.d/supervisord.conf"]

#Copy all file to the container's home directory 
COPY ["example/app.js", "./"]


* Multi-stage build – change the Dockerfile to make it multi-stage.

#In stage 1 we will use slim version to reduce docker image further: 978 MB to 328 MB
FROM node:lts-slim as base

#Put the image maintainer email 
LABEL maintainer="airatvf@gmail.com" 

#Install the software and create directories 
RUN apt-get update && \
    apt-get install -y openssh-server supervisor && \
    mkdir -p /var/run/sshd /var/log/supervisor
	
#Create and set work/default directory and set up ownership for the directory to follow principle of least privilege 	
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app


#Stage 2

FROM base as packages

#Copy both files package.json and package-lock.json and app.js to the root directory of the node.js image  
COPY ["example/package.json", "./"]

#Change user to node to follow principle of least privilege and install npm under node 
USER node 

#Install packages and any packages that it depends on
RUN npm install


#Stage 3

FROM packages as app

#Copy file supervisord.conf to container's /etc 
COPY ["supervisord.conf", "/etc/supervisor/conf.d/supervisord.conf"]

#Open port 3000 because node.js is listening it 
EXPOSE 3000

#In bash run hostname -i to display the IP address of the container and assign it to HOST variable  and execute supervisord 
CMD ["/bin/bash", "-c", "HOST=\"${HOST:-$(hostname -i)}\" exec /usr/bin/supervisord"]

#Copy app file to the container's home directory and change owners to follow principle of least priviledge 
COPY --chown=node:node ["example/app.js", "./"] 

