const CHECK_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24" className="fill-white opacity-85">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const BELL_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24" className="fill-white opacity-85">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const BELL_PLUS_CHECK = (
  <div className="flex items-center gap-[3px]">
    <svg width="22" height="22" viewBox="0 0 24 24" className="fill-white opacity-85">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
    <span className="text-white text-base font-light opacity-70">+</span>
    <svg width="22" height="22" viewBox="0 0 24 24" className="fill-white opacity-85">
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

  const iconMap = {
    check: CHECK_ICON,
    bell: BELL_ICON,
    'bell-check': BELL_PLUS_CHECK,
    info: (
      <div className="w-[34px] h-[34px] bg-[#48484a] rounded-full flex items-center justify-center text-white text-base font-semibold">
        i
      </div>
    ),
  };

  const iconEl = iconMap[icon] ?? CHECK_ICON;

  return (
    <div
      className="rounded-[14px] overflow-hidden bg-[#2c2c2e] cursor-pointer active:opacity-85 w-full max-w-sm md:max-w-none"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Table header */}
      <div className={`${variantColors[variant]} py-2.5 px-4 flex items-center justify-between relative overflow-visible`}>
        <span
          className={`text-xl font-extrabold tracking-wide uppercase ${
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

      {/* Alert body */}
      <div className="p-3 px-4 flex items-center gap-3.5 bg-[#2c2c2e]">
        <div className="w-10 h-10 flex items-center justify-center shrink-0">
          {iconEl}
        </div>
        <div>
          <div className="text-white text-[15px] font-bold uppercase tracking-wide">{title}</div>
          <div className="text-[#8e8e93] text-xs font-medium mt-0.5 uppercase tracking-wider">{subtitle}</div>
        </div>
      </div>

      {/* Action button */}
      <div
        className={`mx-3 mb-3 p-3 rounded-[10px] text-center text-[15px] font-bold tracking-wide uppercase cursor-pointer transition-opacity active:opacity-70 flex items-center justify-center gap-2 ${
          actionVariant === 'blue'
            ? 'bg-[#3478f6] text-white'
            : 'bg-[#3a3a3c] text-white'
        }`}
      >
        {actionVariant === 'blue' && <span className="text-lg font-light">←</span>}
        {actionLabel}
      </div>
    </div>
  );
}
