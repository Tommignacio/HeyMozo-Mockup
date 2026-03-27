import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

export default function ValidandoTransferenciaPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/cliente/post-pago'), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  /* ── Sync arrows icon ── */
  const iconSync = (
    <svg width="48" height="48" fill="none" stroke="#818cf8" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );

  return (
    <Phone>
      <div
        className="flex flex-col items-center justify-center font-[Manrope,sans-serif] text-[#e1e1f1] relative"
        style={{ background: '#11131e', minHeight: '100%', padding: '2rem 1.5rem' }}
      >
        {/* ── Animated circle with sync icon ── */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: '120px',
            height: '120px',
            background: 'rgba(99, 102, 241, 0.1)',
            animation: 'validando-pulse 2.5s ease-in-out infinite',
          }}
        >
          <div style={{ animation: 'validando-spin 3s linear infinite' }}>
            {iconSync}
          </div>
        </div>

        {/* ── Title ── */}
        <h1
          className="font-bold tracking-tight text-center"
          style={{ fontSize: '1.875rem', color: '#e1e1f1', marginTop: '1.5rem' }}
        >
          ¡Aviso enviado a la caja!
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="font-medium text-center"
          style={{
            fontSize: '0.875rem',
            color: '#9ca3af',
            marginTop: '0.75rem',
            padding: '0 1rem',
            maxWidth: '340px',
            lineHeight: '1.6',
          }}
        >
          Estamos verificando tu transferencia de $23.320. Aguardá un momento...
        </p>

        {/* ── Escape route card ── */}
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

        {/* ── Cancel link ── */}
        <button
          className="text-center"
          style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            fontSize: '0.8rem',
            cursor: 'pointer',
            marginTop: '2rem',
            paddingBottom: '1.5rem',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
          onClick={() => navigate('/cliente/pagar')}
        >
          Cancelar y elegir otro medio de pago
        </button>

        {/* ── Background glow decorations ── */}
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(147,51,234,0.04)', filter: 'blur(100px)' }}
        />
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(99,102,241,0.04)', filter: 'blur(100px)' }}
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
