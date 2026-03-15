const CHECK_ICON = (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const BELL_ICON = (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

const CHECK_CIRCLE_ICON = (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const CART_ICON = (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);

const iconMap = {
  check: CHECK_ICON,
  bell: BELL_ICON,
  'check-circle': CHECK_CIRCLE_ICON,
  cart: CART_ICON,
};

// Material Icons names used in Stitch designs
const MATERIAL_ICONS = new Set([
  'credit_card', 'hourglass_empty', 'shopping_cart',
  'notifications', 'check_circle', 'schedule',
]);

const variantBg = {
  red:    '#d62d20',
  orange: '#f07020',
  yellow: '#f5c518',
  paid:   '#30d158',
  purple: '#9333ea',
  blue:   '#0a84ff',
};

export default function AlertCard({
  tableName,
  variant = 'red',
  title,
  subtitle,
  waitTime,
  icon = 'check',
  actionLabel,
  badgeCount,
  dimmed,
  disabledBtn,
  onClick,
  onActionClick,
}) {
  const iconEl = icon
    ? MATERIAL_ICONS.has(icon)
      ? <span className="material-icons text-white/85" style={{ fontSize: '20px' }}>{icon}</span>
      : (iconMap[icon] ?? CHECK_ICON)
    : null;

  return (
    <div
      className={`relative rounded-[16px] overflow-visible cursor-pointer active:opacity-90 w-full flex flex-col ${dimmed ? 'opacity-75' : ''}`}
      style={{ background: variantBg[variant] ?? '#3a3a3c', padding: '0 0.5rem 0.5rem 0.5rem', borderRadius: '16px', height: 'auto' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Badge */}
      {badgeCount != null && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold border-2 border-[#1c1c1e] z-10">
          {badgeCount}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '0.5rem' }}>
        {/* Table name + wait time in top-right corner (esquina superior) */}
        <div className="flex items-start justify-between" style={{ padding: '0.5rem 0.5rem 0.25rem' }}>
          <div className="text-white text-[24px] font-bold tracking-wide leading-tight">
            {tableName}
          </div>
          {waitTime && (
            <div className="text-white/80 font-semibold flex items-center gap-0.5 mt-1">
              <span className="material-icons" style={{ fontSize: '14px' }}>schedule</span>
              <span style={{ fontSize: '12px', letterSpacing: '0.05em' }}>{waitTime}</span>
            </div>
          )}
        </div>
        <div className={`flex items-center gap-1.5 ${iconEl ? '' : ''}`} style={{ padding: '0 0.5rem' }}>
          {iconEl}
          <span className="text-white/90 text-[16px] font-medium leading-snug tracking-wide">
            {title}
          </span>
        </div>
        {subtitle && (
          <div className="text-[14px] font-bold mt-1 leading-snug" style={{ padding: '0 0.5rem', color: '#fde047' }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Action button — pushed to bottom */}
      <div className="mt-auto flex justify-center pb-3">
        <div
          className={`py-3 text-center font-bold tracking-wide ${variant === 'purple' && !disabledBtn ? 'rounded-full active:scale-95 transition-transform' : 'rounded-[12px]'}`}
          style={{
            padding: '0.5rem',
            width: '-webkit-fill-available',
            ...(disabledBtn
              ? { backgroundColor: 'rgba(200,200,200,0.22)', color: '#9ca3af', fontSize: '13px', cursor: 'not-allowed', letterSpacing: '0.2px' }
              : { backgroundColor: 'white', color: '#1a1a1a', fontSize: '17px', cursor: 'pointer' }
            ),
          }}
          onClick={(e) => { if (!disabledBtn) { e.stopPropagation(); onActionClick?.(); } }}
        >
          {actionLabel}
        </div>
      </div>
    </div>
  );
}
