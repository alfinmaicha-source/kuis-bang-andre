import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/todos";
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (todo) => {
    const newId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos((prev) => [...prev, { id: newId, ...todo }]);
  };

  const updateTodo = (id, data) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} />
        }
      />
      <Route
        path="/todo/:id"
        element={<TodoDetail todos={todos} onUpdate={updateTodo} />}
      />
    </Routes>
  );
}
