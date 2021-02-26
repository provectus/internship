FROM node as base_image
RUN apt-get update && apt-get install -y openssh-server supervisor
RUN mkdir -p /var/run/sshd /var/log/supervisor

FROM base_image as build
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
WORKDIR /usr/src/app
COPY example/package*.json ./
RUN npm install
COPY example/app.js start.sh ./
ENV HOST="will overwrite on startup"
EXPOSE 3000
ENTRYPOINT ["sh", "start.sh"]