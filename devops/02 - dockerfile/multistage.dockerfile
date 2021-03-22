# Stage 1
FROM node:lts-alpine as develop

# Pass port as an environment variable and expose it to the host 
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

# Update & install packages
RUN apk update && apk upgrade

# Create base directory
RUN mkdir /app
WORKDIR /app

# Copy sources and set permissions
COPY ./example/. .

# Copy sources and install application dependencies
RUN chmod 755 /app/app.js
RUN npm install
 
# Using shell execution for development
ENTRYPOINT HOST=$(hostname -i) node app.js



# Stage 2
FROM develop as production

# Set NODE_ENV to production for increased performance
ENV NODE_ENV=production

# Install packages
RUN apk add supervisor

# Set permissions for non-root execution (node user)
RUN chown -R node:node /app

# Use node user as a standart for node docker images following LPP
USER node

# Create logs directory and atach volume to persist logs
RUN mkdir log
VOLUME [ "/app/log" ]

# Copy supervisor config & launch
COPY supervisord.conf /etc/supervisord.conf

# Using process execution for production
ENTRYPOINT ["/usr/bin/supervisord"]
