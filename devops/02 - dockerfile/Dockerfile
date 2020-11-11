FROM node
WORKDIR /usr/src/app
COPY example/package*.json example/app.js ./
RUN npm install
RUN apt-get update && apt-get install -y openssh-server apache2 supervisor
RUN mkdir -p /var/run/sshd /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 3000
CMD ["/usr/bin/supervisord"]