# MERN To-Do List ("Task Ledger")

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB, served through a REST API, and managed from a React interface
(add, view, complete/incomplete, edit, delete) without page reloads.

## Project structure

```
backend/    Express + Mongoose API
  server.js         server setup, CORS, MongoDB connection
  models/Task.js    Task schema
  routes/tasks.js   GET / POST / PUT / DELETE routes
  .env.example      names of required environment variables
frontend/   React app (Vite)
  src/App.jsx               state + all handlers
  src/api.js                fetch calls to the backend
  src/components/           TaskForm, TaskList, TaskItem
screenshots/
```

## Prerequisites

- Node.js 18 or newer
- A MongoDB database: local MongoDB **or** a free MongoDB Atlas cluster

## How to run

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
```

Open `backend/.env` and fill in:

| Variable        | Meaning                                  | Example                                   |
|-----------------|------------------------------------------|-------------------------------------------|
| `MONGO_URI`     | MongoDB connection string                | `mongodb://127.0.0.1:27017/todo` or your Atlas URI |
| `PORT`          | Port for the API (optional, default 5000)| `5000`                                    |
| `CLIENT_ORIGIN` | Frontend address allowed by CORS         | `http://localhost:3000`                   |

Then start the server:

```bash
npm start
```

You should see `MongoDB connected` and `Server running on http://localhost:5000`.

### 2. Frontend (in a second terminal)

```bash
cd frontend
npm install
npm start
```

Open **http://localhost:3000**.

> The frontend expects the API at `http://localhost:5000`. If yours differs, copy
> `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.

## REST API

| Method | Endpoint          | Description                         | Success | Errors        |
|--------|-------------------|-------------------------------------|---------|---------------|
| GET    | `/api/tasks`      | Fetch all tasks                     | 200     | 500           |
| POST   | `/api/tasks`      | Add a task `{ "title": "..." }`     | 201     | 400 empty title |
| PUT    | `/api/tasks/:id`  | Update `title` and/or `completed`   | 200     | 400, 404      |
| DELETE | `/api/tasks/:id`  | Delete a task                       | 200     | 404           |

Task fields: `title` (String, required), `completed` (Boolean, default `false`),
`createdAt` (Date, default now).

## Validation and security

- Titles are converted with `String()`, trimmed, and rejected with **400** if empty.
- CORS allows only the frontend origin, not every site.
- `.env` and `node_modules` are in `.gitignore`; `.env.example` lists variable names only.

## Screenshots

See the `screenshots/` folder: adding, completing and deleting a task, and the merged pull requests.

## Author

Name: ______   Roll No: ______   (23CSB40B Web Technology, Assignment 2)
