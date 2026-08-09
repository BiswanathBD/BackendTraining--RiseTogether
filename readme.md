# Backend Practice Project

ERD Diagram: https://drive.google.com/file/d/1tAdRYHt5_XOriA0omN1ZSpvR1jB9hcBZ/view?usp=sharing

Welcome to this beginner-friendly backend project. This repository is a simple Node.js + Express + TypeScript API that helps you learn the basic flow of backend development step by step.

---

## 🚀 What this project is about

This project teaches you how a backend application works in a simple and clean way:

- Create a server with Express
- Organize code using modules and routes
- Handle requests and responses
- Use middleware for errors and missing routes
- Validate environment variables
- Build a small authentication API

---

## 🛠️ Tech stack

- Node.js
- Express.js
- TypeScript
- pnpm
- Zod
- dotenv

---

## � Project structure

```txt
src/
  app.ts
  server.ts
  config/
  middleware/
  modules/
    auth/
  routers/
  utils/
  validator/
```

---

## ✅ Step-by-step setup

### Step 1: Install the required tools

Make sure you have these installed on your computer:

- Node.js (recommended: v18 or above)
- pnpm

Check the versions:

```bash
node -v
pnpm -v
```

> Note: If these commands do not work, install Node.js and pnpm first.

### Step 2: Install project dependencies

Run this command in the project folder:

```bash
pnpm install
```

> Instruction: This step downloads all packages needed for the app to run.

### Step 3: Create environment variables

Create a file named `.env` in the project root.

```env
PORT=5000
NODE_ENV=development
```

> Note: Keep your `.env` file private and do not upload it to GitHub.

### Step 4: Start the development server

Run:

```bash
pnpm dev
```

If everything is correct, you should see a message like:

```bash
HTTP Server is running on port 5000
```

---

## 🌐 API endpoints

### Health check

- Method: GET
- URL: http://localhost:5000/

### Register user

- Method: POST
- URL: http://localhost:5000/api/v1/auth/register

Example body:

```json
{
  "email": "student@example.com",
  "password": "123456"
}
```

### Login user

- Method: POST
- URL: http://localhost:5000/api/v1/auth/login

Example body:

```json
{
  "email": "biswanath.sarker@gmail.com",
  "password": "123456"
}
```

> Note: The login example uses the demo user stored in the project for learning purposes.

---

## 🧠 How the project works

A request follows this simple flow:

1. The browser or Postman sends a request
2. The app receives it in `src/app.ts`
3. The router sends it to the correct module
4. The controller handles the request
5. The service performs the logic
6. A response is returned to the client

### Simple flow diagram

```txt
Client -> app.ts -> router -> controller -> service -> response
```

---

## 📦 Main folders explained

- `src/app.ts` - creates the Express app and registers middleware
- `src/server.ts` - starts the server
- `src/modules/auth/` - login and register logic
- `src/routers/` - routes are grouped here
- `src/middleware/` - handles errors and missing routes
- `src/utils/` - reusable helpers like API response and custom error class
- `src/validator/` - validates environment variables with Zod
- `src/config/` - loads environment configuration

---

## 📝 Beginner learning notes

Here is the best order to study the project:

1. Read `src/app.ts` first
2. Then read `src/server.ts`
3. Study the route files in `src/modules/`
4. Understand the controller and service files
5. Learn how middleware handles errors

> Instruction: Try to understand one file at a time instead of reading everything at once.

---

## 🎯 Next steps for learning

Once you understand this project, you can improve it by:

- Adding request body validation
- Connecting to a database
- Creating CRUD APIs for products
- Adding authentication with JWT
- Writing tests for your endpoints

---

## 💡 Final note

This project is a good starting point for learning backend development. Keep practicing, build small features, and slowly improve your understanding of how real APIs are structured.
