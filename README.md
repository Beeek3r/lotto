# The Lottery Group - Coding Challenge 

## Overview
This project is a web application designed for theLott.com coding test. The application allows users to autofill the previous week's Powerball draw numbers into a ticket layout and clear the numbers from the ticket.

## Prerequisite
To run the application you would require the following (should be fine with the LTS for all these below):
- `npm`
- `node`
- `docker-compose` [Optional if you would like to run this in a container]

## Getting started
You can run this via your local machine
1. Run `cp .env.example .env`
2. Run `npm run dev`

Alternatively, you can run this via `docker-compose`
1. Run `cp .env.example .env`
2. Run `cp docker-compose.example.yml docker-compose.yml`
3. Run `npm run dev`

## Live demo
You can see a light demo here https://beeek3r.github.io/lotto/

## Screenshots
![End State Image](public/pre-state.png)
![End State Image](public/post-state.png)

## Extra
Created the main component in a generic manner for different draws. If you update the call in `Home.tsx` you can view addtional draws.
![End State Image](public/extra-1.png)
![End State Image](public/extra-2.png)
![End State Image](public/extra-3.png)
