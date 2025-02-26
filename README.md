# Task Management API

A RESTful API built with Node.js, Express, and MongoDB for managing tasks with user authentication.

## Features

- User Authentication (Signup, Login, Password Reset)
- JWT-based Authorization
- Task Management (CRUD operations)
- Input Validation
- Error Handling
- CORS Support
- Environment Configuration

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JSON Web Tokens (JWT)** for authentication
- **Bcrypt** for password hashing
- **Joi** for validation
- **CORS** for cross-origin resource sharing
- **Morgan** for HTTP request logging
- **Dotenv** for environment variables

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** instance
- **Git**

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=production
PORT=2000
JWT_SECRET=myjwtsecrect
JWT_EXPIRY=1d
CORS_ORIGINS=http://localhost:3000
GLOBAL_API_PREFIX=/api/v1
MONGO_URI=MongoDB URI
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/techspecialist1/cave-digital-back.git
   cd cave-digital-back
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- **POST** `/api/v1/auth/signup` - Register a new user
- **POST** `/api/v1/auth/login` - Login user
- **POST** `/api/v1/auth/reset` - Request password reset
- **POST** `/api/v1/auth/verify-reset` - Verify reset token and set new password

### Tasks (Requires Authentication - Bearer Token)

- **POST** `/api/v1/tasks` - Create a new task
- **GET** `/api/v1/tasks` - Get all tasks for authenticated user
- **GET** `/api/v1/tasks/:id` - Get a single task by ID
- **PUT** `/api/v1/tasks/:id` - Update task
- **DELETE** `/api/v1/tasks/:id` - Delete task

## Project Structure

```
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── middlewares/
│   │   └── auth.guard.js
│   ├── models/
│   │   ├── task.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   └── api.router.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── task.service.js
│   ├── utils/
│   │   ├── apiResponseHandler.js
│   │   ├── asyncErrorHandler.js
│   │   ├── customErrorHandler.js
│   │   ├── dataValidationHelper.js
│   │   └── globalErrorHandler.js
│   ├── validation/
│   │   ├── auth.validation.js
│   │   └── task.validation.js
├── index.js
├── package.json
├── .env
```

## Error Handling

The API implements a global error handling mechanism that:

- Handles operational errors with proper status codes
- Provides detailed error messages in development
- Sanitizes error output in production
- Handles validation errors with detailed feedback
- Manages duplicate key errors from MongoDB

## Testing

A **Postman collection** is included (`backend.postman_collection.json`) with pre-configured requests for testing all API endpoints.

## Security Features

- Password hashing using **bcrypt**
- JWT-based authentication
- Secure password reset functionality
- Request validation using **Joi**
- CORS protection
- Environment-based error responses

## Development

For development mode with auto-reload:

```bash
npm run dev
```

## Production

For production deployment:

```bash
npm start
```
