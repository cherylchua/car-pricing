# Pricing App

## Description

A pricing application that features:

-   Getting the price of a vehicle using the number plate from cache
-   Getting the price of a vehicle using the number plate from a 3rd party provider

### Tech Stack

-   NodeJS + Typescript
-   Express
-   Jest
-   Redis

## Setup and running the app

### Setup and run locally

Prerequisites: Node v12, Redis 

1. Create your own `.env` file in the root project folder containing the same environment variables as `.env.example` and populate it with your values
2. Run `npm install` to download dependencies
3. Run `npm run build` to transpile
4. Run a redis instance in your local
5. Run `npm run start` to start the server

#### npm scripts

| Command         | Description                                | Prerequisites                                   |
| --------------- | ------------------------------------------ | ----------------------------------------------- |
|                 |                                            |                                                 |
| `npm run test`  | Runs all unit tests with a coverage report | -                                               |
| `npm run build` | Transpile TS to JS                         | -                                               |
| `npm run start` | Starts application                         | .env file is in project root, port 3000 is free |
