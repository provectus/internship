FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
