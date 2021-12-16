Application can be run using docker(or docker-compose), port 3000 is exposed by default. \
To run application in detach mode run these commands: \
To build app: `docker-compose build` \
To run app: `docker-compose up -d` \
It uses localhost as url, so if you want to use docker instead of docker-compose, you need to change url to appropriate(edit this file `src/config/api.ts`, `host.docker.internal` is link to host, from container) or create docker network. You can check ports of other applications(backend and database) in docker-compose file. \
If you want to run app on your machine without docker you need to install nodejs, you can run development server using `npm start`. \
For development I use node v14.18.2. \
After starting application visit `localhost:3000`.