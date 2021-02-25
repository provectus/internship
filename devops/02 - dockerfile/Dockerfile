FROM node as base_image
RUN npm install
RUN apt-get update && apt-get install -y openssh-server apache2 supervisor
RUN mkdir -p /var/run/sshd /var/log/supervisor

FROM base_image as build
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
WORKDIR /usr/src/app
COPY example/package*.json example/app.js ./
EXPOSE 3000
CMD ["/usr/bin/supervisord"]