# Todo MCP Server

This is an MCP (Model Context Protocol) server that allows Claude to interact with your todo list application. The server provides resources and tools for listing, creating, updating, and deleting todo items.

## Setup

1. Install dependencies:

   ```bash
   cd mcp-server
   pnpm install
   ```

2. Build the TypeScript code:

   ```bash
   pnpm build
   ```

3. Start the server:
   ```bash
   pnpm start
   ```

The MCP server will run on http://localhost:3002.

## Features

The server implements the following MCP resources and tools:

### Resources

- `todos://` - Returns a list of all todos
- `todo://{id}` - Returns a specific todo by ID

### Tools

- `listTodos` - Lists all todos
- `createTodo` - Creates a new todo (requires title)
- `updateTodo` - Updates a todo (requires ID and either title or completed status)
- `deleteTodo` - Deletes a todo (requires ID)

## Using with Claude

To use this server with Claude Desktop:

1. Ensure both your backend (on port 3001) and the MCP server (on port 3002) are running
2. Add the MCP server URL (http://localhost:3002) to Claude Desktop
3. Ask Claude to perform todo operations like:
   - "Show me my todo list"
   - "Create a new todo to buy groceries"
   - "Mark the todo with ID 123 as completed"
   - "Delete the todo with ID 123"

## Architecture

The MCP server communicates with the backend REST API to manage todos. It uses:

- Express for the web server
- Server-Sent Events (SSE) for MCP transport
- TypeScript for type safety
- Axios for HTTP requests to the backend

## Requirements

- Node.js 16+
- The backend server running on port 3001
