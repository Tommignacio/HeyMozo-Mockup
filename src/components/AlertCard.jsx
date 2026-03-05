const CHECK_ICON = (
  <svg width="36" height="36" viewBox="0 0 24 24" className="fill-white opacity-85">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const BELL_ICON = (
  <svg width="36" height="36" viewBox="0 0 24 24" className="fill-white opacity-85">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const BELL_PLUS_CHECK = (
  <div className="flex items-center gap-1">
    <svg width="28" height="28" viewBox="0 0 24 24" className="fill-white opacity-85">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
    <span className="text-white text-lg font-light opacity-70">+</span>
    <svg width="28" height="28" viewBox="0 0 24 24" className="fill-white opacity-85">
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
  const variantColors = {
    red: 'bg-[#d62d20]',
    orange: 'bg-[#f07020]',
    yellow: 'bg-[#f5c518]',
  };

  const variantGlow = {
    red: 'shadow-[0_6px_36px_-2px_rgba(214,45,32,0.55),0_2px_14px_-4px_rgba(214,45,32,0.35)]',
    orange: 'shadow-[0_6px_36px_-2px_rgba(240,112,32,0.55),0_2px_14px_-4px_rgba(240,112,32,0.35)]',
    yellow: 'shadow-[0_6px_36px_-2px_rgba(245,197,24,0.45),0_2px_14px_-4px_rgba(245,197,24,0.25)]',
  };

  const variantBodyFrom = {
    red: 'from-[rgba(214,45,32,0.12)]',
    orange: 'from-[rgba(240,112,32,0.12)]',
    yellow: 'from-[rgba(245,197,24,0.08)]',
  };

  const iconMap = {
    check: CHECK_ICON,
    bell: BELL_ICON,
    'bell-check': BELL_PLUS_CHECK,
    info: (
      <div className="w-[42px] h-[42px] bg-[#48484a] rounded-full flex items-center justify-center text-white text-lg font-semibold shrink-0">
        i
      </div>
    ),
  };

  const iconEl = iconMap[icon] ?? CHECK_ICON;

  return (
    <div
      className={`rounded-[14px] overflow-hidden bg-[#2c2c2e] cursor-pointer active:opacity-90 w-full ${variantGlow[variant]}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Table header */}
      <div className={`${variantColors[variant]} py-3 px-4 flex items-center justify-center relative overflow-visible`}>
        <span
          className={`text-2xl font-extrabold tracking-wide uppercase ${
            variant === 'yellow' ? 'text-[#1a1a1a]' : 'text-white'
          }`}
        >
          {tableName}
        </span>
        {badgeCount != null && (
          <div className="bg-[#ff3b30] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5 border-2 border-[#1c1c1e]">
            {badgeCount}
          </div>
        )}
      </div>

      {/* Alert body — icon left, text right */}
      <div className={`px-4 py-4 flex flex-row items-center gap-4 bg-gradient-to-b ${variantBodyFrom[variant]} to-transparent`}>
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          {iconEl}
        </div>
        <div className="flex flex-col">
          <div className="text-white text-[17px] font-bold uppercase tracking-wide leading-tight">{title}</div>
          <div className="text-[#8e8e93] text-[13px] font-medium mt-1 uppercase tracking-wider">{subtitle}</div>
        </div>
      </div>

      {/* Action button */}
      <div
        className={`mx-3 mb-4 p-4 rounded-[10px] text-center text-[17px] font-bold tracking-wide uppercase cursor-pointer transition-opacity active:opacity-70 flex items-center justify-center gap-2 ${
          actionVariant === 'blue'
            ? 'bg-[#3478f6] text-white'
            : 'bg-[#3a3a3c] text-white'
        }`}
      >
        {actionVariant === 'blue' && <span className="text-xl font-light">←</span>}
        {actionLabel}
      </div>
    </div>
  );
}
