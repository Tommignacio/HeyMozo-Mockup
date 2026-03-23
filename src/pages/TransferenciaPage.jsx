import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

export default function TransferenciaPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText('CERVECERIA.HEYMOZO').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleConfirm() {
    setSent(true);
    setTimeout(() => navigate('/cliente'), 2000);
  }

  /* ── SVG icons ── */
  const chevronLeft = (
    <svg width="20" height="20" fill="none" stroke="#ddb8ff" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );

  const iconCopy = (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );

  const iconPerson = (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 00-16 0" />
    </svg>
  );

  const iconBadge = (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h4m-4 4h10" />
    </svg>
  );

  return (
    <Phone>
      <div
        className="flex flex-col font-[Manrope,sans-serif] text-[#e1e1f1]"
        style={{ background: '#11131e', minHeight: '100%' }}
      >
        {/* ── Header ── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: '#11131e',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            {chevronLeft}
          </button>
          <h1
            className="font-bold"
            style={{
              color: '#ddb8ff',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Transferencia - Mesa 4
          </h1>
          <div style={{ width: '24px' }} />
        </header>

        {/* ── Main ── */}
        <main style={{ padding: '1rem 1.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '420px', margin: '0 auto', width: '100%' }}>

          {/* Intro text */}
          <div className="text-center" style={{ marginBottom: '0.5rem' }}>
            <h2 className="font-extrabold" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              Completa tu pago
            </h2>
            <p style={{ color: '#988ca0', fontSize: '0.875rem' }}>
              Transferi el monto exacto para confirmar tu pedido.
            </p>
          </div>

          {/* ── Main Card ── */}
          <section
            className="w-full rounded-2xl text-center relative overflow-hidden"
            style={{
              background: '#2a2a2c',
              padding: '1.5rem',
              marginTop: '2rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            {/* Glow */}
            <div
              className="absolute rounded-full"
              style={{ top: '-3rem', right: '-3rem', width: '6rem', height: '6rem', background: 'rgba(147,51,234,0.1)', filter: 'blur(48px)' }}
            />

            {/* Monto */}
            <span
              className="font-bold block"
              style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#988ca0', marginBottom: '0.25rem' }}
            >
              Monto a transferir
            </span>
            <div
              className="font-extrabold"
              style={{ fontSize: '2.25rem', color: '#4edea3', letterSpacing: '-0.04em', marginTop: '0.5rem' }}
            >
              $23.320
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(77,67,84,0.3)', margin: '1.5rem 0' }} />

            <p className="font-medium" style={{ fontSize: '0.875rem', color: '#cfc2d7', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Realiza la transferencia a esta cuenta:
            </p>

            {/* Alias Box */}
            <div
              className="flex justify-between items-center cursor-pointer"
              style={{
                background: '#0b0e18',
                borderRadius: '0.75rem',
                padding: '1rem',
                transition: 'transform 0.15s',
              }}
              onClick={handleCopy}
            >
              <div className="flex flex-col items-start">
                <span style={{ fontSize: '0.625rem', color: '#988ca0', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '2px' }}>
                  Alias
                </span>
                <span className="font-bold" style={{ color: '#e1e1f1', fontSize: '0.875rem', letterSpacing: '0.04em' }}>
                  CERVECERIA.HEYMOZO
                </span>
              </div>
              <div className="flex items-center" style={{ gap: '0.375rem', color: '#ddb8ff' }}>
                {iconCopy}
                <span className="font-bold" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {copied ? 'Copiado!' : 'Copiar'}
                </span>
              </div>
            </div>

            {/* Titular info */}
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <div className="flex items-center justify-center" style={{ gap: '0.375rem', color: '#988ca0' }}>
                {iconPerson}
                <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>Titular: Juan Perez</span>
              </div>
              <div className="flex items-center justify-center" style={{ gap: '0.375rem', color: '#988ca0' }}>
                {iconBadge}
                <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>CUIT: 30-12345678-9</span>
              </div>
            </div>
          </section>

          {/* ── CTA Button ── */}
          <div className="w-full" style={{ marginTop: '2.5rem' }}>
            <button
              className="w-full font-extrabold flex items-center justify-center"
              style={{
                background: sent ? '#16a34a' : '#9333ea',
                color: '#fff',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.125rem',
                gap: '0.75rem',
                boxShadow: '0 10px 25px rgba(147,51,234,0.2)',
                transition: 'transform 0.15s, background 0.3s',
              }}
              onClick={handleConfirm}
              disabled={sent}
            >
              <span style={{ fontSize: '1.25rem' }}>{sent ? '✓' : '✅'}</span>
              {sent ? 'Enviado a caja' : 'Ya realice la transferencia'}
            </button>
            <p className="text-center" style={{ fontSize: '0.75rem', color: '#988ca0', marginTop: '0.75rem', fontStyle: 'italic' }}>
              (Al tocar, le avisaremos a la caja para que lo valide)
            </p>
          </div>

          {/* Help link */}
          <div
            className="flex items-center cursor-pointer"
            style={{ marginTop: '3rem', gap: '0.5rem', color: '#ddb8ff', opacity: 0.6, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}
          >
            <span>?</span>
            <span>Necesitas ayuda?</span>
          </div>
        </main>

        {/* ── Bottom gradient decoration ── */}
        <div
          className="fixed pointer-events-none"
          style={{ bottom: 0, left: 0, right: 0, height: '8rem', background: 'linear-gradient(to top, rgba(147,51,234,0.05), transparent)' }}
        />
      </div>
    </Phone>
  );
}
