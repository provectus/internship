#In stage 1 we will use slim version to reduce docker image further: 978 MB to 328 MB
FROM node:lts-slim as base

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

#Stage 2

FROM base as prod

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