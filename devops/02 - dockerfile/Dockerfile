FROM alpine:latest as stage1
ENV HOST "some pre-defined ip here"
CMD ["node", "app.js"]
WORKDIR /usr/src/app
COPY example/package*.json example/app.js ./
RUN apk add --update --no-cache npm openssh-server supervisor
RUN  mkdir -p /var/run/sshd /var/log/supervisor


FROM stage1 as test

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 3000
CMD ["/usr/bin/supervisord"]cd ..
