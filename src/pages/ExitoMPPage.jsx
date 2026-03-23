import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

export default function ExitoMPPage() {
  const navigate = useNavigate();

  return (
    <Phone>
      <div
        className="flex flex-col items-center justify-center font-[Manrope,sans-serif] text-[#e1e1f1] relative"
        style={{ background: '#11131e', minHeight: '100%', padding: '2rem 1.5rem' }}
      >
        {/* ── Checkmark circle with pulse ── */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: '120px',
            height: '120px',
            background: 'rgba(0, 158, 227, 0.2)',
            animation: 'mp-pulse 2s ease-in-out infinite',
          }}
        >
          <svg width="48" height="48" fill="none" stroke="#009EE3" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* ── Title ── */}
        <h1
          className="font-extrabold tracking-tight text-center"
          style={{ fontSize: '1.875rem', color: '#e1e1f1', marginTop: '2rem' }}
        >
          ¡Pago Exitoso!
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="font-medium text-center"
          style={{ fontSize: '0.875rem', color: '#988ca0', marginTop: '0.5rem' }}
        >
          Tu pago por $23.320 fue procesado correctamente.
        </p>

        {/* ── Green confirmation ── */}
        <p
          className="font-bold text-center"
          style={{ fontSize: '0.875rem', color: '#4edea3', marginTop: '1.5rem' }}
        >
          La mesa ya está liberada. ¡Gracias por venir!
        </p>

        {/* ── Button ── */}
        <button
          className="font-bold w-full text-center"
          style={{
            maxWidth: '20rem',
            background: '#2a2a2c',
            color: '#fff',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '3rem',
            transition: 'transform 0.15s',
          }}
          onClick={() => navigate('/cliente')}
        >
          Volver al inicio
        </button>

        {/* ── Attribution ── */}
        <div
          className="flex items-center"
          style={{ marginTop: '4rem', gap: '0.375rem', color: '#4b5563', fontSize: '0.75rem' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#e8362a' }}>restaurant</span>
          <span>Tecnología HeyMozo</span>
        </div>

        {/* ── Background glow decorations ── */}
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(147,51,234,0.04)', filter: 'blur(100px)' }}
        />
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(78,222,163,0.05)', filter: 'blur(100px)' }}
        />

        <style>{`
          @keyframes mp-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.85; }
          }
        `}</style>
      </div>
    </Phone>
  );
}
