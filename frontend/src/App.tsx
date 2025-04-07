import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types";
import "./App.css";

const API_URL = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "open" | "closed">(
    "all"
  );
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/todos`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
      setError("");
    } catch (err) {
      setError("Failed to load todos. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          status: "open",
          assignees: [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
      setShowAddForm(false);
    } catch (err) {
      setError("Failed to add todo. Please try again.");
      console.error(err);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error(err);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    const status = completed ? "closed" : "open";
    updateTodo(id, { completed, status });
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error(err);
    }
  };

  const filterTodos = () => {
    if (activeFilter === "all") return todos;
    if (activeFilter === "open") return todos.filter((todo) => !todo.completed);
    if (activeFilter === "closed")
      return todos.filter((todo) => todo.completed);
    return todos;
  };

  const getFilterCounts = () => {
    const counts = {
      all: todos.length,
      open: todos.filter((todo) => !todo.completed).length,
      closed: todos.filter((todo) => todo.completed).length,
    };
    return counts;
  };

  const formatDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return now.toLocaleDateString("en-US", options);
  };

  const counts = getFilterCounts();

  return (
    <div className="app">
      <div className="app-header">
        <div className="header-content">
          <h1>Today's Task</h1>
          <p className="date">{formatDate()}</p>
        </div>
        <button className="new-task-btn" onClick={() => setShowAddForm(true)}>
          + New Task
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <TodoForm onAdd={addTodo} onCancel={() => setShowAddForm(false)} />
          </div>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All <span className="badge">{counts.all}</span>
        </button>
        <button
          className={`filter-tab ${activeFilter === "open" ? "active" : ""}`}
          onClick={() => setActiveFilter("open")}
        >
          Open <span className="badge">{counts.open}</span>
        </button>
        <button
          className={`filter-tab ${activeFilter === "closed" ? "active" : ""}`}
          onClick={() => setActiveFilter("closed")}
        >
          Closed <span className="badge">{counts.closed}</span>
        </button>
      </div>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <TodoList
          todos={filterTodos()}
          onEdit={updateTodo}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
        />
      )}
    </div>
  );
}

export default App;
