# SWE4213 - Lab 1 

Name: Madison Brown

Student Number: 3697762

AI Statement: I used ChatGPT to help resolve small bugs that were caused by any updates I made to the code i.e. figuring out the error that I used the wrong date format in the backend when submitting created_at to the database. When using AI for non-bug related questions, an AI Use Statement can be found at the top of the file, as dictated by the syllabus.

This README shows you how to get the project up and running. 

Hint: It is possible that something is missing in this documentation which will throw an error when you try to follow these instructions.

**Note:** Don't forget to include your name, student number, and use of AI statement in your README.md.

## Setup DB 
Shown here are the commands you need to start up your database. 

- **Create Database:** `psql -d postgres -c "CREATE DATABASE unb_marketplace;"`

- **Create Tables:** `psql -d unb_marketplace -f backend/db.sql` 

- **Connect DB to API:** Update `connection_string` in `seed.js` and `index.js`. 

- **Seed DB:** `cd api; node seed.js`

Note: If running on windows you will have to pass in a user name and password. 

- **Delete Database:** `psql -d postgres -c "DROP DATABASE unb_marketplace;"`

## Starting Server 
Open a terminal in vscdoe.

- **Install Dependencies:** `cd api; npm install`
- **Run Server:** `npm run dev` 

## Starting Front End 
Open another terminal in vscode. 

- **Install Dependencies:** `cd front-end; npm install`
- **Run Server:** `npm run dev` 
