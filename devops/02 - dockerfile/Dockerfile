# Basic image configuration
FROM node:15.12.0-buster-slim AS base
RUN apt-get update && apt-get install -y openssh-server supervisor
RUN mkdir -p /var/run/sshd /var/log/supervisor
WORKDIR /usr/src/app
# Set empty HOST variable, will be set on docker run command execution
ENV HOST=
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Installing node dependencies
FROM base AS dependencies
# Copy the dependencies
COPY example/package*.json ./
# Install dependencies
RUN npm install

# Run application
FROM dependencies AS run
# Copy the application source code
COPY example/app.js ./
# Expose 22 port for SSHd and 3000 port for node.js
EXPOSE 22 3000
# Run application and ssh daemon
CMD ["/usr/bin/supervisord"]