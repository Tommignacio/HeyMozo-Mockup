const CHECK_ICON = (
  <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const BELL_ICON = (
  <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

const CHECK_CIRCLE_ICON = (
  <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const INFO_ICON = (
  <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const iconMap = {
  check: CHECK_ICON,
  bell: BELL_ICON,
  'check-circle': CHECK_CIRCLE_ICON,
  info: INFO_ICON,
};

const variantColors = {
  red:    'bg-[#d62d20]',
  orange: 'bg-[#f07020]',
  yellow: 'bg-[#f5c518]',
  paid:   'bg-[#3a3a3c]',
};

const variantGlow = {
  red:    'shadow-[0_6px_36px_-2px_rgba(214,45,32,0.55),0_2px_14px_-4px_rgba(214,45,32,0.35)]',
  orange: 'shadow-[0_6px_36px_-2px_rgba(240,112,32,0.55),0_2px_14px_-4px_rgba(240,112,32,0.35)]',
  yellow: 'shadow-[0_6px_36px_-2px_rgba(245,197,24,0.45),0_2px_14px_-4px_rgba(245,197,24,0.25)]',
  paid:   'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]',
};

const variantBodyFrom = {
  red:    'from-[rgba(214,45,32,0.12)]',
  orange: 'from-[rgba(240,112,32,0.12)]',
  yellow: 'from-[rgba(245,197,24,0.08)]',
  paid:   'from-[rgba(255,255,255,0.03)]',
};

const headerTextColor = {
  red:    'text-white',
  orange: 'text-white',
  yellow: 'text-[#1a1a1a]',
  paid:   'text-[#8e8e93]',
};

export default function AlertCard({
  tableName,
  variant = 'red',
  badgeCount,
  title,
  waitTime,
  icon = 'check',
  actionLabel,
  actionVariant = 'blue',
  onClick,
}) {
  const iconEl = iconMap[icon] ?? CHECK_ICON;

  return (
    <div
      className={`rounded-[14px] overflow-hidden bg-[#2c2c2e] cursor-pointer active:opacity-90 mx-[0.75rem] w-[calc(100%-1.5rem)] md:mx-0 md:w-full ${variantGlow[variant]}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Header: centered table name */}
      <div className={`${variantColors[variant]} py-5 md:py-6 px-5 flex items-center justify-center relative overflow-visible`}>
        <span className={`text-3xl md:text-4xl font-extrabold tracking-wide uppercase my-[0.15rem] ${headerTextColor[variant]}`}>
          {tableName}
        </span>
        {badgeCount != null && (
          <div className="bg-[#ff3b30] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5 border-2 border-[#1c1c1e] z-10">
            {badgeCount}
          </div>
        )}
      </div>

      {/* Body: icon left, title + waitTime right */}
      <div className={`px-5 md:px-6 py-5 md:py-6 flex flex-row items-center gap-4 md:gap-5 bg-gradient-to-b ${variantBodyFrom[variant]} to-transparent`}>
        <div className="bg-[#3a3a3c] rounded-[10px] w-[52px] h-[52px] md:w-[68px] md:h-[68px] flex items-center justify-center shrink-0">
          {iconEl}
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-white text-[21px] md:text-[26px] lg:text-[28px] font-bold uppercase tracking-wide leading-tight">
            {title}
          </div>
          {waitTime && (
            <div className="text-[#8e8e93] text-[13px] md:text-[15px] font-medium mt-1 uppercase tracking-wider">
              ⏱ {waitTime}
            </div>
          )}
        </div>
      </div>

      {/* Action button */}
      <div
        className={`mx-3 md:mx-4 mb-5 md:mb-6 p-6 md:p-7 rounded-[12px] text-center text-[22px] md:text-[26px] font-bold cursor-pointer transition-opacity active:opacity-70 flex items-center justify-center gap-2 ${
          actionVariant === 'blue'
            ? 'bg-[#3478f6] text-white'
            : actionVariant === 'green-outline'
            ? 'bg-transparent border-2 border-green-500 text-green-400'
            : 'bg-[#3a3a3c] text-white'
        }`}
      >
        {actionVariant === 'blue' && <span className="text-3xl md:text-4xl font-light leading-none">←</span>}
        {actionLabel}
      </div>
    </div>
  );
}
