const SERVICETTE_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24">
    <path d="M11 3L9.5 9H11V21H9V9H7L5.5 3H11ZM18.5 3C17 3 15.75 4.25 15.75 5.75V11H17.5V21H19.5V11H21.25V5.75C21.25 4.25 20 3 18.5 3Z" />
  </svg>
);

export default function AlertModal({ tableName, items = [], summary, onClose, onVerComanda }) {
  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-table-header">
          <div className="modal-table-name">{tableName}</div>
        </div>

        <div className="modal-items">
          {items.map((item, i) => (
            <div key={i} className="modal-item">
              {item.emoji ? (
                <div className="modal-item-emoji">{item.emoji}</div>
              ) : (
                <div className="modal-item-icon">{item.icon ?? SERVICETTE_ICON}</div>
              )}
              <div className="modal-item-label">{item.label}</div>
            </div>
          ))}
        </div>

        {summary && <div className="modal-summary">{summary}</div>}

        {onVerComanda && (
          <button type="button" className="modal-link" onClick={onVerComanda}>
            <div className="plus-circle">+</div>
            <span>Ver comanda completa [3]</span>
          </button>
        )}

        <button type="button" className="modal-action-btn" onClick={onClose}>
          ¡VISTO!
        </button>
      </div>
    </div>
  );
}
