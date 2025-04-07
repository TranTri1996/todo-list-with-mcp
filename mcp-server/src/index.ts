import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { TodoService } from './todo-service.js';

const todoService = new TodoService();

// Create MCP server
const server = new McpServer({
  name: 'Todo MCP Server',
  version: '1.0.0',
});

// Resource to list all todos
server.resource(
  'todos',
  'todos://',
  async () => {
    const todos = await todoService.getAllTodos();
    return {
      contents: [{
        uri: 'todos://',
        text: JSON.stringify(todos, null, 2),
      }],
    };
  }
);

// Resource to get a specific todo by ID
server.resource(
  'todo',
  new ResourceTemplate('todo://{id}', { list: undefined }),
  async (uri, variables) => {
    const id = variables.id as string;
    const todos = await todoService.getAllTodos();
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    
    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify(todo, null, 2),
      }],
    };
  }
);

// Tool to create a new todo
server.tool(
  'create_todo',
  { title: z.string().min(1, "Title cannot be empty") },
  async ({ title }: { title: string }) => {
    try {
      const newTodo = await todoService.createTodo(title);
      return {
        content: [{ 
          type: 'text', 
          text: `Successfully created todo: ${JSON.stringify(newTodo, null, 2)}` 
        }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error creating todo: ${(error as Error).message}` }],
        isError: true,
      };
    }
  }
);

// Tool to update a todo
server.tool(
  'update_todo',
  { 
    id: z.string().min(1, "ID cannot be empty"),
    title: z.string().optional(),
    completed: z.boolean().optional(),
  },
  async ({ id, title, completed }: { id: string; title?: string; completed?: boolean }) => {
    try {
      if (title === undefined && completed === undefined) {
        return {
          content: [{ type: 'text', text: 'Error: Must provide either title or completed status to update' }],
          isError: true,
        };
      }
      
      const updates: { title?: string; completed?: boolean } = {};
      if (title !== undefined) updates.title = title;
      if (completed !== undefined) updates.completed = completed;
      
      const updatedTodo = await todoService.updateTodo(id, updates);
      
      return {
        content: [{ 
          type: 'text', 
          text: `Successfully updated todo: ${JSON.stringify(updatedTodo, null, 2)}` 
        }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error updating todo: ${(error as Error).message}` }],
        isError: true,
      };
    }
  }
);

// Tool to delete a todo
server.tool(
  'delete_todo',
  { id: z.string().min(1, "ID cannot be empty") },
  async ({ id }: { id: string }) => {
    try {
      await todoService.deleteTodo(id);
      return {
        content: [{ type: 'text', text: `Successfully deleted todo with ID: ${id}` }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error deleting todo: ${(error as Error).message}` }],
        isError: true,
      };
    }
  }
);

// Tool to list all todos
server.tool(
  'list_todos',
  {},
  async () => {
    try {
      const todos = await todoService.getAllTodos();
      return {
        content: [{ 
          type: 'text', 
          text: `Todos:\n${JSON.stringify(todos, null, 2)}` 
        }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching todos: ${(error as Error).message}` }],
        isError: true,
      };
    }
  }
);


async function main() {
  // Setup stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log('MCP Server running with stdio transport'); 
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });