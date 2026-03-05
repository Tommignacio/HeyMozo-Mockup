export default function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'alerts', label: 'Alertas', icon: '🔥' },
    { id: 'mesas', label: 'Mis Mesas', icon: '🗺️' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[250px] bg-[#1c1c1e] border-r border-[#2c2c2e] shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#e8362a] rounded-xl flex items-center justify-center text-lg">
          🍽️
        </div>
        <span className="text-xl font-bold text-white tracking-tight">HeyMozo</span>
      </div>

      <nav className="flex flex-col gap-1 px-3 mt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer border-none ${
              activeTab === tab.id
                ? 'bg-[#2c2c2e] text-white'
                : 'text-[#8e8e93] hover:bg-[#2c2c2e]/50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
