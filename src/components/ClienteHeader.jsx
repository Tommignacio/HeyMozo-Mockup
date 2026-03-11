import { Link } from 'react-router-dom';

export default function ClienteHeader({ showBack = false }) {
  return (
    <header className="cliente-header">
      <div className="cliente-logo-area">
        {showBack && (
          <Link to="/cliente" className="cliente-back-btn" aria-label="Volver">
            ←
          </Link>
        )}
        <div className="cliente-logo-icon">🍽</div>
        <span className="cliente-logo-text">HeyMozo</span>
      </div>
    </header>
  );
}
