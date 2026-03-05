export default function BottomNav({ activeTab = 'alerts', onTabChange }) {
  return (
    <div className="bg-[#1c1c1e] border-t border-[#2c2c2e] flex py-3 pb-7 relative lg:hidden">
      <button
        type="button"
        className={`flex-1 text-center text-[13px] font-semibold tracking-wide cursor-pointer relative py-1 bg-transparent border-none font-[inherit] ${
          activeTab === 'alerts' ? 'text-white' : 'text-[#8e8e93]'
        }`}
        onClick={() => onTabChange?.('alerts')}
      >
        ALERTAS
        {activeTab === 'alerts' && (
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white rounded-sm" />
        )}
      </button>
      <button
        type="button"
        className={`flex-1 text-center text-[13px] font-semibold tracking-wide cursor-pointer relative py-1 bg-transparent border-none font-[inherit] ${
          activeTab === 'mesas' ? 'text-white' : 'text-[#8e8e93]'
        }`}
        onClick={() => onTabChange?.('mesas')}
      >
        MIS MESAS
        {activeTab === 'mesas' && (
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white rounded-sm" />
        )}
      </button>
      <span className="absolute bottom-[18px] right-5 text-[#3a3a3c] text-[22px]">✦</span>
    </div>
  );
}
