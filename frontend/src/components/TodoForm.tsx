import { useState } from "react";

interface TodoFormProps {
  onAdd: (
    title: string,
    category?: string,
    startTime?: string,
    endTime?: string
  ) => void;
  onCancel: () => void;
}

const TodoForm = ({ onAdd, onCancel }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, category, startTime, endTime);
      setTitle("");
      setCategory("");
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>New Task</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <div className="time-input-container">
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <span className="time-icon">⏱️</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <div className="time-input-container">
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <span className="time-icon">⏱️</span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
