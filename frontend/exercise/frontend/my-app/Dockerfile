FROM node:14 as builder
WORKDIR /app
COPY package*.json ./
#use package-lock to install dependencies
RUN npm ci
COPY . .
RUN npm run build
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]