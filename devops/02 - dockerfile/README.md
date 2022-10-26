## Prerequsite

* Docker 19.03 or greater

## Legend

A go web application that outputs container_id(hostname) and access count.
There is a dockerfile and application code in current folder.
You need to optimize the Dockerfile by correcting or adding steps.

## Questions

1. What is Docker? Which technology is it based on?

Answer 1: ***docker is an OS lever virtualization which uses the container based approach to isolade an application. We pack all the libraries and neccesarry dependencies of an application in so called docker image. And a container is an image in running mode.***

2. Look at the Docker file – what would you change in it?

Answer 2: *** A docker file is simply a text based configuration file to build an image. basically we mention all the steps need to be done to build the image (f.g. docker build) command. I changed updated the docker file and new we can run our go app with out any problem. all the changes have been commented, you can refer to the docker file.***


3. How do I pass variables to the Docker file when building and running the container?

Answer3: ***we can pass variable using ENV command in the docker file***

4. Why do we need multistage build ?

Answer 3:
 ***this approach is used to reduce the final size of the final build image and fastern the process. We can use mutli FROM command in our dockerfile to make it multi-stage***

## Tasks

* Dockerfile - generate .env file inside Dockerfile, provide value of port at build step.

* Multi-stage build – change the Dockerfile to make it multi-stage. Try to get the lowest container size.

Answer: ***below shows when we build the image in with regular practice and the size of the image is 858MB***
```
hamid@ubuntu:~/Desktop/internship/devops/02 - dockerfile$ sudo docker images | grep testgo
testgo       latest    3f91a210f0a6   30 seconds ago   858MB
```
***we can also use alpine version of the golang image which also reduce the size of the docker image to 337 see below***
```
hamid@ubuntu:~/Desktop/internship/devops/02 - dockerfile$ sudo docker images | grep testgo-alpine
testgo-alpine   latest    37d7953f8f3f   11 seconds ago   337MB
```

***But after editing the docker file into multi-stage mode we see a significant amount of change in size to 12.3MB as shown below***

```
hamid@ubuntu:~/Desktop/internship/devops/02 - dockerfile$ sudo docker images | grep stage
testgo-multi-stage   latest    756259ca568b   56 seconds ago   12.3MB
```



* Compare size of docker images with and without multistage build.

* Write down all commands which you have used.

Generating alpine version of the image.

```
sudo docker build -t testgo-alpine .
sudo docker images | grep testgo-alpine
```
Generating multi-stage version of the image.

```
sudo docker build -t testgo-multiStage .
sudo docker build -t testgo-multi-stage .
```
