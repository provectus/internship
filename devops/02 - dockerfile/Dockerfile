FROM node
WORKDIR /usr/src/app
COPY example/package*.json example/app.js ./
RUN npm install \
	&& apt-get update && apt-get install -y openssh-server apache2 supervisor \
	&& mkdir -p /var/run/sshd /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ARG var_name
ENV HOST=$var_name
EXPOSE 3000
CMD ["/usr/bin/supervisord"]
