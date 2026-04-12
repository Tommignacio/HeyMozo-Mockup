import Header from '../components/Header';
import ActiveAlertsPage from './ActiveAlertsPage';
import { useState } from 'react';

export default function MozoLayout({
  mesa1Status, setMesa1Status,
  mesa2Status, setMesa2Status,
}) {
  const [mesa5Done, setMesa5Done] = useState(() => localStorage.getItem('hm_mesa5_done') === '1');

  function handleMesa5Done(val) {
    setMesa5Done(val);
    if (val) localStorage.setItem('hm_mesa5_done', '1');
    else localStorage.removeItem('hm_mesa5_done');
  }

  return (
    <div className="flex flex-col h-screen bg-[#1c1c1e] font-sans text-white" style={{ height: '100dvh' }}>
      <div className="flex-1 flex flex-col min-h-0">
        <Header pageTitle="Alertas" />

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 pt-1 pb-3 lg:hidden">
            <h1 className="text-[28px] font-bold tracking-tight">Alertas</h1>
          </div>

          <ActiveAlertsPage
            mesa1Status={mesa1Status}
            setMesa1Status={setMesa1Status}
            mesa2Status={mesa2Status}
            setMesa2Status={setMesa2Status}
            mesa5Done={mesa5Done}
            setMesa5Done={handleMesa5Done}
          />
        </main>
      </div>

      {/* ── Background glow decoration ── */}
      <div className="fixed rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }} />
      <div className="fixed rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }} />
    </div>
  );
}
