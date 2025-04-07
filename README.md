# Todo List Application

A simple full-stack Todo List application with a React frontend and Express backend.

## Project Structure

- `/frontend` - React + Vite frontend with TypeScript
- `/backend` - Express.js backend with TypeScript

## Features

- Display a list of todo items
- Add new todo items
- Edit existing todo items
- Mark todo items as completed
- Delete todo items
- View creation and update timestamps

## Setup Instructions

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

The backend will run on http://localhost:3001.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

The frontend will run on http://localhost:5173 by default.

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Todo Data Structure

```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}
```

## Notes

- The backend uses a local `db.json` file to store todos (no database required)
- The frontend uses React hooks (useState, useEffect) for state management
- Basic styling is included in App.css
