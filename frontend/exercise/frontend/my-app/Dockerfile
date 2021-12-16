FROM node:14
WORKDIR /app
COPY package*.json ./
#use package-lock to install dependencies
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]