import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.03-1.58zm-7.14 2.66c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const CHECK_ICON = (
  <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-current">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

const CAJERO_ICON = (
  <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-current">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

export default function Header({ pageTitle }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header className="bg-[#1c1c1e] px-4 lg:px-8 py-2 lg:py-4 flex items-center justify-between border-b border-[#2c2c2e]">
      {/* Mobile: Logo */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="w-[38px] h-[38px] bg-[#e8362a] rounded-[10px] flex items-center justify-center text-lg">
          🍽️
        </div>
        <span className="text-xl font-bold tracking-tight">HeyMozo</span>
      </div>

      {/* Desktop: Page title */}
      <h1 className="hidden lg:block text-2xl font-bold tracking-tight">
        {pageTitle}
      </h1>

      {/* Right side: Sector selector + Settings */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            className="bg-transparent border-[1.5px] border-[#555] text-white px-3 py-[7px] rounded-lg text-[13px] font-medium flex items-center gap-1.5 cursor-pointer"
            onClick={() => setOpen((v) => !v)}
          >
            Sector A
            <span className="text-[11px] text-[#aaa]">▾</span>
          </button>

          {open && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-1.5 z-50 bg-[#2c2c2e] border border-[#3a3a3c] rounded-xl overflow-hidden shadow-xl min-w-[140px]">
                <button
                  type="button"
                  className="w-full px-4 py-3 text-[13px] font-medium text-white flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none hover:bg-[#3a3a3c] transition-colors font-[inherit]"
                  onClick={() => setOpen(false)}
                >
                  Sector A
                  {CHECK_ICON}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className="text-[#8e8e93] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-[7px]"
            onClick={() => setSettingsOpen((v) => !v)}
          >
            {SETTINGS_ICON}
          </button>

          {settingsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 z-50 bg-[#2c2c2e] border border-[#3a3a3c] rounded-xl overflow-hidden shadow-xl min-w-[170px]">
                <button
                  type="button"
                  className="w-full px-4 py-3 text-[13px] font-medium text-white flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none hover:bg-[#3a3a3c] transition-colors font-[inherit]"
                  onClick={() => { setSettingsOpen(false); navigate('/cajero'); }}
                >
                  Dashboard Cajero
                  {CAJERO_ICON}
                </button>
                <div className="border-t border-[#3a3a3c]" />
                <button
                  type="button"
                  className="w-full px-4 py-3 text-[13px] font-medium flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none hover:bg-[#3a3a3c] transition-colors font-[inherit]"
                  style={{ color: '#ef4444' }}
                  onClick={() => { setSettingsOpen(false); sessionStorage.clear(); window.location.reload(); }}
                >
                  Reiniciar Demo
                  <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-current"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
