export default function BottomNav({ activeTab = 'alerts', onTabChange }) {
  return (
    <div className="bottom-nav" style={{ position: 'relative' }}>
      <button
        type="button"
        className={`nav-tab ${activeTab === 'alerts' ? 'active' : ''}`}
        onClick={() => onTabChange?.('alerts')}
      >
        ALERTAS
      </button>
      <button
        type="button"
        className={`nav-tab ${activeTab === 'mesas' ? 'active' : ''}`}
        onClick={() => onTabChange?.('mesas')}
      >
        MIS MESAS
      </button>
      <span className="star-icon">✦</span>
    </div>
  );
}
