import { useState } from 'react';
import MesaCard from '../components/MesaCard';

const staticMesasRest = [
  { number: '6',  variant: 'libre',  icon: 'table', status: 'Libre'                                  },
  { number: '7',  variant: 'libre',  icon: 'table', status: 'Libre'                                  },
  { number: '8',  variant: 'libre',  icon: 'table', status: 'Libre'                                  },
  { number: '9',  variant: 'libre',  icon: 'table', status: 'Libre'                                  },
  { number: '10', variant: 'libre',  icon: 'table', status: 'Libre'                                  },
  { number: '11', variant: 'libre',  icon: 'table', status: 'Libre'                                  },
  { number: '12', variant: 'libre',  icon: 'table', status: 'Libre'                                  },
];

const mesaHistory = {
  '1': [
    { event: 'Pidió la cuenta (tarjeta)', time: 'Hace 2 min' },
    { event: 'Llamó al mozo',             time: 'Hace 12 min', icon: 'bell' },
    { event: 'Se sentó',                  time: 'Hace 47 min' },
  ],
  '2': [
    { event: 'Pidió la cuenta (efectivo)', time: 'Hace 1 min' },
    { event: 'Llamó al mozo',              time: 'Hace 9 min',  icon: 'bell' },
    { event: 'Se sentó',                   time: 'Hace 31 min' },
  ],
  '3': [
    { event: 'Cuenta cobrada (MP)',   time: 'Hace 5 min' },
    { event: 'Pidió la cuenta',       time: 'Hace 8 min' },
    { event: 'Llamó al mozo',         time: 'Hace 22 min', icon: 'bell' },
    { event: 'Se sentó',              time: 'Hace 65 min' },
  ],
  '5': [
    { event: 'Llamó al mozo', time: 'Hace 4 min', icon: 'bell', emoji: '🧊' },
    { event: 'Se sentó',      time: 'Hace 18 min' },
  ],
  '4': [
    { event: 'Nuevo pedido (x3)', time: 'Hace 1 min' },
    { event: 'Se sentó',          time: 'Hace 10 min' },
  ],
};

const variantHeaderColor = {
  red:      '#d62d20',
  orange:   '#f07020',
  yellow:   '#f5c518',
  paid:     '#30d158',
  occupied: '#0a84ff',
  purple:   '#9333ea',
};

function getMesa3Card(released) {
  if (!released) return { number: '3', variant: 'paid',  icon: 'check-circle', status: 'Cobrado (MP)', time: '5 MIN' };
  return              { number: '3', variant: 'libre', icon: 'table',        status: 'Libre'            };
}

function getMesa1Card(status) {
  if (status === 'PENDING') return { number: '1', variant: 'red',   icon: 'receipt',      status: 'Cuenta: Tarjeta',   time: '2 MIN' };
  if (status === 'PAID')    return { number: '1', variant: 'paid',  icon: 'check-circle', status: 'Cobrado', time: '2 MIN' };
  return                           { number: '1', variant: 'libre', icon: 'table',        status: 'Libre' };
}

function getMesa2Card(status) {
  if (status === 'PENDING') return { number: '2', variant: 'red',   icon: 'receipt',      status: 'Cuenta: Efectivo',   time: '1 MIN' };
  if (status === 'PAID')    return { number: '2', variant: 'paid',  icon: 'check-circle', status: 'Cobrado', time: '1 MIN' };
  return                           { number: '2', variant: 'libre', icon: 'table',        status: 'Libre' };
}

function getMesa5Card(released) {
  if (!released) return { number: '5', variant: 'orange', icon: 'bell', status: 'Llama Mozo', time: '4m', badgeCount: 1 };
  return              { number: '5', variant: 'libre',  icon: 'table', status: 'Libre' };
}

function getMesa4Card(status) {
  if (status === 'NEW_ORDER') return { number: '4', variant: 'purple',   icon: 'cart',   status: 'Nuevo Pedido', time: '1 MIN', badgeCount: 3 };
  if (status === 'COOKING')   return { number: '4', variant: 'purple',   icon: 'cart',    status: 'Cocinando', time: '3 MIN' };
  if (status === 'OCCUPIED')  return { number: '4', variant: 'occupied', icon: 'person',  status: 'Ocupada', time: '10 MIN' };
  return                             { number: '4', variant: 'libre',    icon: 'table',   status: 'Libre' };
}

const eventIconColors = {
  receipt: '#d62d20',
  bell:    '#f07020',
  clock:   '#0a84ff',
  cart:    '#9333ea',
  paid:    '#30d158',
};

function TimelineIcon({ type = 'clock' }) {
  const bg = eventIconColors[type] ?? eventIconColors.clock;
  return (
    <div className="relative w-10 h-10 shrink-0">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
        {type === 'receipt' && (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        )}
        {type === 'bell' && (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        )}
        {type === 'clock' && (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
          </svg>
        )}
        {type === 'cart' && (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
        )}
        {type === 'paid' && (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z" />
          </svg>
        )}
      </div>
      {/* Mini clock badge */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0a84ff] flex items-center justify-center border-2 border-[#11131e]">
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
        </svg>
      </div>
    </div>
  );
}

function getEventIconType(ev) {
  if (ev.icon === 'bell') return 'bell';
  if (ev.event.toLowerCase().includes('cuenta') || ev.event.toLowerCase().includes('cobrad')) return 'receipt';
  if (ev.event.toLowerCase().includes('pedido')) return 'cart';
  if (ev.event.toLowerCase().includes('cobrad') || ev.event.toLowerCase().includes('pagó')) return 'paid';
  return 'clock';
}

export default function MisMesasPage({
  mesa1Status = 'PENDING', setMesa1Status,
  mesa2Status = 'PENDING', setMesa2Status,
  mesa3Released = false,   setMesa3Released,
  mesa4Status = 'NEW_ORDER', setMesa4Status,
}) {
  const [modal, setModal] = useState(null);
  const [mesa5Released, setMesa5Released] = useState(false);
  const mesas = [getMesa1Card(mesa1Status), getMesa2Card(mesa2Status), getMesa3Card(mesa3Released), getMesa4Card(mesa4Status), getMesa5Card(mesa5Released), ...staticMesasRest];

  const getReleaseAction = (mesa) => {
    if (mesa.number === '1') return () => setMesa1Status?.('GONE');
    if (mesa.number === '2') return () => setMesa2Status?.('GONE');
    if (mesa.number === '3') return () => setMesa3Released?.(true);
    if (mesa.number === '4') return () => setMesa4Status?.('GONE');
    if (mesa.number === '5') return () => setMesa5Released(true);
    return null;
  };

  const handleMesaClick = (mesa) => {
    if (mesa.variant === 'libre') return;
    setModal({ type: 'action', mesa });
  };

  const handleConfirmRelease = () => {
    getReleaseAction(modal.mesa)?.();
    setModal(null);
  };

  const headerColor = modal ? (variantHeaderColor[modal.mesa.variant] ?? '#3a3a3c') : '#3a3a3c';

  return (
    <div className="px-3 pt-2 pb-6 lg:px-8 lg:pb-8">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {mesas.map((mesa) => (
          <MesaCard key={mesa.number} {...mesa} onClick={() => handleMesaClick(mesa)} />
        ))}
      </div>

      {/* ── Action popup ── */}
      {modal?.type === 'action' && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="bg-[#11131e] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden transform transition-all animate-[modal-in_0.25s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">

            {/* Header */}
            <div className="flex items-center justify-between relative" style={{ padding: '26px', background: headerColor }}>
              <div>
                <div className="text-white text-2xl font-bold tracking-wide">MESA {modal.mesa.number}</div>
                <div className="text-white/80 text-sm font-medium mt-0.5">Historial de Mesa</div>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold cursor-pointer border-none"
                onClick={() => setModal(null)}
              >
                ✕
              </button>
            </div>

            {/* Timeline */}
            <div className="max-h-[50vh] overflow-y-auto" style={{ padding: '20px 24px' }}>
              {(mesaHistory[modal.mesa.number] ?? []).map((ev, i, arr) => {
                const iconType = getEventIconType(ev);
                const isLast = i === arr.length - 1;
                return (
                  <div key={i} className="flex gap-4" style={{ padding: '6px 0' }}>
                    {/* Icon column with vertical line */}
                    <div className="flex flex-col items-center">
                      <TimelineIcon type={iconType} />
                      {!isLast && <div className="w-0.5 flex-1 bg-gray-700 mt-2" />}
                    </div>
                    {/* Event info */}
                    <div className="flex-1 min-w-0 pt-2 pb-4">
                      <div className="text-white font-semibold text-[15px] leading-tight">{ev.event}</div>
                      <div className="text-gray-500 text-xs mt-1">{ev.time}</div>
                    </div>
                    {ev.emoji && (
                      <div className="text-[22px] leading-none shrink-0 pt-2">{ev.emoji}</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action button */}
            {modal.mesa.variant !== 'libre' && getReleaseAction(modal.mesa) && (
              <div className="pb-8 sm:pb-4" style={{ margin: '16px', padding: '15px' }}>
                <button
                  type="button"
                  className="bg-white rounded-full w-full font-bold text-lg cursor-pointer border-none transition-transform active:scale-95"
                  style={{ padding: '9px', color: headerColor }}
                  onClick={() => setModal({ type: 'confirm', mesa: modal.mesa })}
                >
                  LIBERAR MESA
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Confirm popup ── */}
      {modal?.type === 'confirm' && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setModal({ type: 'action', mesa: modal.mesa })}
        >
          <div className="bg-[#11131e] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden transform transition-all animate-[modal-in_0.25s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">

            {/* Header */}
            <div className="flex items-center justify-between relative" style={{ padding: '26px', background: headerColor }}>
              <div className="text-white text-2xl font-bold tracking-wide">Confirmar</div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold cursor-pointer border-none"
                onClick={() => setModal({ type: 'action', mesa: modal.mesa })}
              >
                ✕
              </button>
            </div>

            {/* Confirmation body */}
            <div className="flex flex-col items-center justify-center text-center" style={{ padding: '48px 24px' }}>
              <div className="text-2xl font-bold text-white leading-tight">
                ¿LIBERAR<br />MESA {modal.mesa.number}?
              </div>
              <div className="text-sm text-gray-500 mt-3 leading-snug">
                La mesa quedará marcada como libre
              </div>
            </div>

            {/* Buttons */}
            <div className="pb-8 sm:pb-4" style={{ margin: '16px', padding: '15px' }}>
              <button
                type="button"
                className="bg-white rounded-full w-full font-bold text-lg cursor-pointer border-none transition-transform active:scale-95"
                style={{ padding: '9px', color: headerColor }}
                onClick={handleConfirmRelease}
              >
                CONFIRMAR
              </button>
              <button
                type="button"
                className="w-full text-center text-sm font-medium text-gray-500 cursor-pointer bg-transparent border-none mt-3"
                style={{ padding: '8px' }}
                onClick={() => setModal({ type: 'action', mesa: modal.mesa })}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
