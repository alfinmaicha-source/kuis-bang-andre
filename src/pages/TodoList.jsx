import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoFormModal from "../components/TodoFormModal";
import ConfirmModal from "../components/ConfirmModal";

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export default function TodoList({ todos, onAdd, onDelete }) {
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const handleAdd = (data) => {
    onAdd(data);
    setShowAdd(false);
  };

  const confirmTarget = todos.find((t) => t.id === confirmId);

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Todo List</h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          Tambah Todo
        </button>
      </div>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Status</th>
            <th>Prioritas</th>
            <th>Deadline</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.status}</td>
              <td>{todo.priority}</td>
              <td>{todo.deadline}</td>
              <td>
                <div className="action-cell">
                  <button
                    className="icon-btn icon-btn-blue"
                    title="Lihat detail"
                    onClick={() => navigate(`/todo/${todo.id}`)}
                  >
                    <EyeIcon />
                  </button>
                  <button
                    className="icon-btn icon-btn-red"
                    title="Hapus"
                    onClick={() => setConfirmId(todo.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && (
        <TodoFormModal
          title="Tambah Todo"
          submitLabel="Tambah"
          onSubmit={handleAdd}
          onCancel={() => setShowAdd(false)}
        />
      )}

      {confirmTarget && (
        <ConfirmModal
          message={`Apakah Anda yakin ingin menghapus tugas "${confirmTarget.title}"?`}
          onConfirm={() => {
            onDelete(confirmTarget.id);
            setConfirmId(null);
          }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}
