export default function BottomNav({ activeTab = 'alerts', onTabChange }) {
  const tabs = [
    { id: 'alerts', label: 'ALERTAS' },
    { id: 'mesas',  label: 'MIS MESAS' },
  ];

  return (
    <div className="bg-[#1c1c1e] border-t border-[#2c2c2e] flex items-stretch py-3 pb-7 lg:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`flex-1 text-center text-[13px] font-semibold tracking-wide cursor-pointer relative py-1 bg-transparent border-none font-[inherit] ${
            activeTab === tab.id ? 'text-white' : 'text-[#8e8e93]'
          }`}
          onClick={() => onTabChange?.(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white rounded-sm" />
          )}
        </button>
      ))}
    </div>
  );
}
