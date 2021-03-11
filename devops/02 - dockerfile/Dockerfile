FROM node:15.11.0-buster-slim AS base
WORKDIR /usr/src/app
COPY example/package*.json ./
RUN npm install

FROM node:15.11.0-buster-slim
RUN useradd -u 1234 -m nodeuser
USER nodeuser
WORKDIR /home/nodeuser
COPY example/app.js start.sh ./
COPY --from=base /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["./start.sh"]
