import { useState } from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TodoItem = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
        />

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <span className={todo.completed ? "completed" : ""}>
              {todo.title}
            </span>
            <div className="todo-meta">
              <small>Created: {formatDate(todo.createdAt)}</small>
              {todo.updatedAt && (
                <small>Updated: {formatDate(todo.updatedAt)}</small>
              )}
            </div>
            <div className="todo-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
