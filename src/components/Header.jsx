export default function Header() {
  return (
    <div className="header">
      <div className="logo-area">
        <div className="logo-icon">🍽️</div>
        <span className="logo-text">HeyMozo</span>
      </div>
      <div className="header-right">
        <button type="button" className="sector-btn">
          Select Sector
          <span className="sector-chevron">▾</span>
        </button>
        <span className="filter-icon">⊞</span>
      </div>
    </div>
  );
}
