# Todo List Application

A simple full-stack Todo List application with a React frontend and Express backend.

## Project Structure

- `/frontend` - React + Vite frontend with TypeScript
- `/backend` - Express.js backend with TypeScript
- `/mcp-server` - Model Context Protocol server for AI integration

## Features

- Display a list of todo items
- Add new todo items
- Edit existing todo items
- Mark todo items as completed
- Delete todo items
- View creation and update timestamps

## Setup Instructions

### Option 1: Start All Modules Together

This project uses concurrently to start all services with a single command:

1. Install dependencies for all modules:

   ```bash
   pnpm install
   ```

2. Start all services (frontend, backend, and mcp-server):
   ```bash
   pnpm start
   ```

### Option 2: Start Modules Individually

#### Backend

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

#### Frontend

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

#### MCP Server

1. Navigate to the mcp-server directory:

   ```bash
   cd mcp-server
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the TypeScript code:

   ```bash
   pnpm build
   ```

4. Start the server:
   ```bash
   pnpm start
   ```

The MCP server will run on http://localhost:3002.

## Using the MCP Server with Claude

The MCP (Model Context Protocol) server allows AI assistants like Claude to interact with your todo list application.

### Method 1: Manual Configuration

1. Ensure both your backend (port 3001) and the MCP server (port 3002) are running
2. Add the MCP server URL (http://localhost:3002) to Claude Desktop
3. Ask Claude to perform todo operations

### Method 2: Automatic Integration with Claude Desktop

For automatic integration with Claude Desktop:

1. First, build the MCP server:

   ```bash
   cd mcp-server
   pnpm build
   ```

2. Add the following configuration to your Claude Desktop configuration file (`claude_desktop_config.json`):

   ```json
   {
     "mcpServers": {
       "todos": {
         "command": "node",
         "args": ["absolute/path/to/mcp-server/dist/index.js"]
       }
     }
   }
   ```

   Note: Update the path in the `args` array to match your project's location on your system.

3. Start Claude Desktop and it will automatically launch the MCP server

Once configured, you can ask Claude to perform todo operations like:

- "Show me my todo list"
- "Create a new todo to buy groceries"
- "Mark the todo about buying milk as completed"
- "Delete the todo about meeting John"

The MCP server provides the following features:

- List all todos
- Create new todos
- Update existing todos
- Delete todos

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
