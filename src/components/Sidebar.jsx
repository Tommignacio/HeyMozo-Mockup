import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ALERTS_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

const MESAS_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
  </svg>
);

const CHEVRON_LEFT = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const CHEVRON_RIGHT = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const CASHIER_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const tabs = [
  { id: 'alerts', label: 'Alertas', icon: ALERTS_ICON },
  { id: 'mesas',  label: 'Mis Mesas', icon: MESAS_ICON },
];

export default function Sidebar({ activeTab, onTabChange }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden lg:flex flex-col bg-[#1c1c1e] border-r border-[#2c2c2e] shrink-0 overflow-hidden transition-all duration-300 ${
        collapsed ? 'w-[64px]' : 'w-[240px]'
      }`}
    >
      {/* Logo + toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[#2c2c2e]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-[#e8362a] rounded-xl flex items-center justify-center text-base shrink-0">
            🍽️
          </div>
          {!collapsed && (
            <span className="text-[15px] font-bold text-white tracking-tight whitespace-nowrap">HeyMozo</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className={`text-[#636366] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1 shrink-0 ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? CHEVRON_RIGHT : CHEVRON_LEFT}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 p-2 flex-1 mt-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer border-none font-[inherit] whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#2c2c2e] text-white'
                : 'text-[#8e8e93] hover:bg-[#2c2c2e]/60 hover:text-white'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? tab.label : undefined}
          >
            {tab.icon}
            {!collapsed && <span>{tab.label}</span>}
          </button>
        ))}
      </nav>

      {/* Cajero link + Reset */}
      <div className="p-2 border-t border-[#2c2c2e] flex flex-col gap-0.5">
        <button
          type="button"
          onClick={() => navigate('/cajero')}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer border-none font-[inherit] whitespace-nowrap w-full text-[#8e8e93] hover:bg-[#2c2c2e]/60 hover:text-white ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Cajero' : undefined}
        >
          {CASHIER_ICON}
          {!collapsed && <span>Cajero</span>}
        </button>
        <button
          type="button"
          onClick={() => { sessionStorage.clear(); window.location.reload(); }}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer border-none font-[inherit] whitespace-nowrap w-full text-[#8e8e93] hover:bg-[#2c2c2e]/60 hover:text-white ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Reiniciar' : undefined}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          {!collapsed && <span>Reiniciar Demo</span>}
        </button>
      </div>

    </aside>
  );
}
