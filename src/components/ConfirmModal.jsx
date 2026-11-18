export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="overlay">
      <div className="modal confirm-modal">
        <h2 className="modal-title">Konfirmasi</h2>
        <p className="confirm-text">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
