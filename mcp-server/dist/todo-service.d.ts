import { Todo } from './types.js';
export declare class TodoService {
    getAllTodos(): Promise<Todo[]>;
    createTodo(title: string): Promise<Todo>;
    updateTodo(id: string, updates: {
        title?: string;
        completed?: boolean;
    }): Promise<Todo>;
    deleteTodo(id: string): Promise<void>;
}
