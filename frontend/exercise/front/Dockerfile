FROM node:16.13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]