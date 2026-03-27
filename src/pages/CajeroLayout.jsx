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
    iconBg: 'rgba(51,65,85,0.3)', border: '#1e293b', text: '#64748b',
    badgeBg: 'rgba(100,116,139,0.1)', hoverBorder: '#1e293b',
  },
};

const MESA_WAITER = {
  1: { name: 'Carlos', sector: 'Sector B' },
  2: { name: 'Ana',    sector: 'Sector A' },
  3: { name: 'Carlos', sector: 'Sector B' },
  4: { name: 'Ana',    sector: 'Sector A' },
  5: { name: 'Carlos', sector: 'Sector B' },
  6: { name: 'Ana',    sector: 'Sector A' },
};

function MesaCard({ number, visual }) {
  const c = COLOR_MAP[visual.color] ?? COLOR_MAP.slate;
  const [hovered, setHovered] = useState(false);
  const waiter = MESA_WAITER[number];

  const borderStyle = visual.border2
    ? '2px solid #3b82f6'
    : `1px solid ${hovered && !visual.dim ? c.hoverBorder : c.border}`;

  return (
    <div
      className={`bg-[#1a1c29] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-colors ${visual.dim ? 'opacity-60 hover:opacity-100 transition-opacity' : ''} ${visual.pulse ? 'relative overflow-hidden' : ''}`}
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
      {waiter && (
        <span className="text-[10px] font-medium relative z-10" style={{ color: '#64748b' }}>
          {waiter.name} · {waiter.sector}
        </span>
      )}
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

  /* ── Monitor en Vivo: Two-column layout (Stitch style) ── */
  const monitorEnVivoContent = (
    <div className="flex flex-col" style={{ gap: '2rem' }}>
      {/* Metric cards — Caja Total + Propinas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1rem' }}>
        <div className="rounded-2xl flex items-center gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '1.25rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '48px', height: '48px', background: 'rgba(19,236,167,0.2)' }}>
            <span className="material-symbols-outlined" style={{ color: '#13eca7', fontSize: '24px' }}>payments</span>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Caja Total</p>
            <p className="text-2xl font-black text-white" style={{ marginTop: '0.125rem' }}>$450.000</p>
          </div>
        </div>
        <div className="rounded-2xl flex items-center gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '1.25rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '48px', height: '48px', background: 'rgba(245,158,11,0.2)' }}>
            <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '24px' }}>volunteer_activism</span>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Propinas Hoy</p>
            <p className="text-2xl font-black text-white" style={{ marginTop: '0.125rem' }}>$25.000</p>
          </div>
        </div>
        <div className="rounded-2xl flex items-center gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '1.25rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.2)' }}>
            <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '24px' }}>receipt_long</span>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Transacciones</p>
            <p className="text-2xl font-black text-white" style={{ marginTop: '0.125rem' }}>24</p>
          </div>
        </div>
        <div className="rounded-2xl flex items-center gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '1.25rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '48px', height: '48px', background: 'rgba(168,85,247,0.2)' }}>
            <span className="material-symbols-outlined" style={{ color: '#a855f7', fontSize: '24px' }}>table_bar</span>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Mesas Activas</p>
            <p className="text-2xl font-black text-white" style={{ marginTop: '0.125rem' }}>4 / 6</p>
          </div>
        </div>
      </div>

      {/* Two-column: Feed + Monitor */}
      <div className="grid grid-cols-1 xl:grid-cols-[35%_1fr]" style={{ gap: '2rem' }}>
      {/* ── Left Column: Feed de Acción ── */}
      <div className="space-y-6">
        {/* Transferencias Pendientes */}
        <div className="flex items-center justify-between" style={{ padding: '0 0 0.5rem 0' }}>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span>⏳ Transferencias Pendientes</span>
          </h2>
          {hasPending && (
            <span className="text-xs font-bold rounded-full" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', padding: '0.2rem 0.6rem' }}>1 nueva</span>
          )}
        </div>

        {hasPending ? (
          <div
            className="rounded-xl transition-transform hover:translate-x-1"
            style={{ background: '#1a1c29', borderLeft: '4px solid #3b82f6', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', padding: '1.25rem' }}
          >
            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#60a5fa' }}>Mesa 6</span>
                <h3 className="text-base font-bold text-white" style={{ marginTop: '0.25rem' }}>Validación de Pago</h3>
              </div>
              <span className="text-lg font-black text-white">$42.500</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 font-bold rounded-xl text-sm border-none cursor-pointer hover:brightness-110 transition-all"
                style={{ background: '#13eca7', color: '#1c1c1e', padding: '0.6rem' }}
                onClick={() => setMesa6Status('APPROVED')}
              >
                Aprobar
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 font-bold rounded-xl text-sm cursor-pointer hover:bg-red-500 hover:text-white transition-all"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', padding: '0.6rem' }}
                onClick={() => setMesa6Status('REJECTED')}
              >
                Rechazar
              </button>
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex flex-col items-center justify-center gap-3 text-center"
            style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '2rem', minHeight: '120px' }}
          >
            <span className="material-symbols-outlined text-3xl" style={{ color: '#13eca7' }}>check_circle</span>
            <span className="text-sm font-medium text-slate-500">Sin transferencias pendientes</span>
          </div>
        )}

        {/* Alertas de Prioridad */}
        <div className="flex items-center justify-between" style={{ padding: '1rem 0 0.5rem 0' }}>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span>🚨 Alertas de Prioridad</span>
          </h2>
          <span className="text-xs font-bold rounded-full" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', padding: '0.2rem 0.6rem' }}>1</span>
        </div>

        <div
          className="rounded-xl"
          style={{
            background: 'rgba(127,29,29,0.2)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderLeft: '4px solid #ef4444',
            padding: '1.25rem',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: '44px', height: '44px', background: 'rgba(239,68,68,0.15)' }}
            >
              <span style={{ fontSize: '1.25rem' }}>😢</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-black text-white">Mesa 4 — Alerta Crítica</span>
              <div
                className="rounded-lg"
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  padding: '0.6rem 0.8rem',
                  margin: '0.5rem 0',
                }}
              >
                <p className="text-sm italic" style={{ color: '#d1d5db', lineHeight: 1.4 }}>
                  &ldquo;El servicio fue muy lento, pedimos la cuenta hace 15 minutos.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-1" style={{ marginTop: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ color: '#ef4444', fontSize: '0.9rem' }}>★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Column: Monitor de Mesas ── */}
      <div
        className="rounded-2xl"
        style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '1.5rem' }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ color: '#13eca7', fontSize: '20px' }}>grid_view</span>
            Monitor de Mesas
          </h2>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#13eca7' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#13eca7' }} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>6 Activas</span>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <MesaCard key={n} number={n} visual={getMesaVisual(n, state)} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );

  /* ── Club de Clientes section ── */
  const CLUB_CLIENTS = [
    { phone: '+54 9 11 4567-8901', lastVisit: 'Hoy, 20:15 hs', visits: '1 visita', status: 'Regalo Pendiente', statusColor: 'emerald' },
    { phone: '+54 9 11 2233-4455', lastVisit: 'Ayer', visits: '4 visitas', status: 'Cliente Frecuente', statusColor: 'purple' },
    { phone: '+54 9 11 9876-5432', lastVisit: 'Hace 3 días', visits: '2 visitas', status: 'Regalo Pendiente', statusColor: 'emerald' },
    { phone: '+54 9 11 3344-5566', lastVisit: 'Hace 1 semana', visits: '10 visitas', status: 'Cliente Frecuente', statusColor: 'purple' },
  ];

  const clubContent = (
    <div className="flex flex-col" style={{ gap: '1.5rem' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between" style={{ gap: '0.75rem' }}>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Base de Datos de Clientes</h2>
          <p className="text-sm" style={{ color: '#94a3b8', marginTop: '0.25rem' }}>
            Números de WhatsApp recolectados del punto de venta
          </p>
        </div>
        <button
          type="button"
          className="hidden sm:flex items-center gap-2 font-bold text-sm rounded-xl border-none cursor-pointer hover:brightness-110 transition-all"
          style={{ background: '#10b981', color: '#fff', padding: '0.75rem 1.25rem' }}
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Exportar a Excel
        </button>
      </div>

      {/* Metric cards — horizontal scroll on mobile, grid on desktop */}
      <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="min-w-[140px] sm:min-w-0 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.85rem 1rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: '20px' }}>group</span>
          </div>
          <div>
            <p className="text-[11px] sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Total Clientes</p>
            <p className="text-xl sm:text-2xl font-black text-white" style={{ marginTop: '0.125rem' }}>1.245</p>
          </div>
        </div>
        <div className="min-w-[140px] sm:min-w-0 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.85rem 1rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: 'rgba(96,165,250,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '20px' }}>trending_up</span>
          </div>
          <div>
            <p className="text-[11px] sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Nuevos semana</p>
            <p className="text-xl sm:text-2xl font-black" style={{ color: '#60a5fa', marginTop: '0.125rem' }}>+42</p>
          </div>
        </div>
        <div className="min-w-[140px] sm:min-w-0 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.85rem 1rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', background: 'rgba(245,158,11,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '20px' }}>redeem</span>
          </div>
          <div>
            <p className="text-[11px] sm:text-sm font-medium" style={{ color: '#94a3b8' }}>Regalos</p>
            <p className="text-xl sm:text-2xl font-black" style={{ color: '#f59e0b', marginTop: '0.125rem' }}>18</p>
          </div>
        </div>
      </div>

      {/* Search + Export mobile */}
      <div className="flex flex-col" style={{ gap: '0.5rem' }}>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b', fontSize: '20px' }}>search</span>
          <input
            type="text"
            placeholder="🔍 Buscar por teléfono o nombre..."
            className="w-full text-sm text-white placeholder-slate-500 border-none outline-none"
            style={{
              background: '#1a1c29',
              border: '1px solid #1e293b',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
            }}
          />
        </div>
        {/* Export button — mobile only (purple) */}
        <button
          type="button"
          className="sm:hidden flex items-center justify-center gap-2 font-bold text-sm rounded-xl border-none cursor-pointer hover:brightness-110 transition-all w-full"
          style={{ background: '#7c3aed', color: '#fff', padding: '0.85rem 1.25rem' }}
        >
          <span className="material-symbols-outlined text-sm">download</span>
          📥 Exportar a Excel (CSV)
        </button>
      </div>

      {/* ── Desktop Table (hidden on mobile) ── */}
      <div className="hidden md:block rounded-2xl overflow-hidden flex-1" style={{ background: '#1a1c29', border: '1px solid #1e293b' }}>
        {/* Table header */}
        <div className="grid grid-cols-4" style={{ background: '#13151f', padding: '1rem 1.5rem' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Teléfono / WhatsApp</span>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Última Visita</span>
          <span className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#64748b' }}>Visitas Totales</span>
          <span className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#64748b' }}>Estado VIP</span>
        </div>

        {/* Table rows */}
        {CLUB_CLIENTS.map((client, i) => (
          <div
            key={i}
            className="grid grid-cols-4 items-center transition-colors hover:bg-white/[0.02]"
            style={{ padding: '1rem 1.5rem', borderBottom: i < CLUB_CLIENTS.length - 1 ? '1px solid rgba(58,58,60,0.5)' : 'none' }}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ color: '#25d366', fontSize: '18px' }}>chat</span>
              <span className="text-sm font-medium text-white">{client.phone}</span>
            </div>
            <span className="text-sm" style={{ color: '#cbd5e1' }}>{client.lastVisit}</span>
            <span className="text-sm text-center" style={{ color: '#94a3b8' }}>{client.visits}</span>
            <div className="flex justify-center">
              <span
                className="text-xs font-bold rounded-full"
                style={{
                  padding: '0.3rem 0.75rem',
                  background: client.statusColor === 'emerald' ? 'rgba(16,185,129,0.15)' : 'rgba(168,85,247,0.15)',
                  color: client.statusColor === 'emerald' ? '#34d399' : '#a855f7',
                }}
              >
                {client.status}
              </span>
            </div>
          </div>
        ))}

        {/* Table footer — desktop */}
        <div className="flex items-center justify-between" style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid rgba(58,58,60,0.5)' }}>
          <span className="text-xs" style={{ color: '#64748b' }}>Mostrando 4 de 1.245 clientes</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                className="border-none cursor-pointer rounded text-xs font-bold"
                style={{
                  padding: '0.25rem 0.5rem',
                  background: p === 1 ? 'rgba(16,185,129,0.2)' : 'transparent',
                  color: p === 1 ? '#10b981' : '#64748b',
                }}
              >
                {p}
              </button>
            ))}
            <span className="text-xs" style={{ color: '#64748b', padding: '0 0.25rem' }}>...</span>
            <button
              type="button"
              className="border-none cursor-pointer rounded text-xs font-bold"
              style={{ padding: '0.25rem 0.5rem', background: 'transparent', color: '#64748b' }}
            >
              125
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Client Cards (visible only on mobile) ── */}
      <div className="block md:hidden flex flex-col" style={{ gap: '1rem' }}>
        {CLUB_CLIENTS.map((client, i) => (
          <div
            key={i}
            className="rounded-2xl flex flex-col"
            style={{
              background: '#1a1c29',
              border: '1px solid #1e293b',
              padding: '1.25rem',
              gap: '0.75rem',
            }}
          >
            {/* WhatsApp phone */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ color: '#25d366', fontSize: '20px' }}>chat</span>
              <span className="text-base font-bold text-white">{client.phone}</span>
            </div>

            {/* Details: 2 columns */}
            <div className="grid grid-cols-2" style={{ gap: '0.5rem', marginTop: '0.25rem' }}>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Última Visita</p>
                <p className="text-sm" style={{ color: '#cbd5e1', marginTop: '0.15rem' }}>{client.lastVisit}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Visitas Totales</p>
                <p className="text-sm" style={{ color: '#94a3b8', marginTop: '0.15rem' }}>{client.visits}</p>
              </div>
            </div>

            {/* Status + eye action */}
            <div className="flex items-center justify-between" style={{ borderTop: '1px solid #1e293b', paddingTop: '0.75rem' }}>
              <span
                className="text-xs font-bold rounded-full"
                style={{
                  padding: '0.3rem 0.75rem',
                  background: client.statusColor === 'emerald' ? 'rgba(16,185,129,0.15)' : 'rgba(168,85,247,0.15)',
                  color: client.statusColor === 'emerald' ? '#34d399' : '#a855f7',
                }}
              >
                {client.status}
              </span>
              <button type="button" className="border-none bg-transparent cursor-pointer" style={{ color: '#64748b', padding: '0.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
              </button>
            </div>
          </div>
        ))}

        {/* Mobile pagination */}
        <div className="flex flex-col items-center" style={{ gap: '0.5rem', marginTop: '0.5rem' }}>
          <div className="flex items-center" style={{ gap: '0.75rem' }}>
            <button type="button" className="border-none bg-transparent cursor-pointer text-sm font-medium" style={{ color: '#64748b' }}>Anterior</button>
            <button type="button" className="border-none cursor-pointer text-sm font-bold rounded-lg" style={{ padding: '0.3rem 0.75rem', background: 'rgba(19,236,167,0.2)', color: '#13eca7' }}>1</button>
            <button type="button" className="border-none bg-transparent cursor-pointer text-sm" style={{ color: '#64748b' }}>2</button>
            <button type="button" className="border-none bg-transparent cursor-pointer text-sm" style={{ color: '#64748b' }}>3</button>
            <span className="text-sm" style={{ color: '#64748b' }}>...</span>
            <button type="button" className="border-none bg-transparent cursor-pointer text-sm font-medium" style={{ color: '#94a3b8' }}>Siguiente</button>
          </div>
          <span className="text-[11px]" style={{ color: '#64748b' }}>Mostrando 4 de 1.245 clientes</span>
        </div>
      </div>
    </div>
  );

  /* ── Historial de Pagos section ── */
  const PAGOS_DATA = [
    { hora: '21:14 hs', mesa: 'Mesa 4', metodo: 'Mercado Pago', metodoIcon: 'credit_card', metodoColor: '#60a5fa', consumo: '$20.000', propina: '$2.000', propinaColor: '#f59e0b', total: '$22.000', estado: 'Pagado', estadoColor: 'emerald' },
    { hora: '20:50 hs', mesa: 'Mesa 6', metodo: 'Transferencia', metodoIcon: 'account_balance', metodoColor: '#a78bfa', consumo: '$42.500', propina: '$0', propinaColor: '#475569', total: '$42.500', estado: 'Pagado', estadoColor: 'emerald' },
    { hora: '20:15 hs', mesa: 'Mesa 1', metodo: 'Efectivo', metodoIcon: 'payments', metodoColor: '#34d399', consumo: '$15.000', propina: '$1.500', propinaColor: '#f59e0b', total: '$16.500', estado: 'Pagado', estadoColor: 'emerald' },
    { hora: '19:40 hs', mesa: 'Mesa 8', metodo: 'Mercado Pago', metodoIcon: 'credit_card', metodoColor: '#60a5fa', consumo: '$12.000', propina: '$0', propinaColor: '#475569', total: '$12.000', estado: 'Reembolsado', estadoColor: 'red' },
  ];
  const [historialFilter, setHistorialFilter] = useState('todos');
  const [showCierreCaja, setShowCierreCaja] = useState(false);
  const [drawerPago, setDrawerPago] = useState(null);

  const historialContent = (
    <div className="flex flex-col" style={{ gap: '1.5rem' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between" style={{ gap: '0.75rem' }}>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Historial de Pagos</h2>
          <p className="text-sm" style={{ color: '#94a3b8', marginTop: '0.25rem' }}>Turno Noche — Caja 1</p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 font-bold text-sm rounded-xl border-none cursor-pointer hover:brightness-110 transition-all w-full sm:w-auto"
          style={{ background: '#dc2626', color: '#fff', padding: '0.75rem 1.25rem' }}
          onClick={() => setShowCierreCaja(true)}
        >
          <span className="material-symbols-outlined text-sm">lock</span>
          Cerrar Turno y Caja
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4" style={{ marginTop: '0.5rem' }}>
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748b', fontSize: '20px' }}>search</span>
          <input
            type="text"
            placeholder="Buscar por mesa, ID o monto..."
            className="w-full text-sm text-white placeholder-slate-500 border-none outline-none"
            style={{
              background: '#1a1c29',
              border: '1px solid #1e293b',
              borderRadius: '0.75rem',
              padding: '0.7rem 1rem 0.7rem 2.75rem',
            }}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {['todos', 'Mercado Pago', 'Transferencia', 'Efectivo'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setHistorialFilter(f)}
              className="text-sm font-bold rounded-full border-none cursor-pointer transition-all whitespace-nowrap"
              style={{
                padding: '0.4rem 1rem',
                background: historialFilter === f ? 'rgba(16,185,129,0.15)' : '#1a1c29',
                color: historialFilter === f ? '#34d399' : '#94a3b8',
                border: historialFilter === f ? '1px solid rgba(16,185,129,0.3)' : '1px solid #1e293b',
              }}
            >
              {f === 'todos' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop Table (hidden on mobile) ── */}
      <div className="hidden md:block rounded-2xl overflow-hidden flex-1" style={{ background: '#1a1c29', border: '1px solid #1e293b' }}>
        {/* Table header */}
        <div className="grid items-center" style={{ gridTemplateColumns: '10% 10% 16% 14% 12% 14% 14% 10%', background: '#13151f', padding: '0.85rem 1.5rem' }}>
          {['HORA', 'MESA', 'MÉTODO', 'CONSUMO', 'PROPINA', 'TOTAL', 'ESTADO', 'ACCIÓN'].map((h) => (
            <span
              key={h}
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#64748b', textAlign: ['CONSUMO', 'PROPINA', 'TOTAL'].includes(h) ? 'right' : ['ESTADO', 'ACCIÓN'].includes(h) ? 'center' : 'left' }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Table rows */}
        {PAGOS_DATA
          .filter((p) => historialFilter === 'todos' || p.metodo === historialFilter)
          .map((pago, i) => (
          <div
            key={i}
            className="grid items-center transition-colors hover:bg-white/[0.02]"
            style={{
              gridTemplateColumns: '10% 10% 16% 14% 12% 14% 14% 10%',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(58,58,60,0.4)',
            }}
          >
            <span className="text-sm" style={{ color: '#cbd5e1' }}>{pago.hora}</span>
            <span className="text-sm font-medium text-white">{pago.mesa}</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ color: pago.metodoColor, fontSize: '18px' }}>{pago.metodoIcon}</span>
              <span className="text-sm" style={{ color: '#cbd5e1' }}>{pago.metodo}</span>
            </div>
            <span className="text-sm font-medium text-white" style={{ textAlign: 'right' }}>{pago.consumo}</span>
            <span className="text-sm font-medium" style={{ textAlign: 'right', color: pago.propinaColor }}>{pago.propina}</span>
            <span className="text-sm font-bold text-white" style={{ textAlign: 'right' }}>{pago.total}</span>
            <div style={{ textAlign: 'center' }}>
              <span
                className="text-xs font-bold rounded-full"
                style={{
                  padding: '0.3rem 0.75rem',
                  background: pago.estadoColor === 'emerald' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                  color: pago.estadoColor === 'emerald' ? '#34d399' : '#ef4444',
                }}
              >
                {pago.estado}
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button type="button" className="border-none bg-transparent cursor-pointer transition-colors hover:brightness-150" style={{ color: '#64748b', padding: '0.25rem' }} onClick={() => setDrawerPago(pago)}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
              </button>
            </div>
          </div>
        ))}

        {/* Totals footer */}
        <div
          className="flex items-center justify-end gap-8"
          style={{ background: 'rgba(51,65,85,0.3)', padding: '1rem 1.5rem', borderTop: '1px solid rgba(58,58,60,0.5)' }}
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Totales del Turno:</span>
          <span className="text-sm font-bold text-white">Consumo: $89.500</span>
          <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>Propinas: $3.500</span>
          <span className="text-sm font-black" style={{ color: '#34d399' }}>Total Caja: $93.000</span>
        </div>
      </div>

      {/* ── Mobile Cards (visible only on mobile) ── */}
      <div className="block md:hidden flex flex-col" style={{ gap: '1rem' }}>
        {PAGOS_DATA
          .filter((p) => historialFilter === 'todos' || p.metodo === historialFilter)
          .map((pago, i) => (
          <div
            key={i}
            className="rounded-xl flex flex-col"
            style={{
              background: '#1a1c29',
              border: '1px solid #1e293b',
              padding: '1rem 1.25rem',
              gap: '0.75rem',
            }}
          >
            {/* Row 1: Hora + Estado */}
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#cbd5e1' }}>{pago.hora}</span>
              <span
                className="text-xs font-bold rounded-full"
                style={{
                  padding: '0.25rem 0.75rem',
                  background: pago.estadoColor === 'emerald' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                  color: pago.estadoColor === 'emerald' ? '#34d399' : '#ef4444',
                }}
              >
                {pago.estado}
              </span>
            </div>

            {/* Row 2: Mesa + Total */}
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white">{pago.mesa}</span>
              <span className="text-lg font-black text-white">{pago.total}</span>
            </div>

            {/* Row 3: Método de pago */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ color: pago.metodoColor, fontSize: '18px' }}>{pago.metodoIcon}</span>
              <span className="text-sm" style={{ color: '#94a3b8' }}>{pago.metodo}</span>
            </div>

            {/* Row 4: Desglose + Acción */}
            <div className="flex items-center justify-between" style={{ borderTop: '1px solid #1e293b', paddingTop: '0.75rem' }}>
              <div className="flex items-center gap-4">
                <span className="text-xs" style={{ color: '#94a3b8' }}>Consumo: <span className="font-bold text-white">{pago.consumo}</span></span>
                <span className="text-xs" style={{ color: '#94a3b8' }}>Propina: <span className="font-bold" style={{ color: pago.propinaColor }}>{pago.propina}</span></span>
              </div>
              <button type="button" className="border-none bg-transparent cursor-pointer" style={{ color: '#64748b', padding: '0.25rem' }} onClick={() => setDrawerPago(pago)}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
              </button>
            </div>
          </div>
        ))}

        {/* Mobile Totals */}
        <div
          className="rounded-xl flex flex-col"
          style={{
            background: 'rgba(51,65,85,0.3)',
            border: '1px solid #1e293b',
            padding: '1rem 1.25rem',
            gap: '0.5rem',
          }}
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Totales del Turno</span>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Consumo</span>
            <span className="text-sm font-bold text-white">$89.500</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#f59e0b' }}>Propinas</span>
            <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>$3.500</span>
          </div>
          <div className="flex items-center justify-between" style={{ borderTop: '1px solid #1e293b', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
            <span className="text-sm font-bold" style={{ color: '#34d399' }}>Total Caja</span>
            <span className="text-base font-black" style={{ color: '#34d399' }}>$93.000</span>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── Reseñas y Alertas section ── */
  const resenasContent = (
    <div className="flex flex-col" style={{ gap: '2rem' }}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Reseñas y Alertas</h2>
        <p className="text-sm" style={{ color: '#94a3b8', marginTop: '0.25rem' }}>Feedback de clientes en tiempo real</p>
      </div>

      {/* Metric cards — Estrellas */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1rem' }}>
        <div className="rounded-2xl flex items-center gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '1.25rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '48px', height: '48px', background: 'rgba(245,158,11,0.2)' }}>
            <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '24px' }}>star</span>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Promedio General</p>
            <p className="text-2xl font-black text-white" style={{ marginTop: '0.125rem' }}>4.6 ★</p>
          </div>
        </div>
        <div className="rounded-2xl flex items-center gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '1.25rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '48px', height: '48px', background: 'rgba(16,185,129,0.2)' }}>
            <span className="material-symbols-outlined" style={{ color: '#34d399', fontSize: '24px' }}>reviews</span>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Reseñas Hoy</p>
            <p className="text-2xl font-black text-white" style={{ marginTop: '0.125rem' }}>12</p>
          </div>
        </div>
        <div className="rounded-2xl flex items-center gap-4" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '1.25rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '48px', height: '48px', background: 'rgba(239,68,68,0.2)' }}>
            <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: '24px' }}>warning</span>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Alertas Activas</p>
            <p className="text-2xl font-black" style={{ color: '#ef4444', marginTop: '0.125rem' }}>2</p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      <div
        className="rounded-xl flex flex-col items-center justify-center gap-3 text-center"
        style={{ background: '#1a1c29', border: '1px solid #1e293b', minHeight: '180px', padding: '2rem' }}
      >
        <span className="material-symbols-outlined text-4xl" style={{ color: '#13eca7' }}>reviews</span>
        <span className="text-sm font-medium text-slate-500">Sin reseñas nuevas por el momento</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-['Inter',sans-serif] text-slate-100" style={{ background: '#0f111a' }}>

      {/* ── pulse-green animation (matches Stitch CSS) ── */}
      <style>{`
        .pulse-green { animation: pulseGreen 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulseGreen { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>

      {/* ── Sticky Header ── */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md px-6 lg:px-12 py-4"
        style={{ background: 'rgba(15,17,26,0.85)', borderBottom: '1px solid #1e293b' }}
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
              style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.1rem' }}
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>{time}</span>
            </div>
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full p-0.5 shrink-0" style={{ background: 'linear-gradient(to top right, #13eca7, #34d399)' }}>
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#1a1c29' }}>
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
          style={{ background: '#13151f', borderRight: '1px solid #1e293b' }}
        >
          <SidebarItem
            icon="monitor_heart"
            label="Monitor en Vivo"
            badge={pendingCount}
            active={activeTab === 'transferencias'}
            onClick={() => setActiveTab('transferencias')}
          />
          <SidebarItem
            icon="payments"
            label="Historial de Pagos"
            active={activeTab === 'monitor'}
            onClick={() => setActiveTab('monitor')}
          />
          <SidebarItem
            icon="star"
            label="Reseñas y Alertas"
            active={activeTab === 'resenas'}
            onClick={() => setActiveTab('resenas')}
          />
          <SidebarItem
            icon="redeem"
            label="Club de Clientes"
            active={activeTab === 'club'}
            onClick={() => setActiveTab('club')}
          />
          <div className="flex-1" />
          <SidebarItem
            icon="table_bar"
            label="Vista Mozo"
            active={false}
            onClick={() => navigate('/mozo')}
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
          {/* Active section content */}
          {activeTab === 'transferencias' && monitorEnVivoContent}
          {activeTab === 'monitor' && historialContent}
          {activeTab === 'resenas' && resenasContent}
          {activeTab === 'club' && clubContent}
        </main>
      </div>

      {/* ── Bottom Nav (mobile only) — Transferencias / Monitor ── */}
      <div
        className="fixed bottom-0 w-full lg:hidden flex justify-around px-6 py-4 z-50"
        style={{ background: '#1a1c29', borderTop: '1px solid #1e293b' }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('transferencias')}
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer relative"
        >
          <span className="material-symbols-outlined" style={{ color: activeTab === 'transferencias' ? '#13eca7' : '#64748b' }}>monitor_heart</span>
          <span className="text-[10px] font-bold" style={{ color: activeTab === 'transferencias' ? '#13eca7' : '#64748b' }}>Monitor</span>
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
          <span className="material-symbols-outlined" style={{ color: activeTab === 'monitor' ? '#13eca7' : '#64748b' }}>payments</span>
          <span className="text-[10px] font-bold" style={{ color: activeTab === 'monitor' ? '#13eca7' : '#64748b' }}>Pagos</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('resenas')}
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ color: activeTab === 'resenas' ? '#13eca7' : '#64748b' }}>star</span>
          <span className="text-[10px] font-bold" style={{ color: activeTab === 'resenas' ? '#13eca7' : '#64748b' }}>Reseñas</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('club')}
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ color: activeTab === 'club' ? '#13eca7' : '#64748b' }}>redeem</span>
          <span className="text-[10px] font-bold" style={{ color: activeTab === 'club' ? '#13eca7' : '#64748b' }}>Club</span>
        </button>
      </div>

      {/* ── Background glow decoration ── */}
      <div className="fixed rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }} />
      <div className="fixed rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }} />

      {/* ── Drawer: Detalle de Transacción ── */}
      {drawerPago && (
        <div
          className="fixed inset-0 z-[90]"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setDrawerPago(null)}
        >
          <div
            className="fixed top-0 right-0 h-screen flex flex-col"
            style={{
              width: '24rem',
              background: '#1a1c29',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
              padding: '1.75rem',
              animation: 'slideInRight 0.25s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-white">Detalle de Orden #49201</h2>
                <button
                  type="button"
                  className="border-none bg-transparent cursor-pointer rounded-lg transition-colors hover:bg-white/10"
                  style={{ color: '#94a3b8', padding: '0.4rem' }}
                  onClick={() => setDrawerPago(null)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>close</span>
                </button>
              </div>
              <div className="flex items-center gap-3" style={{ marginTop: '0.75rem' }}>
                <span
                  className="text-xs font-bold rounded-full"
                  style={{
                    padding: '0.25rem 0.7rem',
                    background: drawerPago.estadoColor === 'emerald' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                    color: drawerPago.estadoColor === 'emerald' ? '#34d399' : '#ef4444',
                  }}
                >
                  {drawerPago.estado}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap" style={{ marginTop: '0.75rem' }}>
                <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{drawerPago.mesa}</span>
                <span style={{ color: '#1e293b' }}>|</span>
                <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>Mozo: Carlos</span>
                <span style={{ color: '#1e293b' }}>|</span>
                <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{drawerPago.hora}</span>
              </div>
            </div>

            {/* Ticket */}
            <div className="rounded-xl flex-1 overflow-y-auto" style={{ background: '#13151f', padding: '1.25rem', marginTop: '1.5rem' }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b', marginBottom: '1rem' }}>Detalle de consumo</p>

              {/* Items */}
              <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#cbd5e1' }}>2x Pinta IPA</span>
                  <span className="text-sm font-medium text-white">$10.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#cbd5e1' }}>1x Hamburguesa Bacon</span>
                  <span className="text-sm font-medium text-white">$10.000</span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px dashed #1e293b', margin: '1rem 0' }} />

              {/* Subtotals */}
              <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#94a3b8' }}>Subtotal</span>
                  <span className="text-sm font-medium text-white">{drawerPago.consumo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#94a3b8' }}>Propina (10%)</span>
                  <span className="text-sm font-medium" style={{ color: '#f59e0b' }}>{drawerPago.propina}</span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid #1e293b', margin: '1rem 0' }} />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-white">Total Pagado</span>
                <span className="text-xl font-black" style={{ color: '#13eca7' }}>{drawerPago.total}</span>
              </div>

              {/* Payment method */}
              <div style={{ marginTop: '1.25rem', borderTop: '1px solid #2a2a2c', paddingTop: '1rem' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                  <span className="material-symbols-outlined" style={{ color: drawerPago.metodoColor, fontSize: '16px' }}>{drawerPago.metodoIcon}</span>
                  <span className="text-xs" style={{ color: '#94a3b8' }}>Método: <span className="text-white font-medium">{drawerPago.metodo}</span></span>
                </div>
                <span className="text-xs" style={{ color: '#64748b' }}>Referencia: MP-9928374</span>
              </div>
            </div>

            {/* Footer buttons */}
            <div style={{ marginTop: '1.5rem' }}>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 text-sm font-bold rounded-xl border-none cursor-pointer transition-all hover:brightness-125"
                style={{ background: '#1a1c29', color: '#cbd5e1', padding: '0.75rem', border: '1px solid #1e293b' }}
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Descargar Comprobante
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 text-sm font-bold rounded-xl border-none cursor-pointer transition-all hover:brightness-125"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', padding: '0.75rem', marginTop: '0.5rem' }}
              >
                <span className="material-symbols-outlined text-sm">undo</span>
                Reembolsar / Anular Pago
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Cierre de Caja ── */}
      {showCierreCaja && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowCierreCaja(false)}
        >
          <div
            className="rounded-2xl w-full flex flex-col"
            style={{ background: '#1a1c29', maxWidth: '28rem', padding: '2rem', border: '1px solid #2a2c3a' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 className="text-xl font-extrabold text-white">Resumen de Arqueo</h2>
              <p className="text-sm" style={{ color: '#94a3b8', marginTop: '0.25rem' }}>Turno Noche — Caja 1</p>
            </div>

            {/* Totals cards */}
            <div className="flex flex-col" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="flex items-center justify-between rounded-xl" style={{ background: '#13151f', padding: '1rem 1.25rem' }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ color: '#34d399', fontSize: '22px' }}>payments</span>
                  <span className="text-sm font-medium" style={{ color: '#cbd5e1' }}>Efectivo a rendir (Caja Física)</span>
                </div>
                <span className="text-lg font-black" style={{ color: '#34d399' }}>$15.000</span>
              </div>

              <div className="flex items-center justify-between rounded-xl" style={{ background: '#13151f', padding: '1rem 1.25rem' }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '22px' }}>credit_card</span>
                  <span className="text-sm font-medium" style={{ color: '#cbd5e1' }}>Digital (Mercado Pago / Transf)</span>
                </div>
                <span className="text-lg font-black text-white">$74.500</span>
              </div>

              <div className="flex items-center justify-between rounded-xl" style={{ background: '#13151f', padding: '1rem 1.25rem' }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '22px' }}>volunteer_activism</span>
                  <span className="text-sm font-medium" style={{ color: '#cbd5e1' }}>Propinas a repartir</span>
                </div>
                <span className="text-lg font-black" style={{ color: '#f59e0b' }}>$3.500</span>
              </div>

              <div className="flex items-center justify-between rounded-xl" style={{ background: '#13151f', padding: '1rem 1.25rem', border: '1px solid rgba(19,236,167,0.2)' }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ color: '#13eca7', fontSize: '22px' }}>account_balance_wallet</span>
                  <span className="text-sm font-bold text-white">Total Facturado</span>
                </div>
                <span className="text-xl font-black" style={{ color: '#13eca7' }}>$93.000</span>
              </div>
            </div>

            {/* Info alert */}
            <div className="rounded-xl" style={{ background: 'rgba(30,58,138,0.2)', border: '1px solid rgba(59,130,246,0.2)', padding: '1rem', marginBottom: '1.75rem' }}>
              <p className="text-xs leading-relaxed" style={{ color: '#93c5fd' }}>
                <span className="material-symbols-outlined align-middle" style={{ fontSize: '16px', marginRight: '0.4rem' }}>info</span>
                Al confirmar, se cerrará la sesión actual y se enviará un reporte automático de WhatsApp al administrador.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="text-sm font-bold rounded-xl border-none cursor-pointer transition-all hover:brightness-125"
                style={{ background: 'transparent', color: '#94a3b8', padding: '0.7rem 1.25rem' }}
                onClick={() => setShowCierreCaja(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold rounded-xl border-none cursor-pointer transition-all hover:brightness-110"
                style={{ background: '#dc2626', color: '#fff', padding: '0.7rem 1.25rem' }}
                onClick={() => setShowCierreCaja(false)}
              >
                <span className="material-symbols-outlined text-sm">lock</span>
                Confirmar Cierre e Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
