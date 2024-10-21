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
- Express.js (Optional, if used)
- TypeScript (Optional, if used)
- Nodemon (for auto-reloading in development)
- ESLint and Prettier (for code formatting)
- Vitest or Jest (for testing, if used)

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 22.9.xx or higher) - [Download Node.js](https://nodejs.org/)
- npm or yarn (npm comes bundled with Node.js)

### Installation

1. Clone the repository:

   `git clone https://github.com/your-username/your-repository-name.git`

2. Navigate to the project directory:

   `cd your-repository-name`

3. Install dependencies:

If you're using npm:

`npm install`

Or with yarn:

`yarn install`

### Running the Application

1. Start the server in development mode:

If you want to run the application with auto-reload (using nodemon):

`npm run dev`

Or:

`yarn dev`

This will start the application and watch for file changes.

2. Start the server in production mode:

If you're running the server in a production environment:

`npm start`

Or:

`yarn start`

This command will build and run the application.

## API Endpoints

### Base URL

`http://localhost:<PORT>/api/users`

Value of port on which application is running is stored in .env file

### Routes

The following API routes are available:

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/users`     | Retrieve all users  |
| GET    | `/api/users/:id` | Retrieve user by ID |
| POST   | `/api/users`     | Create a new user   |
| PUT    | `/api/users/:id` | Update a user by ID |
| DELETE | `/api/users/:id` | Delete a user by ID |
