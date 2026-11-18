import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoFormModal from "../components/TodoFormModal";

export default function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showUpdate, setShowUpdate] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="container">
        <p>Tugas tidak ditemukan.</p>
        <button className="btn btn-danger" onClick={() => navigate("/")}>
          Kembali
        </button>
      </div>
    );
  }

  const handleUpdate = (data) => {
    onUpdate(todo.id, data);
    setShowUpdate(false);
  };

  return (
    <div className="container">
      <div className="detail-card">
        <div className="detail-grid">
          <div className="detail-col">
            <div className="detail-group">
              <span className="field-label">Judul</span>
              <p className="detail-value">{todo.title}</p>
            </div>
            <div className="detail-group">
              <span className="field-label">Deskripsi</span>
              <p className="detail-value">{todo.description}</p>
            </div>
          </div>
          <div className="detail-col">
            <div className="detail-group">
              <span className="field-label">Status</span>
              <p className="detail-value">{todo.status}</p>
            </div>
            <div className="detail-group">
              <span className="field-label">Prioritas</span>
              <p className="detail-value">{todo.priority}</p>
            </div>
            <div className="detail-group">
              <span className="field-label">Deadline</span>
              <p className="detail-value">{todo.deadline}</p>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="btn btn-danger" onClick={() => navigate("/")}>
            Kembali
          </button>
          <button className="btn btn-primary" onClick={() => setShowUpdate(true)}>
            Update
          </button>
        </div>
      </div>

      {showUpdate && (
        <TodoFormModal
          title="Update Todo"
          submitLabel="Update"
          initialData={todo}
          onSubmit={handleUpdate}
          onCancel={() => setShowUpdate(false)}
        />
      )}
    </div>
  );
}
