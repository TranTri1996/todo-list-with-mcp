import axios from 'axios';
const API_URL = 'http://localhost:3001';
export class TodoService {
    async getAllTodos() {
        try {
            const response = await axios.get(`${API_URL}/todos`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching todos:', error);
            throw new Error('Failed to fetch todos');
        }
    }
    async createTodo(title) {
        try {
            const response = await axios.post(`${API_URL}/todos`, { title });
            return response.data;
        }
        catch (error) {
            console.error('Error creating todo:', error);
            throw new Error('Failed to create todo');
        }
    }
    async updateTodo(id, updates) {
        try {
            const response = await axios.put(`${API_URL}/todos/${id}`, updates);
            return response.data;
        }
        catch (error) {
            console.error('Error updating todo:', error);
            throw new Error('Failed to update todo');
        }
    }
    async deleteTodo(id) {
        try {
            await axios.delete(`${API_URL}/todos/${id}`);
        }
        catch (error) {
            console.error('Error deleting todo:', error);
            throw new Error('Failed to delete todo');
        }
    }
}
//# sourceMappingURL=todo-service.js.map