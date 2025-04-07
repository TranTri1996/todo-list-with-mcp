export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category?: string;
  createdAt: string;
  updatedAt?: string;
  startTime?: string;
  endTime?: string;
  assignees?: string[];
  status?: 'open' | 'closed' | 'archived';
} 