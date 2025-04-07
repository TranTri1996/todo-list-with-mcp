import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { Todo } from './types';

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, '../db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize db.json if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ todos: [] }));
}

// Get all todos
app.get('/todos', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    res.json(data.todos);
  } catch (error) {
    console.error('Error reading todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add a new todo
app.post('/todos', (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    data.todos.push(newTodo);
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const todoIndex = data.todos.findIndex((todo: Todo) => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    const updatedTodo = {
      ...data.todos[todoIndex],
      title: title !== undefined ? title : data.todos[todoIndex].title,
      completed: completed !== undefined ? completed : data.todos[todoIndex].completed,
      updatedAt: new Date().toISOString()
    };
    
    data.todos[todoIndex] = updatedTodo;
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const todoIndex = data.todos.findIndex((todo: Todo) => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    data.todos.splice(todoIndex, 1);
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 