import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import { getOrderTotal } from '../lib/cartStore';
import { addAlert } from '../lib/alertStore';


function fmt(n) {
  return '$' + Math.round(n).toLocaleString('es-CL');
}

export default function ModoPagoLitePage() {
  const navigate = useNavigate();
  const CONSUMO = getOrderTotal(); // 0 si el cliente no pidió por la app

  // UI state
  const [tab, setTab] = useState('full'); // 'full' | 'tip'
  const [step, setStep] = useState('initial'); // 'initial' | 'digital' (solo tab full)
  const [inputVal, setInputVal] = useState('');
  const [tipVal, setTipVal] = useState(''); // propina manual (tab full)

  // tab 'tip': inputVal IS the propina. tab 'full': tipVal es la propina separada.
  const tipAmount = tab === 'tip' ? (Number(inputVal) || 0) : (Number(tipVal) || 0);

  // Mostrar input + propina + botones de pago digital
  const showAmountFlow = tab === 'tip' || (tab === 'full' && step === 'digital');

  // ── Elegir método de pago ──
  function pickMethod(method) {
    if (method === 'efectivo') {
      addAlert({
        mesa: 'MESA 6',
        variant: 'red',
        title: 'Cobrar Efectivo',
        subtitle: '🧾 Llevar ticket a la mesa',
        icon: 'payments',
        emoji: '💵',
      });
      navigate('/cliente/efectivo');
      return;
    }

    if (method === 'tarjeta') {
      addAlert({
        mesa: 'MESA 6',
        variant: 'red',
        title: 'Cobrar Tarjeta / MODO',
        subtitle: '🧾 Llevar Posnet + ticket',
        icon: 'credit_card',
        emoji: '💳',
      });
      navigate('/cliente/posnet');
      return;
    }

    // digital → pasamos al step 'digital' en esta misma página
    addAlert({
      mesa: 'MESA 6',
      variant: 'red',
      title: 'Cobrar Pago Digital',
      subtitle: '🧾 Llevar ticket (cliente anotará el total)',
      icon: 'qr_code_2',
      emoji: '📱',
    });
    setStep('digital');
  }

  // Handlers de pago digital (disparan alerta final al mozo)
  function handlePayMP() {
    if (!inputVal) return;
    addAlert({
      mesa: 'MESA 6',
      variant: 'red',
      title: 'Cuenta: Mercado Pago (Lite)',
      subtitle: tipAmount > 0 ? `💸 + ${fmt(tipAmount)} Propina` : undefined,
      icon: 'credit_card',
      emoji: '💳',
    });
    navigate('/cliente/post-pago');
  }

  function handlePayTransfer() {
    if (!inputVal) return;
    // Guardar total y propina en localStorage para que TransferenciaPage lo lea
    localStorage.setItem('hm_lite_total', inputVal);
    localStorage.setItem('hm_lite_tip', String(tipAmount));
    navigate('/cliente/transferencia');
  }

  const chevronLeft = (
    <svg width="20" height="20" fill="none" stroke="#86efac" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );

  return (
    <Phone>
      <div
        className="flex flex-col font-[Manrope,sans-serif] text-[#e4e2e4]"
        style={{ background: '#13151f', minHeight: '100%', paddingBottom: showAmountFlow ? '9rem' : '2rem' }}
      >
        {/* ── Header ── */}
        <header
          className="sticky top-0 z-40"
          style={{
            background: '#13151f',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => {
              // Si está en step digital, volver al initial en vez de navegar
              if (tab === 'full' && step === 'digital') {
                setStep('initial');
                setInputVal('');
              } else {
                navigate(-1);
              }
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            {chevronLeft}
          </button>
          <h1
            className="font-bold"
            style={{ color: '#86efac', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
          >
            Pago Rápido
          </h1>
          <div style={{ color: '#cfc2d7', fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Mesa 6
          </div>
        </header>

        {/* ── Main ── */}
        <main style={{ padding: '0.75rem 1.25rem 0', maxWidth: '390px', margin: '0 auto', width: '100%' }}>

          {/* ── Tab selector — solo se muestra en step initial ── */}
          {step === 'initial' && (
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
                    background: tab === key ? '#16a34a' : 'transparent',
                    color: tab === key ? '#fff' : '#988ca0',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* ── Initial state (tab full): selectores de método de pago ── */}
          {tab === 'full' && step === 'initial' && (
            <div style={{ paddingTop: '0.25rem' }}>

              {/* Fila superior: Efectivo + Tarjeta (físicos, iguales) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '0.625rem' }}>
                {[
                  { method: 'efectivo', emoji: '💵', label: 'Efectivo' },
                  { method: 'tarjeta', emoji: '💳', label: 'Tarjeta / MODO' },
                ].map(({ method, emoji, label }) => (
                  <button
                    key={method}
                    onClick={() => pickMethod(method)}
                    className="flex flex-col items-center justify-center font-bold"
                    style={{
                      background: '#1a1c28',
                      color: '#e4e4e7',
                      padding: '1.25rem 0.5rem',
                      borderRadius: '1rem',
                      border: '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{emoji}</span>
                    <span style={{ fontSize: '0.82rem' }}>{label}</span>
                  </button>
                ))}
              </div>

              {/* Separador con etiqueta */}
              <div className="flex items-center" style={{ gap: '0.75rem', margin: '0.875rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                <span style={{ fontSize: '0.65rem', color: '#4b5563', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                  o pagá desde tu celu
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              </div>

              {/* Fila inferior: Digital (destacado, ancho completo) */}
              <button
                onClick={() => pickMethod('digital')}
                className="w-full flex items-center font-bold"
                style={{
                  background: 'rgba(22,163,74,0.12)',
                  color: '#fff',
                  padding: '1.1rem 1.25rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(22,163,74,0.35)',
                  cursor: 'pointer',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>📱</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: '0.9rem' }}>Mercado Pago / Transferencia</div>
                  <div style={{ color: '#86efac', fontSize: '0.7rem', fontWeight: 500, marginTop: '2px' }}>Sin comisión con transferencia</div>
                </div>
                <svg width="16" height="16" fill="none" stroke="#86efac" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.67rem', color: '#4b5563', marginTop: '1.25rem', lineHeight: 1.5 }}>
                El mozo te trae el ticket antes de cobrar
              </p>
            </div>
          )}

          {/* ── Aclaración para el tab de solo propina ── */}
          {tab === 'tip' && (
            <div
              className="rounded-2xl"
              style={{
                background: 'rgba(22,163,74,0.08)',
                border: '1px solid rgba(22,163,74,0.2)',
                padding: '0.875rem 1rem',
                marginBottom: '1rem',
              }}
            >
              <p style={{ fontSize: '0.72rem', color: '#cfc2d7', lineHeight: 1.5, margin: 0 }}>
                <span style={{ fontSize: '0.9rem' }}>💸</span>{' '}
                <strong style={{ color: '#86efac' }}>Solo la propina va por acá.</strong> Pagá tu consumo como siempre (efectivo, tarjeta o lo que elijas) — esto es aparte, 100% digital.
              </p>
            </div>
          )}

          {/* ── Indicador de step digital (breadcrumb simple) ── */}
          {tab === 'full' && step === 'digital' && (
            <div
              className="rounded-2xl"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                padding: '0.875rem 1rem',
                marginBottom: '1rem',
              }}
            >
              <p style={{ fontSize: '0.72rem', color: '#cfc2d7', lineHeight: 1.5, margin: 0 }}>
                <span style={{ fontSize: '0.9rem' }}>✓</span>{' '}
                <strong style={{ color: '#4ade80' }}>Mozo avisado.</strong> Cuando te lleve el ticket, escribí el total abajo y pagá con MP o transferencia.
              </p>
            </div>
          )}

          {/* ── Giant amount input — solo en flujo con monto ── */}
          {showAmountFlow && (
            <div
              className="rounded-2xl text-center relative overflow-hidden"
              style={{ background: '#0f111a', border: '1px solid rgba(22,163,74,0.2)', padding: '1.75rem 1.25rem 1.5rem', marginBottom: '1.25rem' }}
            >
              <div
                className="absolute rounded-full"
                style={{ right: '-2rem', top: '-2rem', width: '6rem', height: '6rem', background: 'rgba(19,236,167,0.06)', filter: 'blur(40px)' }}
              />
              <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#988ca0', marginBottom: '0.5rem', fontWeight: 700 }}>
                {tab === 'full' ? 'Total del ticket' : 'Propina a dejar'}
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
                  {tab === 'full' ? 'Copiá el total del ticket' : 'Escribí el monto de propina'}
                </p>
              )}
              {tab === 'full' && CONSUMO > 0 && (
                <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.5rem' }}>
                  Consumo base: {fmt(CONSUMO)}
                </p>
              )}
            </div>
          )}

          {/* ── Propina manual (solo tab full, step digital) ── */}
          {tab === 'full' && step === 'digital' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#988ca0', fontWeight: 700, marginBottom: '0.5rem' }}>
                Propina (opcional)
              </p>
              <input
                type="number"
                inputMode="numeric"
                value={tipVal}
                onChange={(e) => setTipVal(e.target.value)}
                placeholder="$0 — escribí si querés dejar propina"
                className="w-full"
                style={{
                  background: '#1a1c29',
                  border: '1px solid rgba(22,163,74,0.25)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  color: '#e4e2e4',
                  fontSize: '0.875rem',
                  outline: 'none',
                  fontFamily: 'Manrope, sans-serif',
                }}
              />
              {tipAmount > 0 && (
                <p className="font-bold text-center" style={{ fontSize: '0.8rem', color: '#4edea3', marginTop: '0.5rem' }}>
                  + {fmt(tipAmount)} de propina
                </p>
              )}
            </div>
          )}
        </main>

        {/* ── Anchored footer — solo en flujo con monto ── */}
        {showAmountFlow && (
          <div
            className="fixed bottom-0 z-40"
            style={{
              background: 'linear-gradient(to top, #13151f 70%, transparent)',
              padding: '1.25rem 1.25rem 1.75rem',
              maxWidth: '390px',
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
                  background: inputVal ? '#009EE3' : '#0a4a6b',
                  color: inputVal ? '#fff' : '#64748b',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: inputVal ? 'pointer' : 'not-allowed',
                  fontSize: '1rem',
                  boxShadow: inputVal ? '0 8px 24px rgba(0,158,227,0.15)' : 'none',
                  transition: 'transform 0.15s, background 0.2s',
                }}
                onClick={handlePayMP}
                disabled={!inputVal}
              >
                {tab === 'full' ? 'Pagar con Mercado Pago' : 'Dejar Propina con Mercado Pago'}
              </button>

              {/* Transferencia — solo en tab Cuenta Completa */}
              {tab === 'full' && (
                <button
                  className="w-full font-bold flex items-center justify-center"
                  style={{
                    background: 'transparent',
                    border: `1px solid ${inputVal ? 'rgba(22,163,74,0.45)' : 'rgba(22,163,74,0.2)'}`,
                    color: inputVal ? '#cfc2d7' : '#64748b',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    cursor: inputVal ? 'pointer' : 'not-allowed',
                    fontSize: '0.9rem',
                    transition: 'transform 0.15s, border 0.2s',
                    gap: '0.5rem',
                  }}
                  onClick={handlePayTransfer}
                  disabled={!inputVal}
                >
                  🏦 Transferencia (sin comisión)
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Background glows ── */}
        <div className="fixed rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(22,163,74,0.04)', filter: 'blur(100px)' }} />
        <div className="fixed rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(78,222,163,0.05)', filter: 'blur(100px)' }} />
      </div>

    </Phone>
  );
}
