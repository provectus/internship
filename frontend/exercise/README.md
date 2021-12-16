# Completed Test Assignment

## Setup & Launch

#### Fork & clone the repo
```
cd ./internship/frontend/exercise
```
#### Checkout git branch with completed test assignment
```
git checkout frontend_internship
```
#### Seed the database with the generated data
```
docker-compose --profile seed up mongo-seed
```
#### cd into client folder, run npm install and cd back to exercise folder
```
cd client && npm install && cd ..
```
#### Start application 
```
docker-compose up
```
#### Check the front-end app
```
http://localhost:3000/
```
---
### Notes
Why npm install is nedeed and why is there no ```- /usr/src/app/node_modules``` for client service in docker-compose.yml?

Explanation here - https://stackoverflow.com/questions/67087735/eacces-permission-denied-mkdir-usr-app-node-modules-cache-how-can-i-creat

**Summary**: `Apparently, this is occurring because I'm using Ubuntu and docker mounts volumes as root on Linux systems`.
