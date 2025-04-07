import { useState } from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onEdit: (id: string, updates: Partial<Todo>) => void;
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
  const [originalCompleted, setOriginalCompleted] = useState(false);

  const formatTime = (timeString?: string) => {
    if (!timeString) return "";
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatTimeRange = () => {
    if (!todo.startTime && !todo.endTime) return "";
    const start = formatTime(todo.startTime);
    const end = formatTime(todo.endTime);
    return `${start} - ${end}`;
  };

  const formatCreatedDate = () => {
    if (!todo.createdAt) return "";
    const date = new Date(todo.createdAt);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEdit(todo.id, {
        title: editTitle,
      });
      setIsEditing(false);
    }
  };

  const startEditing = () => {
    setEditTitle(todo.title);
    setOriginalCompleted(todo.completed);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditTitle(todo.title);
    // Restore original completion status if it was changed
    if (todo.completed !== originalCompleted) {
      onToggleComplete(todo.id, originalCompleted);
    }
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <div className="todo-header">
          <div className="todo-title-area">
            <span
              className={`checkbox ${todo.completed ? "checked" : ""}`}
              onClick={() => onToggleComplete(todo.id, !todo.completed)}
            >
              {todo.completed && "✓"}
            </span>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="inline-edit-form">
                <div className="input-container">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="edit-actions">
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="cancel-edit-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="title-container">
                <h3 className={todo.completed ? "title-completed" : ""}>
                  {todo.title}
                </h3>
                <div className="created-at">Created {formatCreatedDate()}</div>
              </div>
            )}
          </div>
        </div>

        {todo.category && !isEditing && (
          <div className="todo-category">{todo.category}</div>
        )}

        {(todo.startTime || todo.endTime) && (
          <div className="todo-time">
            <span>Today</span>
            <span className="time-range">{formatTimeRange()}</span>
          </div>
        )}

        <div className="todo-footer">
          {todo.assignees && todo.assignees.length > 0 && (
            <div className="todo-assignees">
              {todo.assignees.map((assignee, index) => (
                <div key={index} className="avatar-placeholder"></div>
              ))}
              {todo.assignees.length > 3 && (
                <div className="avatar-more">+{todo.assignees.length - 3}</div>
              )}
            </div>
          )}

          {!isEditing && (
            <div className="todo-actions">
              <button onClick={startEditing}>Edit</button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
