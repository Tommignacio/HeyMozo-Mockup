import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import { getOrderTotal } from '../lib/cartStore';

function fmt(n) {
  return '$' + n.toLocaleString('es-CL');
}
const CONSUMO = getOrderTotal() || 21200;

function useMesa6Status() {
  const [status, setStatus] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mesa6Status')); } catch { return 'NONE'; }
  });

  useEffect(() => {
    // Poll every second for same-tab changes
    const id = setInterval(() => {
      try {
        const v = JSON.parse(localStorage.getItem('mesa6Status'));
        if (v !== status) setStatus(v);
      } catch { /* ignore */ }
    }, 1000);
    // Listen for cross-tab changes
    const onStorage = (e) => {
      if (e.key === 'mesa6Status') {
        try { setStatus(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(id);
      window.removeEventListener('storage', onStorage);
    };
  }, [status]);

  return status;
}

export default function ValidandoTransferenciaPage() {
  const navigate = useNavigate();
  const mesa6Status = useMesa6Status();

  // Redirect on approval
  useEffect(() => {
    if (mesa6Status === 'APPROVED') {
      navigate('/cliente/post-pago', { state: { pagoConfirmado: true } });
    }
  }, [mesa6Status, navigate]);

  const rejected = mesa6Status === 'REJECTED';

  /* ── SVG icons ── */
  const iconSync = (
    <svg width="48" height="48" fill="none" stroke="#818cf8" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );

  const iconError = (
    <svg width="48" height="48" fill="none" stroke="#ef4444" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );

  return (
    <Phone>
      <div
        className="flex flex-col items-center justify-center font-[Manrope,sans-serif] text-[#e1e1f1] relative"
        style={{ background: '#11131e', minHeight: '100%', padding: '2rem 1.5rem' }}
      >
        {/* ── Animated circle ── */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: '120px',
            height: '120px',
            background: rejected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
            animation: rejected ? 'none' : 'validando-pulse 2.5s ease-in-out infinite',
          }}
        >
          {rejected ? (
            iconError
          ) : (
            <div style={{ animation: 'validando-spin 3s linear infinite' }}>
              {iconSync}
            </div>
          )}
        </div>

        {/* ── Title ── */}
        <h1
          className="font-bold tracking-tight text-center"
          style={{ fontSize: '1.875rem', color: '#e1e1f1', marginTop: '1.5rem' }}
        >
          {rejected ? 'Transferencia rechazada' : '¡Aviso enviado a la caja!'}
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="font-medium text-center"
          style={{
            fontSize: '0.875rem',
            color: rejected ? '#fca5a5' : '#9ca3af',
            marginTop: '0.75rem',
            padding: '0 1rem',
            maxWidth: '340px',
            lineHeight: '1.6',
          }}
        >
          {rejected
            ? 'La caja no pudo verificar tu transferencia. Intentá otro método de pago o consultá con el mozo.'
            : `Estamos verificando tu transferencia de ${fmt(CONSUMO)}. Aguardá un momento...`}
        </p>

        {/* ── Escape route card (only when waiting) ── */}
        {!rejected && (
          <div
            className="w-full flex"
            style={{
              maxWidth: '360px',
              background: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '1rem',
              padding: '1.25rem',
              marginTop: '2rem',
              gap: '1rem',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>💡</span>
            <div>
              <p className="font-bold" style={{ color: '#e1e1f1', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                ¿Estás apurado?
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: '1.5' }}>
                Tu parte ya está hecha. Si necesitás retirarte, simplemente mostrale el comprobante de tu banco al mozo al pasar. ¡Gracias por venir!
              </p>
            </div>
          </div>
        )}

        {/* ── Cancel / Retry link ── */}
        <button
          className="text-center"
          style={{
            background: 'none',
            border: 'none',
            color: rejected ? '#818cf8' : '#6b7280',
            fontSize: '0.8rem',
            cursor: 'pointer',
            marginTop: '2rem',
            paddingBottom: '1.5rem',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: rejected ? 600 : 400,
          }}
          onClick={() => navigate('/cliente/pagar')}
        >
          {rejected ? 'Elegir otro medio de pago' : 'Cancelar y elegir otro medio de pago'}
        </button>

        {/* ── Background glow decorations ── */}
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(147,51,234,0.04)', filter: 'blur(100px)' }}
        />
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: rejected ? 'rgba(239,68,68,0.04)' : 'rgba(99,102,241,0.04)', filter: 'blur(100px)' }}
        />

        <style>{`
          @keyframes validando-pulse {
            0%, 100% { box-shadow: 0 0 0 rgba(99,102,241,0); transform: scale(1); }
            50% { box-shadow: 0 0 40px rgba(99,102,241,0.15); transform: scale(1.04); }
          }
          @keyframes validando-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Phone>
  );
}
