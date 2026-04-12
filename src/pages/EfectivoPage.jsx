import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import { getOrderTotal } from '../lib/cartStore';

function fmt(n) {
  return '$' + n.toLocaleString('es-CL');
}

export default function EfectivoPage() {
  const navigate = useNavigate();
  const TOTAL = getOrderTotal();

  return (
    <Phone>
      <div
        className="flex flex-col items-center justify-center font-[Manrope,sans-serif] text-[#e1e1f1] relative"
        style={{ background: '#11131e', minHeight: '100%', padding: '2rem 1.5rem' }}
      >
        {/* ── Animated circle with cash icon ── */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: '120px',
            height: '120px',
            background: 'rgba(34, 197, 94, 0.2)',
            animation: 'efectivo-glow 3s ease-in-out infinite',
          }}
        >
          <span style={{ fontSize: '3rem', lineHeight: 1 }}>💵</span>
        </div>

        {/* ── Title ── */}
        <h1
          className="font-bold tracking-tight text-center"
          style={{ fontSize: '1.875rem', color: '#e1e1f1', marginTop: '1.5rem' }}
        >
          ¡Mozo en camino!
        </h1>

        {/* ── Subtitle ── */}
        <p
          className="font-medium text-center"
          style={{ fontSize: '0.875rem', color: '#988ca0', marginTop: '0.75rem', maxWidth: '280px' }}
        >
          Tu mozo ya fue notificado y pasará a cobrarte en efectivo.
        </p>

        {/* ── Summary card ── */}
        <div
          className="w-full text-center"
          style={{
            maxWidth: '320px',
            background: '#1f2937',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginTop: '1.5rem',
          }}
        >
          {TOTAL > 0 ? (
            <>
              <span
                className="font-bold block"
                style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#988ca0' }}
              >
                Total a pagar
              </span>
              <span
                className="font-extrabold block"
                style={{ fontSize: '1.5rem', color: '#e1e1f1', marginTop: '0.25rem', letterSpacing: '-0.02em' }}
              >
                {fmt(TOTAL)}
              </span>
            </>
          ) : (
            <>
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>🧾</span>
              <p style={{ fontSize: '0.82rem', color: '#e1e1f1', fontWeight: 600, marginTop: '0.5rem', lineHeight: 1.4 }}>
                El mozo te lleva el ticket a la mesa
              </p>
              <p style={{ fontSize: '0.72rem', color: '#988ca0', marginTop: '0.375rem', lineHeight: 1.4 }}>
                Prepará el efectivo según el total del ticket.
              </p>
            </>
          )}
        </div>

        {/* ── Action button ── */}
        <button
          className="font-bold w-full text-center"
          style={{
            maxWidth: '320px',
            background: '#16a34a',
            color: '#fff',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '2rem',
            transition: 'transform 0.15s',
          }}
          onClick={() => navigate('/cliente/post-pago')}
        >
          Entendido, lo espero
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
          style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(34,197,94,0.05)', filter: 'blur(100px)' }}
        />

        <style>{`
          @keyframes efectivo-glow {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(34,197,94,0); }
            50% { transform: scale(1.06); box-shadow: 0 0 40px rgba(34,197,94,0.15); }
          }
        `}</style>
      </div>
    </Phone>
  );
}
