import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ActiveAlertsPage from './ActiveAlertsPage';
import MisMesasPage from './MisMesasPage';

export default function MozoLayout({
  mesa1Status, setMesa1Status,
  mesa2Status, setMesa2Status,
  mesa3Released, setMesa3Released,
  mesa4Status, setMesa4Status,
  mesa6Status, setMesa6Status,
}) {
  const [activeTab, setActiveTab] = useState('alerts');
  const pageTitle = activeTab === 'alerts' ? 'Active Alerts' : 'Mis Mesas';

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#1c1c1e] font-sans text-white">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col min-h-0">
        <Header pageTitle={pageTitle} />

        <main className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-between px-4 pt-1 pb-3 lg:hidden">
            <h1 className="text-[28px] font-bold tracking-tight">{pageTitle}</h1>
            {activeTab === 'alerts' && (
              <span className="text-[14px] font-bold text-yellow-400">Total Turno: $15.400 💸</span>
            )}
          </div>

          <div className={activeTab !== 'alerts' ? 'hidden' : undefined}>
            <ActiveAlertsPage
              mesa1Status={mesa1Status}
              setMesa1Status={setMesa1Status}
              mesa2Status={mesa2Status}
              setMesa2Status={setMesa2Status}
              mesa3Released={mesa3Released}
              setMesa3Released={setMesa3Released}
              mesa4Status={mesa4Status}
              setMesa4Status={setMesa4Status}
              mesa6Status={mesa6Status}
              setMesa6Status={setMesa6Status}
            />
          </div>
          <div className={activeTab !== 'mesas' ? 'hidden' : undefined}>
            <MisMesasPage
              mesa1Status={mesa1Status}
              setMesa1Status={setMesa1Status}
              mesa2Status={mesa2Status}
              setMesa2Status={setMesa2Status}
              mesa3Released={mesa3Released}
              setMesa3Released={setMesa3Released}
              mesa4Status={mesa4Status}
              setMesa4Status={setMesa4Status}
            />
          </div>
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ── Background glow decoration ── */}
      <div className="fixed rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }} />
      <div className="fixed rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }} />
    </div>
  );
}
