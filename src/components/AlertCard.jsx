const CHECK_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const BELL_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const BELL_PLUS_CHECK = (
  <div className="alert-icon-combo">
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
    <span className="plus-sign">+</span>
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  </div>
);

export default function AlertCard({
  tableName,
  variant = 'red',
  badgeCount,
  title,
  subtitle,
  actionLabel,
  actionVariant = 'blue',
  icon = 'check',
  onClick,
}) {
  const iconMap = {
    check: CHECK_ICON,
    bell: BELL_ICON,
    'bell-check': BELL_PLUS_CHECK,
    info: (
      <div className="info-icon">i</div>
    ),
  };

  const iconEl = iconMap[icon] ?? CHECK_ICON;

  return (
    <div className="alert-card" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick?.()}>
      <div className={`table-header ${variant}`} style={{ position: 'relative', overflow: 'visible' }}>
        <span className="table-name">{tableName}</span>
        {badgeCount != null && (
          <div className="badge" style={{ border: '2px solid #1c1c1e' }}>
            {badgeCount}
          </div>
        )}
      </div>
      <div className="alert-body">
        <div className="alert-icon">{iconEl}</div>
        <div className="alert-text-group">
          <div className="alert-title">{title}</div>
          <div className="alert-subtitle">{subtitle}</div>
        </div>
      </div>
      <div className={`action-btn btn-${actionVariant}`}>
        {actionVariant === 'blue' && <span className="arrow">←</span>}
        {actionLabel}
      </div>
    </div>
  );
}
