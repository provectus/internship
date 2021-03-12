FROM alpine:3.13.2 as prod
ENV HOST "'see readme'"
CMD ["node", "app.js"]
WORKDIR /usr/src/app
RUN apk add --update --no-cache npm
COPY example/ /usr/src/app
RUN npm install --only=production

FROM prod as test
CMD ["supervisord"]
COPY supervisord /usr/bin/
COPY supervisord.conf supervisord.conf
RUN apk add --update --no-cache openssh
