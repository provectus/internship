# default version, may be set when build
ARG NODE_VERSION=alpine3.13

FROM node:${NODE_VERSION} AS base

COPY ./example/package.json ./app/package.json

WORKDIR /app

RUN npm install

# copy node_modules from base to prod image

FROM node:${NODE_VERSION} AS prod

# default variable, you must set it when build. To see IP adress build with --build-arg var_name=$(hostname -I | cut -f1 -d' ')
ARG var_name=localhost

ENV HOST=$var_name

WORKDIR /app

# this is the need modules
COPY --from=base /app/node_modules /app/node_modules

# copy app.js to prod image
COPY ./example/app.js .

# there set user to run proceses
USER node

CMD ["node","app.js"]
