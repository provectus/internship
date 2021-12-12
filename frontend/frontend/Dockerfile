# pull official base image
FROM node:14.17.0


# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm i -g npm@latest
RUN npm i npm@latest
RUN npm install


# add app
COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]