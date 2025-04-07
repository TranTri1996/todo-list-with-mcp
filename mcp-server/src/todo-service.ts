import axios from 'axios';
import { Todo } from './types.js';

const API_URL = 'http://localhost:3001';

export class TodoService {
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await axios.get<Todo[]>(`${API_URL}/todos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw new Error('Failed to fetch todos');
    }
  }

  async createTodo(title: string): Promise<Todo> {
    try {
      const response = await axios.post<Todo>(`${API_URL}/todos`, { title });
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new Error('Failed to create todo');
    }
  }

  async updateTodo(id: string, updates: { title?: string; completed?: boolean }): Promise<Todo> {
    try {
      const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw new Error('Failed to update todo');
    }
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw new Error('Failed to delete todo');
    }
  }
} 