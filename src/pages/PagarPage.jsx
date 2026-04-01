import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

const CONSUMO = 21200;
const TIP_OPTIONS = [
  { label: '10%', sub: 'Sugerido', pct: 0.10 },
  { label: '15%', sub: 'Excelente', pct: 0.15 },
  { label: 'Otro', sub: 'Monto', pct: null },
  { label: 'Nada', sub: 'Omitir', pct: 0 },
];

function fmt(n) {
  return '$' + n.toLocaleString('es-CL');
}

export default function PagarPage() {
  const navigate = useNavigate();
  const [selectedTip, setSelectedTip] = useState(0); // index
  const [customTip, setCustomTip] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [splitOpen, setSplitOpen] = useState(false);
  const [splitCount, setSplitCount] = useState(2);

  const opt = TIP_OPTIONS[selectedTip];
  const tipAmount =
    opt.pct !== null
      ? Math.round(CONSUMO * opt.pct)
      : Number(customTip) || 0;
  const total = CONSUMO + tipAmount;

  function handleTipSelect(idx) {
    setSelectedTip(idx);
    if (TIP_OPTIONS[idx].label === 'Otro') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setCustomTip('');
    }
  }

  /* ── SVG icons ── */
  const chevronLeft = (
    <svg width="20" height="20" fill="none" stroke="#ddb8ff" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );

  const iconPOS = (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M7 15h0m5 0h0m5 0h0M7 11h10" />
    </svg>
  );

  const iconWallet = (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M16 12h2" />
    </svg>
  );

  const iconCalc = (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 14h0m4 0h0m4 0h0M8 18h0m4 0h0m4 0h0M8 10h8" />
    </svg>
  );

  const iconBank = (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v4m4-4v4m4-4v4" />
    </svg>
  );

  return (
    <Phone>
      <div
        className="flex flex-col font-[Manrope,sans-serif] text-[#e4e2e4]"
        style={{ background: '#131315', minHeight: '100%', paddingBottom: '7rem' }}
      >
        {/* ── Header ── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: '#131315',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="flex items-center gap-1 cursor-pointer"
            style={{ color: '#cfc2d7', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}
            onClick={() => navigate(-1)}
          >
            {chevronLeft}
            <span>Volver</span>
          </div>
          <h1
            className="font-bold tracking-tight text-[#e4e2e4]"
            style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            Pagar / Dejar Propina
          </h1>
          <button
            onClick={() => navigate('/cliente/pago-lite')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#988ca0', opacity: 0.7 }}
            title="Modo de pago simplificado"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>
        </header>

        {/* ── Main content ── */}
        <main style={{ padding: '0.5rem 1.25rem 0', maxWidth: '390px', margin: '0 auto', width: '100%' }}>

          {/* ── Ticket Card ── */}
          <section
            className="rounded-2xl"
            style={{ background: '#1f1f21', padding: '1.25rem', marginBottom: '1rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Item 1 */}
              <div className="flex justify-between items-start">
                <div className="flex" style={{ gap: '0.75rem' }}>
                  <span className="font-bold" style={{ color: '#ddb8ff' }}>2x</span>
                  <span className="font-medium" style={{ color: '#e4e2e4' }}>Doble Smash Burger</span>
                </div>
                <span className="font-semibold" style={{ color: '#e4e2e4' }}>$17.000</span>
              </div>
              {/* Item 2 */}
              <div className="flex justify-between items-start">
                <div className="flex" style={{ gap: '0.75rem' }}>
                  <span className="font-bold" style={{ color: '#ddb8ff' }}>1x</span>
                  <span className="font-medium" style={{ color: '#e4e2e4' }}>Limonada</span>
                </div>
                <span className="font-semibold" style={{ color: '#e4e2e4' }}>$4.200</span>
              </div>
              {/* Divider + Subtotal */}
              <div
                className="flex justify-between items-center"
                style={{ paddingTop: '1rem', marginTop: '0.25rem', borderTop: '1px solid rgba(77,67,84,0.15)' }}
              >
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#cfc2d7' }}>
                  Subtotal Consumo
                </span>
                <span className="font-bold" style={{ color: '#e4e2e4' }}>{fmt(CONSUMO)}</span>
              </div>
            </div>
          </section>

          {/* ── Tip Card ── */}
          <section
            className="rounded-2xl relative overflow-hidden"
            style={{
              background: '#1b1b1d',
              border: '1px solid rgba(147,51,234,0.3)',
              padding: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            {/* Background glow */}
            <div
              className="absolute rounded-full"
              style={{ right: '-2.5rem', top: '-2.5rem', width: '6rem', height: '6rem', background: 'rgba(147,51,234,0.1)', filter: 'blur(48px)' }}
            />
            <h2 className="font-bold flex items-center" style={{ gap: '0.5rem', marginBottom: '1rem', color: '#e4e2e4' }}>
              Propina <span style={{ fontSize: '1.125rem' }}>💸</span>
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              {TIP_OPTIONS.map((opt, idx) => {
                const isActive = selectedTip === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleTipSelect(idx)}
                    className="font-bold text-sm"
                    style={{
                      background: isActive ? '#9333ea' : '#2a2a2c',
                      color: isActive ? '#fff' : '#e4e2e4',
                      padding: '0.75rem 0',
                      borderRadius: '1rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.15s, background 0.2s',
                      fontSize: '0.875rem',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Custom tip input */}
            {showCustom && (
              <div style={{ marginBottom: '0.75rem' }}>
                <input
                  type="number"
                  inputMode="numeric"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  placeholder="Ingresá el monto de propina"
                  className="w-full"
                  style={{
                    background: '#2a2a2c',
                    border: '1px solid rgba(147,51,234,0.3)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: '#e4e2e4',
                    fontSize: '0.875rem',
                    outline: 'none',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                />
              </div>
            )}

          </section>

          {/* ── Total ── */}
          <section className="text-center" style={{ marginBottom: '2rem' }}>
            <h3
              className="font-extrabold"
              style={{
                color: '#4edea3',
                fontSize: '3rem',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                textShadow: '0 0 20px rgba(78,222,163,0.15)',
              }}
            >
              {fmt(total)}
            </h3>
            <p className="font-medium" style={{ color: '#cfc2d7', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Total a pagar (Consumo + Propina)
            </p>
            <div style={{ paddingTop: '1rem' }}>
              <button
                className="inline-flex items-center font-medium"
                style={{
                  gap: '0.5rem',
                  padding: '0.5rem 1.5rem',
                  background: '#2a2a2c',
                  borderRadius: '9999px',
                  color: '#e4e2e4',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setSplitOpen(true)}
              >
                {iconCalc}
                Dividir cuenta
              </button>
            </div>
          </section>

          {/* ── Payment Methods ── */}
          <section
            className="rounded-2xl relative overflow-hidden"
            style={{
              background: '#1b1b1d',
              border: '1px solid rgba(147,51,234,0.3)',
              padding: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <label
              className="block text-center font-bold"
              style={{
                color: '#cfc2d7',
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginBottom: '1rem',
              }}
            >
              ¿Como queres pagar?
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Mercado Pago */}
            <button
              className="w-full font-bold flex items-center justify-center"
              style={{
                background: '#009EE3',
                color: '#fff',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                gap: '0.5rem',
                fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(0,158,227,0.1)',
                transition: 'transform 0.15s',
              }}
              onClick={() => navigate('/cliente/post-pago')}
            >
              Mercado Pago
            </button>

            {/* Transferencia Bancaria */}
            <button
              className="w-full font-bold flex items-center justify-center"
              style={{
                background: '#1f1f21',
                border: '1px solid rgba(0,165,114,0.3)',
                color: '#e4e2e4',
                padding: '1rem',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                gap: '0.5rem',
                fontSize: '1rem',
                transition: 'transform 0.15s',
              }}
              onClick={() => navigate('/cliente/transferencia')}
            >
              {iconBank}
              Transferencia
            </button>

            {/* Posnet + Efectivo grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                className="font-semibold flex items-center justify-center"
                style={{
                  background: '#1f1f21',
                  color: '#e4e2e4',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  transition: 'transform 0.15s',
                }}
                onClick={() => navigate('/cliente/posnet')}
              >
                {iconPOS}
                Tarjeta / MODO
              </button>
              <button
                className="font-semibold flex items-center justify-center"
                style={{
                  background: '#1f1f21',
                  color: '#e4e2e4',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  transition: 'transform 0.15s',
                }}
                onClick={() => navigate('/cliente/efectivo')}
              >
                {iconWallet}
                Efectivo
              </button>
            </div>
            </div>
          </section>
        </main>

        {/* ── Background glow decoration ── */}
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(147,51,234,0.04)', filter: 'blur(100px)' }}
        />
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(78,222,163,0.05)', filter: 'blur(100px)' }}
        />
      </div>

      {/* ── Bottom Sheet: Dividir Cuenta ── */}
      {splitOpen && (() => {
        const perPerson = Math.ceil(total / splitCount);
        return (
          <div
            className="absolute inset-0 z-50 flex items-end"
            style={{ background: 'rgba(0, 0, 0, 0.70)' }}
            onClick={() => setSplitOpen(false)}
          >
            <div
              className="w-full"
              style={{
                background: '#1a1c29',
                borderRadius: '24px 24px 0 0',
                padding: '1.5rem',
                animation: 'split-slide-up 0.3s ease-out forwards',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
                <div className="rounded-full" style={{ width: '48px', height: '6px', background: '#4b5563' }} />
              </div>

              {/* Title + total */}
              <h2 className="text-white text-xl font-bold text-center">Dividir Cuenta</h2>
              <p className="text-center" style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Total a dividir: <span className="font-bold" style={{ color: '#e4e2e4' }}>{fmt(total)}</span>
              </p>

              {/* Counter selector */}
              <div className="flex justify-center items-center" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
                <button
                  className="flex items-center justify-center rounded-full font-bold text-white text-xl"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#1f2937',
                    border: 'none',
                    cursor: splitCount > 2 ? 'pointer' : 'not-allowed',
                    opacity: splitCount > 2 ? 1 : 0.4,
                    transition: 'opacity 0.15s',
                  }}
                  onClick={() => setSplitCount((c) => Math.max(2, c - 1))}
                >
                  −
                </button>
                <span className="text-white font-bold" style={{ fontSize: '1.25rem', minWidth: '6rem', textAlign: 'center' }}>
                  {splitCount} personas
                </span>
                <button
                  className="flex items-center justify-center rounded-full font-bold text-white text-xl"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#1f2937',
                    border: 'none',
                    cursor: splitCount < 20 ? 'pointer' : 'not-allowed',
                    opacity: splitCount < 20 ? 1 : 0.4,
                    transition: 'opacity 0.15s',
                  }}
                  onClick={() => setSplitCount((c) => Math.min(20, c + 1))}
                >
                  +
                </button>
              </div>

              {/* Result card */}
              <div
                className="text-center"
                style={{
                  background: 'rgba(31,41,55,0.5)',
                  border: '1px solid #374151',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  marginTop: '2rem',
                }}
              >
                <span style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>Cada uno paga:</span>
                <div
                  className="font-bold"
                  style={{
                    color: '#4ade80',
                    fontSize: '2.25rem',
                    letterSpacing: '-0.04em',
                    marginTop: '0.5rem',
                    textShadow: '0 0 20px rgba(74,222,128,0.15)',
                  }}
                >
                  {fmt(perPerson)}
                </div>
              </div>

              {/* CTA button */}
              <button
                className="w-full font-bold text-white text-center"
                style={{
                  background: '#9333ea',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginTop: '1.5rem',
                }}
                onClick={() => setSplitOpen(false)}
              >
                Listo
              </button>
            </div>

            <style>{`
              @keyframes split-slide-up {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
            `}</style>
          </div>
        );
      })()}
    </Phone>
  );
}
