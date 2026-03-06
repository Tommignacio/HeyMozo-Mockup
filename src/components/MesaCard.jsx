const RECEIPT_ICON = (
  <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 fill-current opacity-90">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const BELL_ICON = (
  <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 fill-current opacity-90">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const BELL_RECEIPT_ICON = (
  <div className="flex items-center gap-1.5">
    <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-12 md:h-12 lg:w-16 lg:h-16 fill-current opacity-90">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
    <span className="text-lg md:text-2xl font-light opacity-70">+</span>
    <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-12 md:h-12 lg:w-16 lg:h-16 fill-current opacity-90">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  </div>
);

const INFO_ICON = (
  <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 border-current flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold opacity-80">
    i
  </div>
);

const PERSON_ICON = (
  <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 fill-current opacity-90">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const TABLE_ICON = (
  <svg viewBox="0 0 24 24" className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 fill-current opacity-40">
    <path d="M21 8v1.5h-9V8H3V6h18v2zm-9 3.5h9V13h-9v-1.5zm0 4h9V17h-9v-1.5zM3 11h5v7H3v-7zm2 2v3h1v-3H5z" />
  </svg>
);

const iconMap = {
  receipt: RECEIPT_ICON,
  bell: BELL_ICON,
  'bell-receipt': BELL_RECEIPT_ICON,
  info: INFO_ICON,
  person: PERSON_ICON,
  table: TABLE_ICON,
};

const variantStyles = {
  red:    { bg: 'bg-[#d62d20]', text: 'text-white',     glow: 'shadow-[0_4px_20px_-2px_rgba(214,45,32,0.55)]' },
  orange: { bg: 'bg-[#f07020]', text: 'text-white',     glow: 'shadow-[0_4px_20px_-2px_rgba(240,112,32,0.55)]' },
  yellow: { bg: 'bg-[#f5c518]', text: 'text-white',     glow: 'shadow-[0_4px_20px_-2px_rgba(245,197,24,0.5)]'  },
  green:  { bg: 'bg-[#30d158]', text: 'text-white',     glow: 'shadow-[0_4px_20px_-2px_rgba(48,209,88,0.45)]'  },
  libre:  { bg: 'bg-[#2c2c2e]', text: 'text-[#636366]', glow: ''                                                },
};

export default function MesaCard({ number, status, time, icon = 'table', variant = 'libre', badgeCount }) {
  const { bg, text, glow } = variantStyles[variant];
  const iconEl = iconMap[icon] ?? TABLE_ICON;

  return (
    <div
      className={`relative rounded-[16px] ${bg} ${glow} ${text} flex flex-col items-center justify-between p-5 md:p-6 lg:p-8 aspect-square cursor-pointer active:opacity-85`}
    >
      {/* Badge */}
      {badgeCount != null && (
        <div className="absolute -top-1.5 -right-1.5 bg-[#ff3b30] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1c1c1e] z-10">
          {badgeCount}
        </div>
      )}

      {/* Mesa number */}
      <span className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">{number}</span>

      {/* Icon */}
      <div className="flex items-center justify-center flex-1 py-1">
        {iconEl}
      </div>

      {/* Status label */}
      <div className="text-center leading-tight">
        <div className="text-[15px] md:text-[19px] lg:text-[23px] font-bold uppercase tracking-wide">{status}</div>
        {time && <div className="text-[14px] md:text-[17px] lg:text-[21px] font-medium opacity-70">({time})</div>}
      </div>
    </div>
  );
}
