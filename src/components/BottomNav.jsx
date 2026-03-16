const BELL_ICON = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const GRID_ICON = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M3 3h8v8H3zm0 10h8v8H3zm10-10h8v8h-8zm0 10h8v8h-8z" />
  </svg>
);

export default function BottomNav({ activeTab = 'alerts', onTabChange }) {
  const tabs = [
    { id: 'alerts', label: 'Alertas',   icon: BELL_ICON },
    { id: 'mesas',  label: 'Mis Mesas', icon: GRID_ICON  },
  ];

  return (
    <div className="bg-[#1c1c1e] border-t border-[#2c2c2e] flex items-stretch py-2 pb-7 lg:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-1 bg-transparent border-none cursor-pointer font-[inherit] transition-colors ${
            activeTab === tab.id ? 'text-white' : 'text-[#636366]'
          }`}
          onClick={() => onTabChange?.(tab.id)}
        >
          {tab.icon}
          <span className="text-[10px] font-semibold tracking-wide">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
