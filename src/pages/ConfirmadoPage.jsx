import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

export default function ConfirmadoPage() {
  const navigate = useNavigate();

  return (
    <Phone>
      <div
        className="flex flex-col items-center justify-center font-[Inter,sans-serif] text-white"
        style={{ background: '#1c1c1e', minHeight: '100%', padding: '2rem 1.5rem' }}
      >
        {/* ── Success icon ── */}
        <div className="relative flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: '112px',
              height: '112px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              animation: 'ring-pulse 2s infinite',
            }}
          >
            <svg
              className="h-14 w-14 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Chef emoji */}
          <div
            className="absolute rounded-full"
            style={{
              bottom: 0,
              right: 0,
              background: '#1c1c1e',
              padding: '4px',
              fontSize: '1.5rem',
              lineHeight: 1,
            }}
          >
            👨‍🍳
          </div>
        </div>

        {/* ── Texts ── */}
        <h1
          className="font-bold tracking-tight text-center"
          style={{ fontSize: '1.875rem', marginTop: '1.5rem' }}
        >
          ¡Pedido en marcha!
        </h1>
        <p
          className="text-center"
          style={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            marginTop: '0.75rem',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            maxWidth: '320px',
          }}
        >
          La cocina ya recibió tu orden. Relajate, el mozo llevará todo a tu mesa apenas esté listo.
        </p>

        {/* ── Summary card ── */}
        <div
          className="w-full rounded-2xl"
          style={{
            background: '#2c2c2e',
            padding: '1.25rem',
            marginTop: '2rem',
            maxWidth: '380px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          }}
        >
          {/* Mesa row */}
          <div className="flex justify-between items-center" style={{ padding: '4px 0' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mesa
            </span>
            <span className="font-semibold text-white">Mesa 4</span>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #3a3a3c', margin: '0.75rem 0' }} />

          {/* Total row */}
          <div className="flex justify-between items-center" style={{ padding: '4px 0' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Total</span>
            <span className="font-bold text-white" style={{ fontSize: '1.25rem' }}>$21.200</span>
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-center" style={{ marginTop: '1rem', gap: '0.5rem' }}>
            <span className="relative flex" style={{ height: '8px', width: '8px' }}>
              <span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{ background: '#4ade80', opacity: 0.75, animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }}
              />
              <span
                className="relative inline-flex rounded-full"
                style={{ height: '8px', width: '8px', background: '#22c55e' }}
              />
            </span>
            <span style={{ color: '#4ade80', fontSize: '0.875rem', fontWeight: 500 }}>
              Enviado a cocina
            </span>
          </div>
        </div>

        {/* ── Back button ── */}
        <button
          className="w-full font-semibold text-white"
          style={{
            maxWidth: '380px',
            marginTop: '2rem',
            background: '#9333ea',
            borderRadius: '0.75rem',
            padding: '1rem',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(147,51,234,0.2)',
          }}
          onClick={() => navigate('/cliente')}
        >
          Volver a mi mesa
        </button>

        {/* ── Background glow decoration ── */}
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }}
        />
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }}
        />

        {/* ── Keyframe animations ── */}
        <style>{`
          @keyframes ring-pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        `}</style>
      </div>
    </Phone>
  );
}
