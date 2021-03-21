FROM node:15-alpine as build
WORKDIR /usr/src/app
COPY example/package*.json example/app.js ./
RUN npm install

FROM node:15-slim
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app 
RUN apt-get update && apt-get install -y openssh-server apache2 supervisor
RUN mkdir -p /var/run/sshd /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 3000
CMD ["/usr/bin/supervisord"]