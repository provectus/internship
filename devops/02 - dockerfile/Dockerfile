FROM node:lts-alpine

# Set NODE_ENV to production for increased performance
ENV NODE_ENV=production
# Pass port 3000 as an environment variable and expose it to the host 
ENV PORT=3000
EXPOSE 3000

# Update & install packages
RUN apk update && apk upgrade && \
    apk add supervisor

# Create base directory
RUN mkdir /app
WORKDIR /app

# Copy sources and set permissions
COPY ./example/. .
RUN chown -R node:node /app

# Use node user as a standart for node docker images
USER node

# Create logs directory and atach volume to persist logs
RUN mkdir log
VOLUME [ "/app/log" ]

# Copy sources and install application dependencies
RUN chmod 755 /app/app.js
RUN npm install

# Copy supervisor config
COPY supervisord.conf /etc/supervisord.conf
CMD ["/usr/bin/supervisord"]
