import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoFormModal({
  title,
  submitLabel,
  initialData,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(initialData || emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert("Judul tugas tidak boleh kosong");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>

        <label className="field-label">Judul</label>
        <input
          className="input"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <label className="field-label">Deskripsi</label>
        <textarea
          className="input textarea"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <div className="row-2">
          <div>
            <label className="field-label">Status</label>
            <select
              className="input"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="to-do">to-do</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
            </select>
          </div>
          <div>
            <label className="field-label">Prioritas</label>
            <select
              className="input"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>

        <label className="field-label">Deadline</label>
        <input
          className="input"
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
        />

        <div className="modal-actions">
          <button className="btn btn-danger" onClick={onCancel}>
            Batal
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
