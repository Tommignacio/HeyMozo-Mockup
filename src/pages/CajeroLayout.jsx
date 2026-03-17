import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getCurrentTime() {
  return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

/* ── Mesa card visual mapping ── */
function getMesaVisual(id, { mesa1Status, mesa2Status, mesa3Released, mesa4Status, mesa6Status }) {
  switch (id) {
    case 1:
      if (mesa1Status === 'GONE') return { icon: 'sensor_door', label: 'LIBRE', color: 'slate', dim: true };
      if (mesa1Status === 'PAID') return { icon: 'check_circle', label: 'COBRADA', color: 'primary' };
      return { icon: 'notification_important', label: 'SOLICITÓ CUENTA', color: 'red' };
    case 2:
      if (mesa2Status === 'GONE') return { icon: 'sensor_door', label: 'LIBRE', color: 'slate', dim: true };
      if (mesa2Status === 'PAID') return { icon: 'check_circle', label: 'COBRADA', color: 'primary' };
      return { icon: 'notification_important', label: 'EFECTIVO', color: 'red' };
    case 3:
      if (mesa3Released) return { icon: 'sensor_door', label: 'LIBRE', color: 'slate', dim: true };
      return { icon: 'restaurant', label: 'OCUPADA', color: 'primary' };
    case 4:
      if (mesa4Status === 'GONE') return { icon: 'sensor_door', label: 'LIBRE', color: 'slate', dim: true };
      if (mesa4Status === 'OCCUPIED') return { icon: 'restaurant', label: 'OCUPADA', color: 'primary' };
      return { icon: 'event_seat', label: 'COMIENDO', color: 'purple' };
    case 5:
      return { icon: 'sensor_door', label: 'LIBRE', color: 'slate', dim: true };
    case 6:
      if (mesa6Status === 'GONE') return { icon: 'sensor_door', label: 'LIBRE', color: 'slate', dim: true };
      if (mesa6Status === 'APPROVED') return { icon: 'check_circle', label: 'APROBADA', color: 'primary' };
      if (mesa6Status === 'REJECTED') return { icon: 'cancel', label: 'RECHAZADA', color: 'red' };
      return { icon: 'account_balance', label: 'PAGO PENDIENTE', color: 'blue', pulse: true, border2: true };
    default:
      return { icon: 'sensor_door', label: 'LIBRE', color: 'slate', dim: true };
  }
}

/* ── Stitch-exact color system ── */
const COLOR_MAP = {
  red: {
    iconBg: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.3)', text: '#ef4444',
    badgeBg: 'rgba(239,68,68,0.1)', hoverBorder: '#ef4444',
  },
  blue: {
    iconBg: 'rgba(59,130,246,0.2)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa',
    badgeBg: 'rgba(59,130,246,0.2)', hoverBorder: '#3b82f6',
  },
  purple: {
    iconBg: 'rgba(168,85,247,0.2)', border: 'rgba(168,85,247,0.3)', text: '#a855f7',
    badgeBg: 'rgba(168,85,247,0.1)', hoverBorder: '#a855f7',
  },
  primary: {
    iconBg: 'rgba(19,236,167,0.2)', border: 'rgba(19,236,167,0.3)', text: '#13eca7',
    badgeBg: 'rgba(19,236,167,0.1)', hoverBorder: '#13eca7',
  },
  slate: {
    iconBg: 'rgba(51,65,85,0.3)', border: '#3a3a3c', text: '#64748b',
    badgeBg: 'rgba(100,116,139,0.1)', hoverBorder: '#3a3a3c',
  },
};

function MesaCard({ number, visual }) {
  const c = COLOR_MAP[visual.color] ?? COLOR_MAP.slate;
  const [hovered, setHovered] = useState(false);

  const borderStyle = visual.border2
    ? '2px solid #3b82f6'
    : `1px solid ${hovered && !visual.dim ? c.hoverBorder : c.border}`;

  return (
    <div
      className={`bg-[#2c2c2e] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-colors ${visual.dim ? 'opacity-60 hover:opacity-100 transition-opacity' : ''} ${visual.pulse ? 'relative overflow-hidden' : ''}`}
      style={{
        border: borderStyle,
        boxShadow: visual.pulse ? '0 10px 25px rgba(59,130,246,0.2)' : undefined,
        padding: '1rem',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {visual.pulse && (
        <div className="absolute inset-0 pulse-green" style={{ background: 'rgba(59,130,246,0.05)' }} />
      )}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1 relative z-10"
        style={{ background: c.iconBg, borderRadius: '2rem' }}
      >
        <span className="material-symbols-outlined text-4xl" style={{ color: c.text }}>{visual.icon}</span>
      </div>
      <span className={`text-sm font-black uppercase relative z-10 ${visual.dim ? 'text-slate-400' : 'text-white'}`}>Mesa {number}</span>
      <span
        className="text-[10px] font-bold px-2 py-0.5 rounded-full relative z-10"
        style={{ color: c.text, background: c.badgeBg }}
      >
        {visual.label}
      </span>
    </div>
  );
}

/* ── Sidebar nav item ── */
function SidebarItem({ icon, label, active, badge, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer border-none"
      style={{
        background: active ? 'rgba(19,236,167,0.1)' : 'transparent',
        border: active ? '1px solid rgba(19,236,167,0.2)' : '1px solid transparent',
        color: active ? '#13eca7' : '#94a3b8',
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{icon}</span>
      <span className="text-sm font-bold flex-1">{label}</span>
      {badge > 0 && (
        <span className="bg-red-500 text-white text-[10px] font-bold rounded-full" style={{ padding: '0.15rem 0.45rem' }}>{badge}</span>
      )}
    </button>
  );
}

export default function CajeroLayout({
  mesa1Status, mesa2Status, mesa3Released, mesa4Status,
  mesa6Status, setMesa6Status,
}) {
  const navigate = useNavigate();
  const [time, setTime] = useState(getCurrentTime);
  const [activeTab, setActiveTab] = useState('transferencias');

  useEffect(() => {
    const id = setInterval(() => setTime(getCurrentTime()), 30000);
    return () => clearInterval(id);
  }, []);

  const hasPending = mesa6Status === 'WAITING';
  const pendingCount = hasPending ? 1 : 0;
  const state = { mesa1Status, mesa2Status, mesa3Released, mesa4Status, mesa6Status };

  /* ── Transferencias section ── */
  const transferenciasContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2" style={{ padding: '1rem 1rem 1rem 0rem' }}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>⏳ Transferencias Pendientes</span>
        </h2>
        {hasPending && (
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full" style={{ padding: '0.3rem' }}>1</span>
        )}
      </div>

      {hasPending ? (
        <div
          className="group rounded-xl p-5 transition-transform hover:translate-x-1"
          style={{ background: '#2c2c2e', borderLeft: '4px solid #3b82f6', boxShadow: '0 20px 25px rgba(0,0,0,0.2)' }}
        >
          <div className="flex justify-between items-start mb-4" style={{ padding: '1rem' }}>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#60a5fa' }}>Mesa 6</span>
              <h3 className="text-lg font-bold text-white mt-1">Transferencia Bancaria</h3>
              <p className="text-sm text-slate-400">ID: #49201 • Hace 4 min</p>
            </div>
            <div className="p-2 rounded-lg" style={{ background: '#3a3a3c' }}>
              <span className="material-symbols-outlined text-slate-300">receipt_long</span>
            </div>
          </div>

          <div className="rounded-lg mb-5" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '0.5rem', margin: '1rem' }}>
            <p className="text-sm font-bold flex items-center gap-2" style={{ color: '#f59e0b' }}>
              <span className="material-symbols-outlined text-sm">attach_money</span>
              Declaró: $22.000
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3" style={{ padding: '1rem' }}>
            <button
              type="button"
              className="flex items-center justify-center gap-2 font-bold py-2.5 rounded-xl transition-all text-sm border-none cursor-pointer hover:brightness-110"
              style={{ background: '#13eca7', color: '#1c1c1e', padding: '0.3rem' }}
              onClick={() => setMesa6Status('APPROVED')}
            >
              <span className="material-symbols-outlined text-sm">check</span>
              APROBAR
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 font-bold py-2.5 rounded-xl transition-all text-sm cursor-pointer hover:bg-red-500 hover:text-white"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
              onClick={() => setMesa6Status('REJECTED')}
            >
              <span className="material-symbols-outlined text-sm">close</span>
              RECHAZAR
            </button>
          </div>
        </div>
      ) : (
        <div
          className="rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center"
          style={{ background: '#2c2c2e', border: '1px solid #3a3a3c', minHeight: '180px' }}
        >
          <span className="material-symbols-outlined text-4xl" style={{ color: '#13eca7' }}>check_circle</span>
          <span className="text-sm font-medium text-slate-500">Sin transferencias pendientes</span>
        </div>
      )}
    </div>
  );

  /* ── Monitor de Mesas section ── */
  const monitorContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2" style={{ padding: '1rem 1rem 1rem 0rem' }}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>📊 Monitor de Mesas</span>
          <span className="text-slate-500 text-sm font-normal ml-2">6 mesas activas</span>
        </h2>
        <button type="button" className="text-sm font-bold hover:underline border-none bg-transparent cursor-pointer" style={{ color: '#13eca7' }}>Ver todas</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <MesaCard key={n} number={n} visual={getMesaVisual(n, state)} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-['Inter',sans-serif] text-slate-100" style={{ background: '#1c1c1e' }}>

      {/* ── pulse-green animation (matches Stitch CSS) ── */}
      <style>{`.pulse-green { animation: pulseGreen 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; } @keyframes pulseGreen { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }`}</style>

      {/* ── Sticky Header ── */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md px-6 lg:px-12 py-4"
        style={{ background: 'rgba(28,28,30,0.8)', borderBottom: '1px solid #3a3a3c' }}
      >
        <div className="mx-auto flex items-center justify-between" style={{ padding: '1rem' }}>
          {/* Left: logo + title */}
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg" style={{ background: '#13eca7' }}>
              <span className="material-symbols-outlined font-bold" style={{ color: '#1c1c1e' }}>restaurant</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">HeyMozo</h1>
              <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'rgba(19,236,167,0.7)' }}>Dashboard Cajero</p>
            </div>
          </div>
          {/* Right: turno badge + clock + avatar */}
          <div className="flex items-center gap-6">
            <div
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(19,236,167,0.1)', border: '1px solid rgba(19,236,167,0.2)', padding: '0.5rem' }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#13eca7' }} />
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: '#13eca7' }} />
              </span>
              <span className="text-sm font-bold" style={{ color: '#13eca7' }}>Turno Activo</span>
            </div>
            <div
              className="flex items-center gap-3 text-slate-400 font-mono text-lg px-4 py-2 rounded-xl"
              style={{ background: '#2c2c2e', border: '1px solid #3a3a3c', padding: '0.1rem' }}
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>{time}</span>
            </div>
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full p-0.5 shrink-0" style={{ background: 'linear-gradient(to top right, #13eca7, #34d399)' }}>
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#2c2c2e' }}>
                <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '20px' }}>person</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body: Sidebar (desktop) + Content ── */}
      <div className="flex flex-1">

        {/* ── Desktop Sidebar ── */}
        <aside
          className="hidden lg:flex flex-col w-[240px] shrink-0 py-6 px-4 gap-2"
          style={{ background: '#252528', borderRight: '1px solid #3a3a3c' }}
        >
          <SidebarItem
            icon="receipt_long"
            label="Transferencias"
            badge={pendingCount}
            active={activeTab === 'transferencias'}
            onClick={() => setActiveTab('transferencias')}
          />
          <SidebarItem
            icon="grid_view"
            label="Monitor de Mesas"
            active={activeTab === 'monitor'}
            onClick={() => setActiveTab('monitor')}
          />
          <div className="flex-1" />
          <SidebarItem
            icon="table_bar"
            label="Vista Mozo"
            active={false}
            onClick={() => navigate('/mozo')}
          />
          <SidebarItem
            icon="settings"
            label="Configuración"
            active={false}
            onClick={() => {}}
          />
          <SidebarItem
            icon="restart_alt"
            label="Reiniciar Demo"
            active={false}
            onClick={() => { sessionStorage.clear(); window.location.reload(); }}
          />
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 p-6 lg:p-12 pb-24 lg:pb-12">
          {/* Summary bar — two stat cards */}
          <div className="flex flex-wrap gap-4 mb-10" style={{ margin: '0 0 2rem 0' }}>
            <div className="flex-1 min-w-[240px] rounded-2xl flex items-center gap-5" style={{ background: '#2c2c2e', border: '1px solid #3a3a3c', padding: '1rem' }}>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(19,236,167,0.2)', padding: '0.5rem', borderRadius: '2rem' }}>
                <span className="material-symbols-outlined text-3xl" style={{ color: '#13eca7' }}>payments</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Caja Total</p>
                <p className="text-2xl font-black text-white">$450.000</p>
              </div>
            </div>
            <div className="flex-1 min-w-[240px] rounded-2xl flex items-center gap-5" style={{ background: '#2c2c2e', border: '1px solid #3a3a3c', padding: '1rem' }}>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(245,158,11,0.2)', padding: '0.5rem', borderRadius: '2rem' }}>
                <span className="material-symbols-outlined text-3xl" style={{ color: '#f59e0b' }}>volunteer_activism</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Propinas Hoy</p>
                <p className="text-2xl font-black text-white">$25.000</p>
              </div>
            </div>
          </div>

          {/* Active section content */}
          {activeTab === 'transferencias' ? transferenciasContent : monitorContent}
        </main>
      </div>

      {/* ── Bottom Nav (mobile only) — Transferencias / Monitor ── */}
      <div
        className="fixed bottom-0 w-full lg:hidden flex justify-around px-6 py-4 z-50"
        style={{ background: '#2c2c2e', borderTop: '1px solid #3a3a3c' }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('transferencias')}
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer relative"
        >
          <span className="material-symbols-outlined" style={{ color: activeTab === 'transferencias' ? '#13eca7' : '#64748b' }}>receipt_long</span>
          <span className="text-[10px] font-bold" style={{ color: activeTab === 'transferencias' ? '#13eca7' : '#64748b' }}>Transferencias</span>
          {pendingCount > 0 && (
            <span
              className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full"
              style={{ padding: '0.1rem 0.35rem' }}
            >{pendingCount}</span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('monitor')}
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ color: activeTab === 'monitor' ? '#13eca7' : '#64748b' }}>grid_view</span>
          <span className="text-[10px] font-bold" style={{ color: activeTab === 'monitor' ? '#13eca7' : '#64748b' }}>Monitor</span>
        </button>
      </div>

      {/* ── Background glow decoration ── */}
      <div className="fixed rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }} />
      <div className="fixed rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }} />
    </div>
  );
}
