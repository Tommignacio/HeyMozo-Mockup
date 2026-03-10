import { useState } from 'react';
import MesaCard from '../components/MesaCard';

const staticMesas = [
  { number: '4',  variant: 'libre',  icon: 'table', status: 'Libre'                                  },
  { number: '5',  variant: 'orange', icon: 'bell',  status: 'Llama Mozo', time: '4m', badgeCount: 1 },
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
};

const variantHeaderColor = {
  red:      '#d62d20',
  orange:   '#f07020',
  yellow:   '#f5c518',
  paid:     '#30d158',
  occupied: '#0a84ff',
};

const variantStatusEmoji = {
  red:      '🧾',
  orange:   '🔔',
  yellow:   '🔔',
  paid:     '✅',
  occupied: '🍽️',
};

const CLOCK_ICON = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#8e8e93] shrink-0">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
  </svg>
);

const BELL_ICON_SM = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#8e8e93] shrink-0">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

function getMesa3Card(released) {
  if (!released) return { number: '3', variant: 'paid',  icon: 'check-circle', status: 'COBRADO (MP)' };
  return              { number: '3', variant: 'libre', icon: 'table',        status: 'Libre'            };
}

function getMesa1Card(status) {
  if (status === 'PENDING') return { number: '1', variant: 'red',   icon: 'receipt',      status: 'CUENTA: TARJETA',   time: '2 MIN' };
  if (status === 'PAID')    return { number: '1', variant: 'paid',  icon: 'check-circle', status: 'COBRADO (TARJETA)' };
  return                           { number: '1', variant: 'libre', icon: 'table',        status: 'Libre' };
}

function getMesa2Card(status) {
  if (status === 'PENDING') return { number: '2', variant: 'red',   icon: 'receipt',      status: 'CUENTA: EFECTIVO',   time: '1 MIN' };
  if (status === 'PAID')    return { number: '2', variant: 'paid',  icon: 'check-circle', status: 'COBRADO (EFECTIVO)' };
  return                           { number: '2', variant: 'libre', icon: 'table',        status: 'Libre' };
}

const OVERLAY = 'fixed inset-0 bg-black/72 z-50 flex items-center justify-center p-5 lg:p-8';
const CARD = 'bg-[#2a2a2c] rounded-[20px] overflow-hidden w-full max-w-sm shadow-2xl animate-[modal-in_0.25s_cubic-bezier(0.34,1.56,0.64,1)_forwards] flex flex-col h-[460px]';

export default function MisMesasPage({
  mesa1Status = 'PENDING', setMesa1Status,
  mesa2Status = 'PENDING', setMesa2Status,
  mesa3Released = false,   setMesa3Released,
}) {
  const [modal, setModal] = useState(null); // null | { type: 'action'|'confirm'|'history', mesa }
  const mesas = [getMesa1Card(mesa1Status), getMesa2Card(mesa2Status), getMesa3Card(mesa3Released), ...staticMesas];

  const getReleaseAction = (mesa) => {
    if (mesa.number === '1') return () => setMesa1Status?.('GONE');
    if (mesa.number === '2') return () => setMesa2Status?.('GONE');
    if (mesa.number === '3') return () => setMesa3Released?.(true);
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
        <div className={OVERLAY} onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className={CARD} onClick={(e) => e.stopPropagation()}>

            {/* Header: emoji left · MESA X center · time right */}
            <div className="py-3 px-5 flex items-center justify-between" style={{ background: headerColor }}>
              <div className="text-[26px] leading-none">{variantStatusEmoji[modal.mesa.variant] ?? '🍽️'}</div>
              <div className="text-[22px] font-extrabold text-white tracking-wide">
                MESA {modal.mesa.number}
              </div>
              {modal.mesa.time
                ? <div className="text-[13px] text-white/80 font-semibold uppercase tracking-wider">{modal.mesa.time}</div>
                : <div className="w-7" />
              }
            </div>

            {/* Middle: alert body (if any) + history inline */}
            <div className="flex-1 flex flex-col mx-3.5 mt-3.5 pb-4 gap-3">
              {/* Alert body — only shown when mesa has an active alert */}
              {modal.mesa.alert && (
                <div className="bg-[#1e1e20] rounded-[14px] flex flex-col items-center py-7 gap-3 shrink-0">
                  <div className="text-[60px] leading-none">{modal.mesa.alert.emoji}</div>
                  <div className="text-[22px] font-extrabold text-white tracking-wide text-center px-4">
                    {modal.mesa.alert.label}
                  </div>
                </div>
              )}

              {/* History timeline — fills remaining space */}
              <div className="flex-1 bg-[#1e1e20] rounded-[14px] overflow-y-auto">
                {(mesaHistory[modal.mesa.number] ?? []).map((ev, i, arr) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 py-[16px] px-5 ${i < arr.length - 1 ? 'border-b border-[#2c2c2e]' : ''}`}
                  >
                    {ev.icon === 'bell' ? BELL_ICON_SM : CLOCK_ICON}
                    <div className="flex-1">
                      <div className="text-[15px] font-bold text-white leading-tight">{ev.event}</div>
                      <div className="text-[12px] text-[#8e8e93] mt-0.5">{ev.time}</div>
                    </div>
                    {ev.emoji && (
                      <div className="text-[26px] leading-none shrink-0">{ev.emoji}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* LIBERAR MESA — flush big button */}
            <button
              type="button"
              className="mx-0 mb-0 py-8 text-center text-[24px] font-bold bg-[#3478f6] text-white cursor-pointer tracking-wide transition-opacity active:opacity-75 border-none w-full font-[inherit]"
              onClick={() => setModal({ type: 'confirm', mesa: modal.mesa })}
            >
              LIBERAR MESA
            </button>
          </div>
        </div>
      )}

      {/* ── Confirm popup ── */}
      {modal?.type === 'confirm' && (
        <div className={OVERLAY} onClick={(e) => e.target === e.currentTarget && setModal({ type: 'action', mesa: modal.mesa })}>
          <div className={CARD} onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="py-3 px-5 text-center bg-[#3a3a3c]">
              <div className="text-[20px] font-extrabold text-white tracking-wide uppercase">Confirmar</div>
            </div>

            {/* Confirmation body — flex-1 fills the space */}
            <div className="flex-1 bg-[#1e1e20] mx-3.5 mt-3.5 rounded-[14px] flex flex-col items-center justify-center px-5 gap-3 text-center">
              <div className="text-[26px] font-extrabold text-white leading-tight">
                ¿LIBERAR<br />MESA {modal.mesa.number}?
              </div>
              <div className="text-[14px] text-[#8e8e93] leading-snug">
                La mesa quedará marcada como libre
              </div>
            </div>

            {/* CANCELAR link */}
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 pt-3 px-5 pb-1 text-[#8e8e93] text-sm font-medium cursor-pointer bg-transparent border-none w-full font-[inherit]"
              onClick={() => setModal({ type: 'action', mesa: modal.mesa })}
            >
              CANCELAR
            </button>

            {/* CONFIRMAR — flush bottom */}
            <button
              type="button"
              className="mt-3 mx-0 mb-0 py-8 text-center text-[24px] font-bold bg-[#30d158] text-white cursor-pointer tracking-wide transition-opacity active:opacity-75 border-none w-full font-[inherit]"
              onClick={handleConfirmRelease}
            >
              CONFIRMAR
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
