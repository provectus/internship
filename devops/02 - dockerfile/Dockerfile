####################################################################################
#
# Multi-Stage: Building app
#
####################################################################################

FROM node:14.16.0-buster-slim as build-app

WORKDIR /usr/src/app

COPY example .

RUN npm install

####################################################################################
#
# Multi-Stage: Running app
#
####################################################################################

FROM node:14.16.0-buster-slim

#this ENV won't work in Docker because you can't define ip address of the container before the start of the container
ENV HOST="$(hostname -i)"

WORKDIR /usr/src/app/node_modules

COPY --from=build-app /usr/src/app/node_modules .

WORKDIR /usr/src/app

COPY --from=build-app /usr/src/app/app.js .

COPY "start.answers" "start.sh"

RUN chmod +x /usr/src/app/start.sh

EXPOSE 3000

ENTRYPOINT ["/bin/bash"]

CMD ["/usr/src/app/start.sh"]
