import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

const CONSUMO = 21200;
const TIP_OPTS = [
  { label: '10%', pct: 0.10 },
  { label: '15%', pct: 0.15 },
  { label: 'Otro', pct: null },
  { label: 'Nada', pct: 0 },
];

function fmt(n) {
  return '$' + Math.round(n).toLocaleString('es-CL');
}

export default function ModoPagoLitePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('full'); // 'full' | 'tip'
  const [tipIdx, setTipIdx] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [inputVal, setInputVal] = useState('');

  const opt = TIP_OPTS[tipIdx];
  const tipAmount =
    opt.pct !== null
      ? Math.round(CONSUMO * opt.pct)
      : Number(customTip) || 0;

  // In full-account mode the input is the total; in tip-only mode it's the tip
  const displayAmount = tab === 'full'
    ? (inputVal ? Number(inputVal) : CONSUMO + tipAmount)
    : (inputVal ? Number(inputVal) : tipAmount);

  const total = tab === 'full'
    ? (inputVal ? Number(inputVal) : CONSUMO + tipAmount)
    : tipAmount;

  const chevronLeft = (
    <svg width="20" height="20" fill="none" stroke="#ddb8ff" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );

  return (
    <Phone>
      <div
        className="flex flex-col font-[Manrope,sans-serif] text-[#e4e2e4]"
        style={{ background: '#13151f', minHeight: '100%', paddingBottom: '9rem' }}
      >
        {/* ── Header ── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: '#13151f',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            {chevronLeft}
          </button>
          <h1
            className="font-bold"
            style={{ color: '#ddb8ff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
          >
            Pago Rápido
          </h1>
          <div style={{ color: '#cfc2d7', fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Mesa 4
          </div>
        </header>

        {/* ── Main ── */}
        <main style={{ padding: '0.75rem 1.25rem 0', maxWidth: '390px', margin: '0 auto', width: '100%' }}>

          {/* ── Tab selector ── */}
          <div
            className="flex rounded-2xl"
            style={{ background: '#1a1c29', padding: '4px', marginBottom: '1.5rem' }}
          >
            {[
              { key: 'full', label: 'Pagar Cuenta Completa' },
              { key: 'tip', label: 'Solo dejar Propina' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setTab(key); setInputVal(''); }}
                className="flex-1 font-bold text-center"
                style={{
                  padding: '0.625rem 0.5rem',
                  borderRadius: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  letterSpacing: '0.01em',
                  background: tab === key ? '#9333ea' : 'transparent',
                  color: tab === key ? '#fff' : '#988ca0',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Giant amount input ── */}
          <div
            className="rounded-2xl text-center relative overflow-hidden"
            style={{ background: '#0f111a', border: '1px solid rgba(147,51,234,0.2)', padding: '1.75rem 1.25rem 1.5rem', marginBottom: '1.25rem' }}
          >
            <div
              className="absolute rounded-full"
              style={{ right: '-2rem', top: '-2rem', width: '6rem', height: '6rem', background: 'rgba(19,236,167,0.06)', filter: 'blur(40px)' }}
            />
            <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#988ca0', marginBottom: '0.5rem', fontWeight: 700 }}>
              {tab === 'full' ? 'Total a pagar' : 'Propina a dejar'}
            </p>
            <div className="relative flex items-center justify-center" style={{ gap: '0.25rem' }}>
              {inputVal && (
                <span className="font-black" style={{ fontSize: '2rem', color: '#4edea3', letterSpacing: '-0.04em', alignSelf: 'flex-start', paddingTop: '0.35rem' }}>$</span>
              )}
              <input
                type="number"
                inputMode="numeric"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="0"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#4edea3',
                  fontSize: '3rem',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  width: '100%',
                  textAlign: 'center',
                  fontFamily: 'Manrope, sans-serif',
                }}
              />
            </div>
            {!inputVal && (
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginTop: '0.25rem' }}>
                {tab === 'full' ? 'Escribí el total a cobrar' : 'Escribí el monto de propina'}
              </p>
            )}
            {tab === 'full' && (
              <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.5rem' }}>
                Consumo base: {fmt(CONSUMO)}
              </p>
            )}
          </div>

          {/* ── Tip pills ── */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#988ca0', fontWeight: 700, marginBottom: '0.625rem' }}>
              Propina sugerida
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {TIP_OPTS.map((o, idx) => {
                const isActive = tipIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => { setTipIdx(idx); if (o.label !== 'Otro') setCustomTip(''); }}
                    className="font-bold"
                    style={{
                      padding: '0.625rem 0',
                      borderRadius: '0.875rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      background: isActive ? '#9333ea' : '#1a1c29',
                      color: isActive ? '#fff' : '#e4e2e4',
                      transition: 'background 0.2s',
                    }}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>

            {opt.label === 'Otro' && (
              <input
                type="number"
                inputMode="numeric"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Ingresá el monto de propina"
                className="w-full"
                style={{
                  marginTop: '0.625rem',
                  background: '#1a1c29',
                  border: '1px solid rgba(147,51,234,0.3)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  color: '#e4e2e4',
                  fontSize: '0.875rem',
                  outline: 'none',
                  fontFamily: 'Manrope, sans-serif',
                }}
              />
            )}

            {tipAmount > 0 && (tab === 'tip' || inputVal) && (
              <p
                className="font-bold text-center"
                style={{ fontSize: '0.8rem', color: '#4edea3', marginTop: '0.75rem' }}
              >
                + {fmt(tipAmount)} de propina
              </p>
            )}
          </div>
        </main>

        {/* ── Anchored footer ── */}
        <div
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{
            background: 'linear-gradient(to top, #13151f 70%, transparent)',
            padding: '1.25rem 1.25rem 1.75rem',
            maxWidth: '390px',
            margin: '0 auto',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
          }}
        >
          {/* Total display */}
          <div
            className="flex justify-between items-center rounded-2xl"
            style={{ background: '#1a1c29', padding: '0.875rem 1rem', marginBottom: '0.875rem' }}
          >
            <span style={{ fontSize: '0.75rem', color: '#988ca0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {tab === 'full' ? 'Total' : 'Propina'}
            </span>
            <span className="font-extrabold" style={{ color: inputVal ? '#4edea3' : '#64748b', fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
              {inputVal ? fmt(Number(inputVal)) : '—'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
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
                fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(0,158,227,0.15)',
                transition: 'transform 0.15s',
              }}
              onClick={() => navigate('/cliente/post-pago')}
            >
              Pagar con Mercado Pago
            </button>

            {/* Posnet */}
            <button
              className="w-full font-bold flex items-center justify-center"
              style={{
                background: 'transparent',
                border: '1px solid rgba(147,51,234,0.35)',
                color: '#cfc2d7',
                padding: '1rem',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'transform 0.15s',
              }}
              onClick={() => navigate('/cliente/posnet')}
            >
              Tarjeta / MODO
            </button>
          </div>
        </div>

        {/* ── Background glows ── */}
        <div className="fixed rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(147,51,234,0.04)', filter: 'blur(100px)' }} />
        <div className="fixed rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(78,222,163,0.05)', filter: 'blur(100px)' }} />
      </div>
    </Phone>
  );
}
