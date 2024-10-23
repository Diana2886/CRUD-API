# CRUD API Application

This is a Node.js application for managing users with basic CRUD (Create, Read, Update, Delete) operations. The API allows you to create users, retrieve a list of users, update user information, and delete users.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Features

- Create a new user
- Retrieve all users
- Retrieve a single user by ID
- Update user information
- Delete a user

## Technologies

- Node.js
- TypeScript
- Nodemon
- ESLint and Prettier
- Jest
- Webpack

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 22.9.xx or higher) - [Download Node.js](https://nodejs.org/)
- npm or yarn (npm comes bundled with Node.js)

### Installation

1. Clone the repository:

   `git clone https://github.com/Diana2886/CRUD-API.git`

2. Checkout the branch to dev:

   `git checkout dev`

3. Navigate to the project directory:

   `cd crud-api`

4. Install dependencies:

If you're using npm:

`npm install`

Or with yarn:

`yarn install`

### Running the Application

1. Start the server in development mode:

If you want to run the application with auto-reload (using nodemon):

`npm run start:dev`

Or:

`yarn start:dev`

This will start the application and watch for file changes.

2. Start the server in production mode:

If you're running the server in a production environment:

`npm run start:prod`

Or:

`yarn start:prod`

This command will build and run the application.

3. Start multiple instances of the application using the Node.js Cluster API:

`npm run start:multi`

Or:

`yarn start:multi`

4. Start tests:

`npm run test`

Or:

`yarn test`

## API Endpoints

### Base URL

`http://localhost:<PORT>/api/users`

The value of port on which application is running is stored in .env file

### Routes

The following API routes are available:

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/users`     | Retrieve all users  |
| GET    | `/api/users/:id` | Retrieve user by ID |
| POST   | `/api/users`     | Create a new user   |
| PUT    | `/api/users/:id` | Update a user by ID |
| DELETE | `/api/users/:id` | Delete a user by ID |
