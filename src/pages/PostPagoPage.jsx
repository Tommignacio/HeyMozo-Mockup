import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

export default function PostPagoPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <Phone>
      <div
        className="flex flex-col items-center font-[Manrope,sans-serif] text-[#e1e1f1] relative"
        style={{ background: '#11131e', minHeight: '100%', padding: '3rem 1.5rem 2rem' }}
      >
        {/* ── Radial glow background ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(147,51,234,0.15) 0%, rgba(17,19,30,0) 70%)' }}
        />

        {/* ── Section 1: Thank You ── */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: '96px',
              height: '96px',
              background: '#272935',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ fontSize: '3rem', lineHeight: 1 }}>🎉</span>
          </div>
          <h1
            className="font-extrabold tracking-tight"
            style={{ fontSize: '1.875rem', color: '#e1e1f1' }}
          >
            ¡Pago confirmado!
          </h1>
          <p
            className="font-body"
            style={{ color: '#cfc2d7', fontSize: '1.125rem', marginTop: '0.5rem', opacity: 0.8 }}
          >
            Gracias por visitar Cervecería HeyMozo.
          </p>
        </div>

        {/* ── Section 2: Interactive Rating ── */}
        <div
          className="w-full relative z-10"
          style={{ marginTop: '3rem', background: '#191b26', padding: '1.5rem', borderRadius: '1rem' }}
        >
          <h2 className="font-bold text-center" style={{ color: '#e1e1f1' }}>
            ¿Cómo te atendimos hoy?
          </h2>

          {/* Stars */}
          <div className="flex items-center justify-center" style={{ gap: '0.75rem', marginTop: '1.25rem' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="material-symbols-outlined cursor-pointer"
                onClick={() => setRating(i)}
                style={{
                  color: i <= rating ? '#facc15' : '#4b5563',
                  fontSize: '2rem',
                  fontVariationSettings: i <= rating ? "'FILL' 1" : "'FILL' 0",
                  transition: 'color 0.15s, transform 0.15s',
                  transform: i <= rating ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                star
              </span>
            ))}
          </div>

          {/* Contenedor A: 4-5 estrellas → Google */}
          {rating >= 4 && (
            <div
              style={{
                marginTop: '1rem',
                background: 'rgba(30,58,138,0.2)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '0.75rem',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <p style={{ color: '#d1d5db', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.875rem' }}>
                ¡Gracias! 🙏 Ayúdanos con una reseña:
              </p>
              <button
                className="w-full font-bold"
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  padding: '0.875rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                📍 Reseñar en Google Maps
              </button>
            </div>
          )}

          {/* Contenedor B: 1-3 estrellas → Feedback privado */}
          {rating >= 1 && rating <= 3 && (
            <div
              style={{
                marginTop: '1rem',
                background: 'rgba(127,29,29,0.2)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '0.75rem',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <p style={{ color: '#d1d5db', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                ¡Lo sentimos! 😞 Ayúdanos a mejorar. (Feedback privado)
              </p>
              <textarea
                placeholder="Tu mensaje..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="w-full"
                style={{
                  background: '#374151',
                  border: 'none',
                  color: '#e1e1f1',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'none',
                  marginBottom: '0.75rem',
                }}
              />
              <button
                className="w-full font-bold"
                style={{
                  background: '#4b5563',
                  color: '#fff',
                  padding: '0.875rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Enviar feedback
              </button>
            </div>
          )}
        </div>

        {/* ── Section 3: Discount Club ── */}
        <div
          className="w-full relative overflow-hidden z-10"
          style={{
            marginTop: '1.5rem',
            background: '#1d1f2a',
            border: '1px solid rgba(147,51,234,0.2)',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          }}
        >
          {/* Subtle glow */}
          <div
            className="absolute rounded-full"
            style={{ top: '-3rem', right: '-3rem', width: '8rem', height: '8rem', background: 'rgba(147,51,234,0.1)', filter: 'blur(48px)' }}
          />

          <div className="relative z-10">
            <h3
              className="font-extrabold flex items-center"
              style={{ fontSize: '1.25rem', color: '#ddb8ff', gap: '0.5rem', marginBottom: '0.75rem' }}
            >
              ¡Pinta Gratis! 🍺
            </h3>
            <p
              style={{ color: '#cfc2d7', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}
            >
              ¡Súmate al Club!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="tel"
                placeholder="Tu celular"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
                style={{
                  background: '#323440',
                  border: 'none',
                  color: '#e1e1f1',
                  borderRadius: '9999px',
                  padding: '1rem 1.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
              <button
                className="w-full font-black text-center uppercase"
                style={{
                  background: '#9333ea',
                  color: '#f6e6ff',
                  padding: '1.25rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  letterSpacing: '0.08em',
                  boxShadow: '0 10px 25px rgba(147,51,234,0.2)',
                  transition: 'transform 0.15s',
                }}
              >
                ¡Quiero mi pinta!
              </button>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="relative z-10 text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <a
            href="#"
            className="font-body"
            style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onClick={(e) => { e.preventDefault(); navigate('/cliente'); }}
          >
            No gracias, volver al inicio
          </a>
        </div>
      </div>
    </Phone>
  );
}
