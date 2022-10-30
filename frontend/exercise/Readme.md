# Provectus Internship Program test assignment

## 1. Introduction:
This project was made by Jaffar Totanji which contains the client-side (ReactJS) for the Backend provided in the assignment.

## 2. Prerequisites:
- node v17.2.0 or higher.
- docker v20.10.12 or higher.
- docker-compose v1.25.0 or higher.

## 3. Installation and Running:
Clone this repo to your local machine:

          cd ./internship/frontend/exercise

Seed the database with the generated data:

          docker-compose up mongo-seed

Start the app along with the api server and the database using:

          docker-compose up

You can now use the app on:

        http://localhost:3000/

## 4. Running without the use of Docker:
Clone this repo to your local machine:

          cd ./internship/frontend/exercise

Seed the database with the generated data:

          docker-compose up mongo-seed

Start the api server along with the database using:

          docker-compose up api

Naviagate to the directory of the client-side app:

        cd ./frontend

Install dependencies and run the app using:

        yarn install
        yarn start

You can now use the app on:

        http://localhost:3000/
