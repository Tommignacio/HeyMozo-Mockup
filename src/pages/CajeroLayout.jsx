import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getCurrentTime() {
  return new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
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

export default function CajeroLayout({ mesa6Status, setMesa6Status }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(getCurrentTime);
  const [activeTab, setActiveTab] = useState('transferencias');
  const [avatarOpen, setAvatarOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(getCurrentTime()), 30000);
    return () => clearInterval(id);
  }, []);

  const hasPending = mesa6Status === 'WAITING';
  const pendingCount = hasPending ? 1 : 0;
/* ── Acciones: Transferencias pendientes + métricas del turno ── */
  const monitorEnVivoContent = (
    <div className="flex flex-col" style={{ gap: '2rem' }}>
      <h2 className="text-lg font-bold flex items-center gap-2">
        <span>⏳ Transferencias Pendientes</span>
      </h2>

      {/* Metric strip mobile — compact 3-col */}
      <div className="md:hidden grid grid-cols-3 gap-2">
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(19,236,167,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#13eca7', fontSize: '16px' }}>payments</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Total Caja</p>
            <p className="text-base font-black leading-tight" style={{ color: '#13eca7' }}>$142.500</p>
          </div>
        </div>
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(59,130,246,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '16px' }}>receipt_long</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Transacciones</p>
            <p className="text-base font-black text-white leading-tight">24</p>
          </div>
        </div>
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(168,85,247,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#a855f7', fontSize: '16px' }}>table_bar</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Mesas Activas</p>
            <p className="text-base font-black text-white leading-tight">4 / 6</p>
          </div>
        </div>
      </div>
      {/* Metric strip desktop — large cards */}
      <div className="hidden md:grid grid-cols-3" style={{ gap: '1.5rem' }}>
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(19,236,167,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Total Caja</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black leading-none" style={{ color: '#13eca7' }}>$142.500</span>
            <div className="flex flex-col mb-1">
              <span className="material-symbols-outlined" style={{ color: '#13eca7' }}>payments</span>
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Del turno</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(59,130,246,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Transacciones</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black text-white leading-none">24</span>
            <div className="flex flex-col mb-1">
              <span className="material-symbols-outlined" style={{ color: '#60a5fa' }}>receipt_long</span>
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Pagos procesados</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(168,85,247,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Mesas Activas</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black text-white leading-none">4</span>
            <div className="flex flex-col mb-1">
              <span className="material-symbols-outlined" style={{ color: '#a855f7' }}>table_bar</span>
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>de 6 totales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transferencias Pendientes content */}
      <div>

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
          <h2 className="text-xl sm:text-2xl font-extrabold text-white" style={{ padding: '1rem 0rem 0rem 1rem' }}>Base de Datos de Clientes</h2>
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

      {/* Metric cards mobile — compact 3-col */}
      <div className="md:hidden grid grid-cols-3 gap-2" style={{ padding: '0.5rem' }}>
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(16,185,129,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: '16px' }}>group</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Total</p>
            <p className="text-base font-black text-white leading-tight">1.245</p>
          </div>
        </div>
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(96,165,250,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '16px' }}>trending_up</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Nuevos</p>
            <p className="text-base font-black leading-tight" style={{ color: '#60a5fa' }}>+42</p>
          </div>
        </div>
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(245,158,11,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '16px' }}>redeem</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Regalos</p>
            <p className="text-base font-black leading-tight" style={{ color: '#f59e0b' }}>18</p>
          </div>
        </div>
      </div>
      {/* Metric cards desktop — large cards */}
      <div className="hidden md:grid grid-cols-3" style={{ gap: '1.5rem' }}>
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(16,185,129,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Total Clientes</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black text-white leading-none">1.245</span>
            <div className="flex flex-col mb-1">
              <span className="material-symbols-outlined" style={{ color: '#10b981' }}>group</span>
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Registrados</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(96,165,250,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Nuevos este mes</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black leading-none" style={{ color: '#60a5fa' }}>+42</span>
            <div className="flex flex-col mb-1">
              <span className="material-symbols-outlined" style={{ color: '#60a5fa' }}>trending_up</span>
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Este mes</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(245,158,11,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Regalos Pendientes</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black leading-none" style={{ color: '#f59e0b' }}>18</span>
            <div className="flex flex-col mb-1">
              <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>redeem</span>
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Por entregar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Export mobile */}
      <div className="flex flex-col" style={{ gap: '0.5rem', padding: '0rem 1rem' }}>
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
      <div className="block md:hidden flex flex-col" style={{ gap: '1rem', padding: '1rem' }}>
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

        {/* Export button — mobile only */}
        <button
          type="button"
          className="sm:hidden flex items-center justify-center gap-2 font-bold text-sm rounded-xl border-none cursor-pointer hover:brightness-110 transition-all w-full"
          style={{ background: '#7c3aed', color: '#fff', padding: '0.85rem 1.25rem', marginTop: '1rem' }}
        >
          <span className="material-symbols-outlined text-sm">download</span>
          📥 Exportar a Excel (CSV)
        </button>

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
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [showCierreCaja, setShowCierreCaja] = useState(false);
  const [drawerPago, setDrawerPago] = useState(null);
  const [promoReview, setPromoReview] = useState(null);
  const [quejaReview, setQuejaReview] = useState(null);

  const historialContent = (
    <div className="flex flex-col" style={{ gap: '1.5rem' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between" style={{ gap: '0.75rem' }}>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white" style={{ padding: '1rem 0rem 0rem 1rem' }}>Historial de Pagos</h2>
        </div>
      </div>

      {/* Totales del Turno — mobile only, 3 cards */}
      <div className="md:hidden grid grid-cols-3 gap-2">
        {/* Consumo */}
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(96,165,250,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '16px' }}>restaurant_menu</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Consumo</p>
            <p className="text-base font-black text-white leading-tight">$89.500</p>
          </div>
        </div>
        {/* Propinas */}
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(245,158,11,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '16px' }}>volunteer_activism</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Propinas</p>
            <p className="text-base font-black leading-tight" style={{ color: '#f59e0b' }}>$3.500</p>
          </div>
        </div>
        {/* Total Caja */}
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(52,211,153,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#34d399', fontSize: '16px' }}>payments</span>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Total Caja</p>
            <p className="text-base font-black leading-tight" style={{ color: '#34d399' }}>$93.000</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-row items-center gap-3 md:gap-4" style={{ marginTop: '0.5rem' }}>
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

        {/* Mobile: dropdown button */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setFilterDropdownOpen((o) => !o)}
            className="flex items-center gap-1 text-sm font-bold rounded-xl border-none cursor-pointer whitespace-nowrap"
            style={{
              background: historialFilter !== 'todos' ? 'rgba(16,185,129,0.15)' : '#1a1c29',
              border: historialFilter !== 'todos' ? '1px solid rgba(16,185,129,0.3)' : '1px solid #1e293b',
              color: historialFilter !== 'todos' ? '#34d399' : '#94a3b8',
              padding: '0.6rem 0.85rem',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>filter_list</span>
            {historialFilter === 'todos' ? 'Filtrar' : historialFilter}
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '16px', transition: 'transform 0.2s', transform: filterDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >expand_more</span>
          </button>
          {filterDropdownOpen && (
            <div
              className="absolute right-0 z-20 rounded-xl overflow-hidden"
              style={{ background: '#1a1c29', border: '1px solid #1e293b', top: 'calc(100% + 0.5rem)', minWidth: '11rem', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
            >
              {['todos', 'Mercado Pago', 'Transferencia', 'Efectivo'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setHistorialFilter(f); setFilterDropdownOpen(false); }}
                  className="w-full text-left text-sm font-medium border-none cursor-pointer transition-all"
                  style={{
                    padding: '0.75rem 1rem',
                    background: historialFilter === f ? 'rgba(16,185,129,0.1)' : 'transparent',
                    color: historialFilter === f ? '#34d399' : '#94a3b8',
                  }}
                >
                  {f === 'todos' ? 'Todos' : f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop: pill buttons */}
        <div className="hidden md:flex items-center gap-2">
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

        {/* Desktop Totals — large cards */}
        <div className="hidden md:grid grid-cols-3" style={{ gap: '1.5rem' }}>
          <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
            <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(96,165,250,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Consumo</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black text-white leading-none">$89.500</span>
              <div className="flex flex-col mb-1">
                <span className="material-symbols-outlined" style={{ color: '#60a5fa' }}>restaurant_menu</span>
                <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Del turno</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
            <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(245,158,11,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Propinas</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black leading-none" style={{ color: '#f59e0b' }}>$3.500</span>
              <div className="flex flex-col mb-1">
                <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>volunteer_activism</span>
                <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Del turno</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
            <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(52,211,153,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Total Caja</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black leading-none" style={{ color: '#34d399' }}>$93.000</span>
              <div className="flex flex-col mb-1">
                <span className="material-symbols-outlined" style={{ color: '#34d399' }}>payments</span>
                <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Caja final</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cerrar Turno y Caja button — Bottom */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 font-bold text-sm rounded-xl border-none cursor-pointer hover:brightness-110 transition-all w-full"
        style={{ background: '#dc2626', color: '#fff', padding: '0.75rem 1.25rem', marginTop: '2rem' }}
        onClick={() => setShowCierreCaja(true)}
      >
        <span className="material-symbols-outlined text-sm">lock</span>
        Cerrar Turno y Caja
      </button>
    </div>
  );

  /* ── Reseñas section ── */
  const [resenasFilter, setResenasFilter] = useState('todos');

  const REVIEWS_DATA = [
    { stars: 5, time: 'Hoy 21:30', mozo: 'Ana', text: 'Excelente la atención y la birra tirada perfecta.', type: '5star', action: 'promo', platform: 'Google Maps' },
    { stars: 2, time: 'Ayer 20:15', mozo: 'Marcos', text: 'La hamburguesa estaba fría y tardaron mucho en traer la cuenta.', type: 'queja', action: 'queja', platform: null },
    { stars: 5, time: 'Ayer 19:45', mozo: 'Carlos', text: null, type: '5star', action: null, platform: null },
  ];

  const MOZOS_DATA = [
    { name: 'Carlos', rating: 4.8, fill: 96, alert: false },
    { name: 'Ana', rating: 4.5, fill: 90, alert: false },
    { name: 'Marcos', rating: 3.2, fill: 64, alert: true },
  ];

  const filteredReviews = resenasFilter === 'todos' ? REVIEWS_DATA
    : resenasFilter === '5star' ? REVIEWS_DATA.filter(r => r.type === '5star')
    : REVIEWS_DATA.filter(r => r.type === 'queja');

  const resenasContent = (
    <div className="flex flex-col" style={{ gap: '2rem' }}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between" style={{ gap: '1rem' }}>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ padding: '1rem 0rem 0rem 1rem' }}>Reseñas</h2>
        </div>
      </div>

      {/* ── Metric Cards: Mobile (3-col compact grid) ── */}
      <div className="grid grid-cols-3 gap-2 w-full mt-4 md:hidden" style={{ padding: '0.5rem' }}>
        {/* Card 1: Promedio */}
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(251,191,36,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#fbbf24', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
          <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Promedio</p>
          <p className="text-base font-black text-white leading-tight">4.6</p>
        </div>
        {/* Card 2: Google Maps */}
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(96,165,250,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>map</span>
          </div>
          <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>A Google</p>
          <p className="text-base font-black leading-tight" style={{ color: '#60a5fa' }}>45</p>
        </div>
        {/* Card 3: Alertas */}
        <div className="rounded-xl flex flex-col items-center gap-1" style={{ background: '#1a1c29', border: '1px solid #1e293b', padding: '0.65rem 0.5rem' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(255,113,106,0.2)', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ color: '#ff716a', fontSize: '16px' }}>notifications_active</span>
          </div>
          <p className="text-[9px] font-medium leading-tight" style={{ color: '#94a3b8' }}>Alertas</p>
          <p className="text-base font-black leading-tight" style={{ color: '#ff716a' }}>3</p>
        </div>
      </div>

      {/* ── Metric Cards: Desktop/Tablet (full cards grid) ── */}
      <div className="hidden md:grid grid-cols-3" style={{ gap: '1.5rem', padding: '1rem' }}>
        {/* Card 1: Promedio General */}
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem', transition: 'background 0.3s' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(19,236,167,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Promedio General</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black text-white leading-none">4.6</span>
            <div className="flex flex-col mb-1">
              <div className="flex gap-0.5" style={{ color: '#fbbf24' }}>
                {[1,2,3,4].map(i => <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>star_half</span>
              </div>
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>+0.2 vs mes anterior</span>
            </div>
          </div>
        </div>
        {/* Card 2: Google Maps */}
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(96,165,250,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Derivados a Google Maps</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black leading-none" style={{ color: '#60a5fa' }}>45</span>
            <div className="flex flex-col mb-1">
              <span className="material-symbols-outlined" style={{ color: '#60a5fa' }}>map</span>
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Reviews públicas</span>
            </div>
          </div>
        </div>
        {/* Card 3: Alertas */}
        <div className="rounded-2xl relative overflow-hidden" style={{ background: '#1a1c29', padding: '2rem' }}>
          <div className="absolute" style={{ right: '-1rem', top: '-1rem', width: '6rem', height: '6rem', background: 'rgba(255,113,106,0.05)', borderRadius: '50%', filter: 'blur(16px)' }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', marginBottom: '1rem' }}>Alertas Críticas</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-black leading-none" style={{ color: '#ff716a' }}>3</span>
            <div className="flex flex-col mb-1">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ff716a', boxShadow: '0 0 12px #fd4e4d' }} />
              <span className="text-[10px] font-bold" style={{ color: '#64748b' }}>Acción inmediata</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-Column: Ranking (5 cols) + Feed (7 cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: '2.5rem' }}>

        {/* Left: Desempeño por Mozo */}
        <div className="lg:col-span-5 flex flex-col" style={{ gap: '1.5rem', padding: '0.5rem' }}>
          <div className="flex items-center justify-between" style={{ padding: '0 0.5rem' }}>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ color: '#13eca7', fontVariationSettings: "'FILL' 1" }}>badge</span>
              Desempeño por Mozo
            </h3>
            <span className="text-[10px] font-bold uppercase rounded" style={{ background: '#1e293b', color: '#94a3b8', padding: '0.25rem 0.5rem' }}>Ranking Live</span>
          </div>
          <div className="flex flex-col" style={{ gap: '1rem' }}>
            {MOZOS_DATA.map((mozo) => (
              <div
                key={mozo.name}
                className="flex flex-col rounded-2xl py-3 px-4 md:py-5 md:px-5"
                style={{
                  background: '#222532',
                  gap: '0.75rem',
                  border: mozo.alert ? '1px solid rgba(255,113,106,0.2)' : '1px solid transparent',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#282b3a', border: '1px solid rgba(70,71,82,0.1)', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ color: mozo.alert ? '#ff716a' : '#13eca7', fontSize: '20px' }}>person</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{mozo.name}</p>
                      <p className="text-[11px] flex items-center gap-1" style={{ color: mozo.alert ? '#ff716a' : '#fbbf24' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        {mozo.rating} Estrellas
                      </p>
                    </div>
                  </div>
                  {mozo.alert ? (
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-black" style={{ color: '#ff716a' }}>{mozo.fill}%</span>
                      <span className="text-[9px] font-bold uppercase rounded border" style={{ padding: '0.1rem 0.4rem', color: '#ff716a', background: 'rgba(255,113,106,0.1)', borderColor: 'rgba(255,113,106,0.2)' }}>Requiere atención</span>
                    </div>
                  ) : (
                    <span className="text-sm font-black" style={{ color: '#13eca7' }}>{mozo.fill}%</span>
                  )}
                </div>
                <div className="w-full rounded-full overflow-hidden" style={{ height: '6px', background: '#282b3a' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${mozo.fill}%`,
                      background: mozo.alert
                        ? '#ff716a'
                        : mozo.fill >= 95
                          ? 'linear-gradient(to right, #06b77f, #13eca7)'
                          : 'linear-gradient(to right, #06b77f, #58e7ab)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Últimos Comentarios */}
        <div className="lg:col-span-7 rounded-xl flex flex-col" style={{ background: '#1a1c29', padding: '1.25rem' }}>
          {/* Feed header + filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between" style={{ marginBottom: '1.5rem', gap: '0.75rem' }}>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ color: '#60a5fa', fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              ÚLTIMOS COMENTARIOS (Feed Activo)
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'todos', label: 'Todos' },
                { key: '5star', label: '⭐⭐⭐⭐⭐ (Buenas)' },
                { key: 'queja', label: '⭐ (Quejas)' },
              ].map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setResenasFilter(f.key)}
                  className="text-[11px] font-bold rounded-full border-none cursor-pointer transition-all"
                  style={{
                    padding: '0.35rem 1rem',
                    background: resenasFilter === f.key ? '#13eca7' : '#1c1f2b',
                    color: resenasFilter === f.key ? '#005a3c' : '#94a3b8',
                    boxShadow: resenasFilter === f.key ? '0 4px 12px rgba(19,236,167,0.2)' : 'none',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Review cards */}
          <div className="flex flex-col" style={{ gap: '1.25rem' }}>
            {filteredReviews.map((review, i) => (
              <div
                key={i}
                className="rounded-xl transition-colors"
                style={{
                  background: 'rgba(34,37,50,0.4)',
                  border: '1px solid rgba(70,71,82,0.1)',
                  padding: '1.25rem',
                  opacity: review.text === null ? 0.7 : 1,
                }}
              >
                <div className="flex items-start justify-between" style={{ marginBottom: '1rem' }}>
                  <div className="flex flex-col gap-1">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <span
                          key={s}
                          className="material-symbols-outlined text-sm"
                          style={{
                            fontVariationSettings: s <= review.stars ? "'FILL' 1" : "'FILL' 0",
                            color: review.stars >= 4 ? '#fbbf24' : (s <= review.stars ? '#ff716a' : '#374151'),
                          }}
                        >star</span>
                      ))}
                    </div>
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>
                      <span>{review.time}</span>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#464752', display: 'inline-block' }} />
                      <span>Mozo: <strong className="text-white">{review.mozo}</strong></span>
                    </div>
                  </div>
                  {/* Platform tag or feedback tag */}
                  {review.type === 'queja' ? (
                    <span className="text-[10px] font-black uppercase rounded border" style={{ padding: '0.25rem 0.5rem', color: '#ff716a', background: 'rgba(255,113,106,0.1)', borderColor: 'rgba(255,113,106,0.2)' }}>
                      ⚠️ Feedback Privado
                    </span>
                  ) : review.platform && (
                    <button type="button" className="border-none cursor-pointer rounded transition-colors text-[10px] font-bold flex items-center gap-1" style={{ background: 'rgba(28,31,43,0.5)', color: '#94a3b8', padding: '0.25rem 0.5rem' }}>
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {review.platform} (Ver original)
                    </button>
                  )}
                </div>

                <div className="flex items-end justify-between gap-4">
                  <p className="italic text-sm font-medium flex-1" style={{ color: review.text ? '#cbd5e1' : '#94a3b8', lineHeight: 1.6 }}>
                    {review.text ? `"${review.text}"` : '(Sin comentario)'}
                  </p>
                  {review.action && (
                    <div className="flex items-center gap-2">
                      {review.action === 'promo' ? (
                        <button
                          type="button"
                          className="flex items-center gap-2 text-[10px] font-black uppercase rounded-lg border-none cursor-pointer transition-transform hover:scale-[1.02]"
                          style={{ background: '#13eca7', color: '#005a3c', padding: '0.5rem 1rem', boxShadow: '0 4px 12px rgba(19,236,167,0.2)' }}
                          onClick={() => setPromoReview(review)}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>campaign</span>
                          Crear Promo Social
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex items-center gap-2 text-[10px] font-black uppercase rounded-lg border-none cursor-pointer transition-transform hover:scale-[1.02]"
                          style={{ background: '#ff716a', color: '#490005', padding: '0.5rem 1rem', boxShadow: '0 4px 12px rgba(253,78,77,0.2)' }}
                          onClick={() => setQuejaReview(review)}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>reply</span>
                          Gestionar Queja
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden font-['Inter',sans-serif] text-slate-100" style={{ background: '#0f111a' }}>

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
          <div className="flex items-center gap-2 md:gap-6">
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
              className="flex items-center gap-1 md:gap-3 text-slate-400 font-mono rounded-lg md:rounded-xl text-sm md:text-lg px-2.5 py-1.5 md:px-4 md:py-2"
              style={{ background: '#1a1c29', border: '1px solid #1e293b' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
              <span>{time}</span>
            </div>
            {/* Avatar — nav dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                className="border-none cursor-pointer p-0"
                style={{ background: 'transparent' }}
                onClick={() => setAvatarOpen((v) => !v)}
              >
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full p-0.5" style={{ background: 'linear-gradient(to top right, #13eca7, #34d399)' }}>
                  <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#1a1c29' }}>
                    <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '16px' }}>person</span>
                  </div>
                </div>
              </button>
              {avatarOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 rounded-2xl overflow-hidden" style={{ background: '#1a1c29', border: '1px solid #1e293b', minWidth: '180px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] font-semibold text-white flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none font-[inherit]"
                      style={{ transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      onClick={() => { setAvatarOpen(false); navigate('/mozo'); }}
                    >
                      Vista Mozo
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#64748b' }}>table_bar</span>
                    </button>
                    <div style={{ borderTop: '1px solid #1e293b' }} />
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] font-semibold text-white flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none font-[inherit]"
                      style={{ transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      onClick={() => { setAvatarOpen(false); navigate('/cliente'); }}
                    >
                      Vista Cliente
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#64748b' }}>smartphone</span>
                    </button>
                    <div style={{ borderTop: '1px solid #1e293b' }} />
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] font-semibold flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none font-[inherit]"
                      style={{ color: '#ef4444', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      onClick={() => { setAvatarOpen(false); sessionStorage.clear(); window.location.reload(); }}
                    >
                      Reiniciar Demo
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#ef4444' }}>restart_alt</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Body: Sidebar (desktop) + Content ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* ── Desktop Sidebar ── */}
        <aside
          className="hidden lg:flex flex-col w-[240px] shrink-0 py-6 px-4 gap-2"
          style={{ background: '#13151f', borderRight: '1px solid #1e293b' }}
        >
          <SidebarItem
            icon="bolt"
            label="Acciones"
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
            label="Reseñas"
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
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 pb-6 lg:pb-12">
          {/* Active section content */}
          {activeTab === 'transferencias' && monitorEnVivoContent}
          {activeTab === 'monitor' && historialContent}
          {activeTab === 'resenas' && resenasContent}
          {activeTab === 'club' && clubContent}
        </main>
      </div>

      {/* ── Bottom Nav (mobile only) — Transferencias / Monitor ── */}
      <div
        className="shrink-0 w-full lg:hidden flex justify-around px-6 py-4 z-50"
        style={{ background: '#1a1c29', borderTop: '1px solid #1e293b' }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('transferencias')}
          className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer relative"
        >
          <span className="material-symbols-outlined" style={{ color: activeTab === 'transferencias' ? '#13eca7' : '#64748b' }}>bolt</span>
          <span className="text-[10px] font-bold" style={{ color: activeTab === 'transferencias' ? '#13eca7' : '#64748b' }}>Acciones</span>
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

      {/* ── Modal: Gestionar Queja ── */}
      {quejaReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
          onClick={() => setQuejaReview(null)}
        >
          <div
            className="rounded-2xl flex flex-col w-full"
            style={{ background: '#1a1c29', maxWidth: '24rem', padding: '1.25rem', margin: '1rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between" style={{ marginBottom: '1.25rem' }}>
              <div>
                <h3 className="text-base font-bold text-white">Gestionar Alerta Crítica</h3>
                <p className="text-xs" style={{ color: '#94a3b8', marginTop: '0.2rem' }}>
                  Resolviendo queja de <span className="font-bold text-white">Mesa 4</span> · {quejaReview.time}
                </p>
              </div>
              <button type="button" className="border-none bg-transparent cursor-pointer" style={{ color: '#64748b' }} onClick={() => setQuejaReview(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Textarea */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>
                Registro de Acción Tomada <span style={{ color: '#64748b', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(¿Cómo se solucionó?)</span>
              </label>
              <textarea
                rows={5}
                placeholder="Ej: Fui a la mesa, pedí disculpas y les invité el postre."
                className="w-full text-sm text-white placeholder-slate-600 border-none outline-none resize-none"
                style={{ background: '#13151f', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '0.85rem 1rem', lineHeight: 1.6 }}
              />
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end" style={{ gap: '0.75rem' }}>
              <button
                type="button"
                className="text-sm font-bold rounded-xl border-none cursor-pointer transition-all hover:brightness-125"
                style={{ background: 'transparent', color: '#94a3b8', padding: '0.65rem 1.1rem' }}
                onClick={() => setQuejaReview(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold rounded-xl border-none cursor-pointer transition-all hover:brightness-110"
                style={{ background: '#13eca7', color: '#003d28', padding: '0.65rem 1.1rem', boxShadow: '0 4px 16px rgba(19,236,167,0.2)' }}
                onClick={() => setQuejaReview(null)}
              >
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Marcar como Resuelto &amp; Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Crear Promo Social ── */}
      {promoReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
          onClick={() => setPromoReview(null)}
        >
          <div
            className="rounded-2xl flex flex-col w-full"
            style={{ background: '#1a1c29', maxWidth: '28rem', padding: '1.5rem', margin: '1rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 className="text-lg font-bold text-white">Compartir Testimonio</h3>
              <p className="text-sm" style={{ color: '#94a3b8', marginTop: '0.25rem' }}>
                Creando Promo Social para <span className="font-bold text-white">{promoReview.mozo}</span>
              </p>
            </div>

            {/* Branded template — square 1:1 */}
            <div
              className="w-full flex flex-col items-center justify-between rounded-2xl relative overflow-hidden"
              style={{
                aspectRatio: '1 / 1',
                background: 'linear-gradient(135deg, #0f111a 0%, #1a2e1a 50%, #0f1f1a 100%)',
                border: '1px solid rgba(19,236,167,0.2)',
                padding: '2rem',
                marginBottom: '1.25rem',
              }}
            >
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(19,236,167,0.08) 0%, transparent 70%)' }} />

              {/* Top: HeyMozo branding */}
              <div className="flex items-center gap-2 self-start relative z-10">
                <div className="flex items-center justify-center rounded-lg" style={{ width: '28px', height: '28px', background: '#13eca7' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#003d28', fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-tight leading-none">HeyMozo</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'rgba(19,236,167,0.7)' }}>Testimonio Verificado</p>
                </div>
              </div>

              {/* Center: Stars + quote */}
              <div className="flex flex-col items-center text-center relative z-10" style={{ gap: '1rem' }}>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} style={{ color: '#fbbf24', fontSize: '1.75rem' }}>★</span>
                  ))}
                </div>
                <p
                  className="italic font-semibold"
                  style={{
                    color: '#e2e8f0',
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    fontFamily: 'Georgia, serif',
                    maxWidth: '18rem',
                  }}
                >
                  &ldquo;{promoReview.text}&rdquo;
                </p>
              </div>

              {/* Bottom: Mozo + divider */}
              <div className="flex items-center gap-2 self-center relative z-10">
                <div className="flex items-center justify-center rounded-full" style={{ width: '32px', height: '32px', background: 'rgba(19,236,167,0.15)', border: '1px solid rgba(19,236,167,0.3)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#13eca7' }}>person</span>
                </div>
                <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>Mozo: <span className="text-white">{promoReview.mozo}</span></span>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end" style={{ gap: '0.75rem' }}>
              <button
                type="button"
                className="text-sm font-bold rounded-xl border-none cursor-pointer transition-all hover:brightness-125"
                style={{ background: 'transparent', color: '#94a3b8', padding: '0.7rem 1.25rem' }}
                onClick={() => setPromoReview(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold rounded-xl border-none cursor-pointer transition-all hover:brightness-110"
                style={{ background: '#13eca7', color: '#003d28', padding: '0.7rem 1.25rem', boxShadow: '0 4px 16px rgba(19,236,167,0.25)' }}
              >
                <span className="material-symbols-outlined text-sm">campaign</span>
                Descargar Imagen para Social (1:1)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
