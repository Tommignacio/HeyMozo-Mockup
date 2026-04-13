import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import { getOrderTotal, getOrder } from '../lib/cartStore';
import { addAlert } from '../lib/alertStore';
import { addCajaAlert } from '../lib/cajaStore';

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
  const CONSUMO = getOrderTotal();
  const noOrder = CONSUMO === 0;
  // Sin pedido: forzar modo "Otro" (index 2) para que solo se ingrese propina manual
  const [selectedTip, setSelectedTip] = useState(noOrder ? 2 : 0);
  const [customTip, setCustomTip] = useState('');
  const [showCustom, setShowCustom] = useState(noOrder);
  const [splitOpen, setSplitOpen] = useState(false);
  const [splitCount, setSplitCount] = useState(2);
  const [mpAmountModal, setMpAmountModal] = useState(false);
  const [mpCustomAmount, setMpCustomAmount] = useState('');

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
    <svg width="20" height="20" fill="none" stroke="#86efac" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
        style={{ background: '#131315', minHeight: '100%', paddingBottom: 'env(safe-area-inset-bottom, 1rem)' }}
      >
        {/* ── Header ── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: '#131315',
            padding: '0.625rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="flex items-center gap-1 cursor-pointer"
            style={{ color: '#86efac', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}
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
            style={{ background: '#1f1f21', padding: '1rem 1.25rem', marginBottom: '0.75rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {getOrder().length > 0
                ? getOrder().map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="flex" style={{ gap: '0.75rem' }}>
                      <span className="font-bold" style={{ color: '#ddb8ff' }}>{item.qty}x</span>
                      <span className="font-medium" style={{ color: '#e4e2e4' }}>{item.title || item.name}</span>
                    </div>
                    <span className="font-semibold" style={{ color: '#e4e2e4' }}>{fmt(item.unitPrice * item.qty)}</span>
                  </div>
                ))
                : (
                  <p style={{ color: '#636366', fontSize: '0.85rem', textAlign: 'center', padding: '0.5rem 0' }}>
                    Sin ítems confirmados
                  </p>
                )
              }
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
              border: '1px solid rgba(22,163,74,0.3)',
              padding: '1rem 1.25rem',
              marginBottom: '0.875rem',
            }}
          >
            {/* Background glow */}
            <div
              className="absolute rounded-full"
              style={{ right: '-2.5rem', top: '-2.5rem', width: '6rem', height: '6rem', background: 'rgba(22,163,74,0.1)', filter: 'blur(48px)' }}
            />
            <h2 className="font-bold flex items-center" style={{ gap: '0.5rem', marginBottom: '0.75rem', color: '#e4e2e4' }}>
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
                // Sin pedido: solo "Otro" (idx 2) disponible
                const isDisabled = noOrder && opt.pct !== null;
                return (
                  <button
                    key={idx}
                    onClick={() => !isDisabled && handleTipSelect(idx)}
                    className="font-bold text-sm"
                    style={{
                      background: isDisabled ? '#1a1a1c' : isActive ? '#16a34a' : '#2a2a2c',
                      color: isDisabled ? '#3a3a3c' : isActive ? '#fff' : '#e4e2e4',
                      padding: '0.75rem 0',
                      borderRadius: '1rem',
                      border: 'none',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.15s, background 0.2s',
                      fontSize: '0.875rem',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
              {noOrder && (
                <p style={{ gridColumn: '1 / -1', fontSize: '0.68rem', color: '#6b7280', textAlign: 'center', marginTop: '0.25rem', lineHeight: 1.4 }}>
                  Sin pedido activo — solo podés ingresar un monto de propina a mano
                </p>
              )}
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
                    border: '1px solid rgba(22,163,74,0.3)',
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
          <section className="text-center" style={{ marginBottom: '1rem' }}>
            <h3
              className="font-extrabold"
              style={{
                color: '#4edea3',
                fontSize: 'clamp(2rem, 10vw, 2.75rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                textShadow: '0 0 20px rgba(78,222,163,0.15)',
              }}
            >
              {fmt(total)}
            </h3>
            <p className="font-medium" style={{ color: '#cfc2d7', fontSize: '0.8rem', marginTop: '0.25rem' }}>
              Total a pagar (Consumo + Propina)
            </p>
            {!noOrder && (
              <button
                className="inline-flex items-center"
                style={{
                  gap: '0.375rem',
                  marginTop: '0.375rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '0.75rem',
                  fontFamily: 'Manrope, sans-serif',
                }}
                onClick={() => setSplitOpen(true)}
              >
                {iconCalc}
                Dividir cuenta
              </button>
            )}
          </section>

          {/* ── Payment Methods ── */}
          <section
            className="rounded-2xl relative overflow-hidden"
            style={{
              background: '#1b1b1d',
              border: '1px solid rgba(22,163,74,0.3)',
              padding: '0.875rem 1.25rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {/* Mercado Pago */}
            {(() => {
              const mpEnabled = !noOrder || tipAmount > 0;
              return (
                <button
                  className="w-full font-bold flex items-center justify-center"
                  style={{
                    background: mpEnabled ? '#009EE3' : '#0a3a50',
                    color: mpEnabled ? '#fff' : '#4b5563',
                    padding: '0.875rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: mpEnabled ? 'pointer' : 'not-allowed',
                    gap: '0.5rem',
                    fontSize: '0.95rem',
                    boxShadow: mpEnabled ? '0 8px 24px rgba(0,158,227,0.1)' : 'none',
                    transition: 'transform 0.15s',
                  }}
                  disabled={!mpEnabled}
                  onClick={() => {
                    if (!mpEnabled) return;
                    if (noOrder) {
                      // Sin pedido: propina directa, sin preguntar monto
                      addAlert({ mesa: 'MESA 6', variant: 'paid', title: 'Propina: Mercado Pago', subtitle: `💸 ${fmt(tipAmount)} propina`, icon: 'check_circle', emoji: '✅' });
                      addCajaAlert({ mesa: 'MESA 6', metodo: 'Mercado Pago', monto: fmt(tipAmount), tipoPago: 'PROPINA', propina: fmt(tipAmount) });
                      navigate('/cliente/post-pago');
                    } else {
                      setMpCustomAmount('');
                      setMpAmountModal(true);
                    }
                  }}
                >
                  {noOrder ? 'Dejar Propina con Mercado Pago' : 'Mercado Pago'}
                </button>
              );
            })()}

            {/* Transferencia, Posnet, Efectivo — solo si hay pedido */}
            {!noOrder && (
              <>
                <button
                  className="w-full font-bold flex items-center justify-center"
                  style={{
                    background: '#1f1f21',
                    border: '1px solid rgba(0,165,114,0.3)',
                    color: '#e4e2e4',
                    padding: '0.875rem',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    gap: '0.5rem',
                    fontSize: '0.95rem',
                    transition: 'transform 0.15s',
                  }}
                  onClick={() => navigate('/cliente/transferencia')}
                >
                  {iconBank}
                  Transferencia
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    className="font-semibold flex items-center justify-center"
                    style={{
                      background: '#1f1f21',
                      color: '#e4e2e4',
                      padding: '0.875rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      transition: 'transform 0.15s',
                    }}
                    onClick={() => {
                      addAlert({
                        mesa: 'MESA 6',
                        variant: 'red',
                        title: 'Cuenta: Tarjeta / MODO',
                        subtitle: tipAmount > 0 ? `💸 + ${fmt(tipAmount)} propina — cargar en posnet` : undefined,
                        icon: 'credit_card',
                        emoji: '💳',
                      });
                      navigate('/cliente/posnet');
                    }}
                  >
                    {iconPOS}
                    Tarjeta / MODO
                  </button>
                  <button
                    className="font-semibold flex items-center justify-center"
                    style={{
                      background: '#1f1f21',
                      color: '#e4e2e4',
                      padding: '0.875rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      transition: 'transform 0.15s',
                    }}
                    onClick={() => {
                      addAlert({
                        mesa: 'MESA 6',
                        variant: 'red',
                        title: 'Cuenta: Efectivo',
                        subtitle: tipAmount > 0 ? `💸 + ${fmt(tipAmount)} propina en efectivo` : undefined,
                        icon: 'credit_card',
                        emoji: '💵',
                      });
                      navigate('/cliente/efectivo');
                    }}
                  >
                    {iconWallet}
                    Efectivo
                  </button>
                </div>
              </>
            )}
            </div>
          </section>
        </main>

        {/* ── Background glow decoration ── */}
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(22,163,74,0.04)', filter: 'blur(100px)' }}
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

              {/* Aviso: carácter informativo */}
              <div
                className="flex items-start"
                style={{
                  gap: '0.5rem',
                  background: 'rgba(250,204,21,0.08)',
                  border: '1px solid rgba(250,204,21,0.2)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 0.875rem',
                  marginTop: '1rem',
                }}
              >
                <span style={{ fontSize: '0.95rem', lineHeight: 1.2, flexShrink: 0 }}>ℹ️</span>
                <p style={{ color: '#cbd5e1', fontSize: '0.72rem', lineHeight: 1.45, margin: 0 }}>
                  <strong style={{ color: '#facc15' }}>Es solo un cálculo informativo.</strong> El pago sigue siendo uno solo: arreglen entre ustedes quién lo hace, o que cada uno escanee el QR y pague su parte por separado.
                </p>
              </div>

              {/* CTA button */}
              <button
                className="w-full font-bold text-white text-center"
                style={{
                  background: '#16a34a',
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

      {/* ── Modal: ¿Cuánto vas a pagar con MP? ── */}
      {mpAmountModal && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0,0,0,0.72)' }}
          onClick={() => setMpAmountModal(false)}
        >
          <div
            className="w-full"
            style={{
              background: '#1a1c29',
              borderRadius: '24px 24px 0 0',
              padding: '1.5rem 1.5rem 2rem',
              animation: 'split-slide-up 0.3s ease-out forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center" style={{ marginBottom: '1.25rem' }}>
              <div className="rounded-full" style={{ width: '48px', height: '6px', background: '#374151' }} />
            </div>

            <h2 className="text-white font-bold text-center" style={{ fontSize: '1.1rem', marginBottom: '0.375rem' }}>
              ¿Cuánto vas a pagar?
            </h2>
            <p className="text-center" style={{ color: '#6b7280', fontSize: '0.78rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              Total de la mesa: <strong style={{ color: '#e4e4e7' }}>{fmt(total)}</strong>
            </p>

            <div className="flex flex-col" style={{ gap: '0.75rem' }}>
              {/* Opción: El total completo */}
              <button
                className="w-full font-bold flex items-center justify-between rounded-xl"
                style={{
                  background: 'rgba(0,158,227,0.12)',
                  border: '1px solid rgba(0,158,227,0.3)',
                  color: '#fff',
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                }}
                onClick={() => {
                  addAlert({ mesa: 'MESA 6', variant: 'paid', title: 'Pagado: Mercado Pago', subtitle: tipAmount > 0 ? `💸 + ${fmt(tipAmount)} propina` : undefined, icon: 'check_circle', emoji: '✅' });
                  addCajaAlert({ mesa: 'MESA 6', metodo: 'Mercado Pago', monto: fmt(total), tipoPago: 'PAGO TOTAL', propina: tipAmount > 0 ? fmt(tipAmount) : null });
                  setMpAmountModal(false);
                  navigate('/cliente/post-pago');
                }}
              >
                <span>El total completo</span>
                <span style={{ color: '#38bdf8', fontWeight: 900 }}>{fmt(total)}</span>
              </button>

              {/* Opción: Otro monto */}
              <div
                className="rounded-xl"
                style={{ background: '#13151f', border: '1px solid #1e293b', padding: '1rem 1.25rem' }}
              >
                <p className="font-semibold text-white" style={{ fontSize: '0.875rem', marginBottom: '0.625rem' }}>
                  Solo mi parte
                </p>
                <input
                  type="number"
                  inputMode="numeric"
                  value={mpCustomAmount}
                  onChange={(e) => setMpCustomAmount(e.target.value)}
                  placeholder="Ingresá el monto a pagar"
                  className="w-full"
                  style={{
                    background: '#1a1c29',
                    border: '1px solid #2d3748',
                    borderRadius: '0.625rem',
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  className="w-full font-bold text-white"
                  style={{
                    background: mpCustomAmount ? '#009EE3' : '#0a3a50',
                    color: mpCustomAmount ? '#fff' : '#4b5563',
                    padding: '0.875rem',
                    borderRadius: '0.625rem',
                    border: 'none',
                    cursor: mpCustomAmount ? 'pointer' : 'not-allowed',
                    fontSize: '0.9rem',
                    marginTop: '0.625rem',
                  }}
                  disabled={!mpCustomAmount}
                  onClick={() => {
                    if (!mpCustomAmount) return;
                    addAlert({ mesa: 'MESA 6', variant: 'paid', title: `Pagado: MP Parcial — ${fmt(Number(mpCustomAmount))}`, subtitle: tipAmount > 0 ? `💸 + ${fmt(tipAmount)} propina` : undefined, icon: 'check_circle', emoji: '✅' });
                    addCajaAlert({ mesa: 'MESA 6', metodo: 'Mercado Pago', monto: fmt(Number(mpCustomAmount)), tipoPago: 'PAGO PARCIAL', propina: tipAmount > 0 ? fmt(tipAmount) : null });
                    setMpAmountModal(false);
                    navigate('/cliente/post-pago');
                  }}
                >
                  Pagar {mpCustomAmount ? fmt(Number(mpCustomAmount)) : ''}
                </button>
              </div>

              <button
                style={{ background: 'transparent', color: '#6b7280', border: 'none', padding: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}
                onClick={() => setMpAmountModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </Phone>
  );
}
