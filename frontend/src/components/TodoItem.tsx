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
  const [editCategory, setEditCategory] = useState(todo.category || "");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEdit(todo.id, {
        title: editTitle,
        category: editCategory || undefined,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            placeholder="Category"
          />
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-content">
            <div className="todo-header">
              <div className="todo-title-area">
                <span
                  className={`checkbox ${todo.completed ? "checked" : ""}`}
                  onClick={() => onToggleComplete(todo.id, !todo.completed)}
                >
                  {todo.completed && "✓"}
                </span>
                <h3 className={todo.completed ? "title-completed" : ""}>
                  {todo.title}
                </h3>
              </div>
            </div>

            {todo.category && (
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
                    <div className="avatar-more">
                      +{todo.assignees.length - 3}
                    </div>
                  )}
                </div>
              )}

              <div className="todo-actions">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
