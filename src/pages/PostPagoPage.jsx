import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Phone from '../components/Phone';
import { clearCartAndOrder } from '../lib/cartStore';
import {
  getActivePhone,
  setActivePhone,
  registerVisit,
  VISITS_FOR_VOUCHER,
} from '../lib/loyaltyStore';

export default function PostPagoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pagoConfirmado = location.state?.pagoConfirmado === true;

  const [phoneInput, setPhoneInput] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [ratingSent, setRatingSent] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Estado club
  const [clubState, setClubState] = useState(() => ({
    phone: getActivePhone(),
    visits: 0,
    voucherJustUnlocked: false,
    voucherActive: false,
  }));

  useEffect(() => {
    // Limpiar carrito y orden al llegar al post-pago
    clearCartAndOrder();

    // Si ya hay un teléfono activo registrado, sumar visita automáticamente (una sola vez).
    if (getActivePhone() && !sessionStorage.getItem('hm_visit_counted')) {
      const res = registerVisit(getActivePhone());
      sessionStorage.setItem('hm_visit_counted', '1');
      if (res) {
        setClubState({
          phone: res.phone,
          visits: res.visits,
          voucherJustUnlocked: res.voucherJustUnlocked,
          voucherActive: res.voucherActive,
        });
      }
    }
  }, []);

  // Llamado tanto para cliente nuevo como para "sumar a otro" (padre sin batería).
  function handleRegisterPhone() {
    const clean = phoneInput.trim();
    if (!clean) return;
    // Si el activo no está fijado, lo fijamos
    if (!getActivePhone()) setActivePhone(clean);
    const res = registerVisit(clean);
    sessionStorage.setItem('hm_visit_counted', '1');
    if (res) {
      setClubState({
        phone: res.phone,
        visits: res.visits,
        voucherJustUnlocked: res.voucherJustUnlocked,
        voucherActive: res.voucherActive,
      });
    }
    setPhoneInput('');
    setShowAnotherPhone(false);
  }

  const alreadyCounted = !!clubState.phone && clubState.visits > 0;
  const visitsLeft = Math.max(0, VISITS_FOR_VOUCHER - clubState.visits);

  return (
    <Phone>
      <div
        className="flex flex-col items-center font-[Manrope,sans-serif] text-[#e1e1f1] relative"
        style={{ background: '#11131e', minHeight: '100%', padding: '1.5rem 1.5rem 0.5rem' }}
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
              width: '64px',
              height: '64px',
              background: '#272935',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              marginBottom: '0.75rem',
            }}
          >
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>🎉</span>
          </div>
          <h1
            className="font-extrabold tracking-tight"
            style={{ fontSize: '1.5rem', color: '#e1e1f1' }}
          >
            {pagoConfirmado ? '¡Pago confirmado!' : '¡Gracias por venir hoy!'}
          </h1>
          <p
            className="font-body"
            style={{ color: '#cfc2d7', fontSize: '0.9rem', marginTop: '0.25rem', opacity: 0.8 }}
          >
            {pagoConfirmado
              ? 'Tu transferencia fue verificada con éxito.'
              : 'Gracias por visitar Cervecería HeyMozo.'}
          </p>
        </div>

        {/* ── Section 2: Interactive Rating ── */}
        <div
          className="w-full relative z-10"
          style={{ marginTop: '1.25rem', background: '#191b26', padding: '1rem', borderRadius: '1rem' }}
        >
          <h2 className="font-bold text-center" style={{ color: '#e1e1f1' }}>
            ¿Cómo te atendimos hoy?
          </h2>

          {/* Stars */}
          <div className="flex items-center justify-center" style={{ gap: '0.75rem', marginTop: '0.75rem' }}>
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

          {/* Contenedor A: 4-5 estrellas → enviar + Google opcional */}
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
              {ratingSent ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p style={{ color: '#86efac', fontSize: '0.875rem', fontWeight: 700 }}>
                    ✅ ¡Gracias! Tu calificación fue enviada.
                  </p>
                  <button
                    className="w-full font-bold"
                    style={{
                      background: '#1d4ed8',
                      color: '#fff',
                      padding: '0.875rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    📍 También reseñar en Google Maps
                  </button>
                </div>
              ) : (
                <>
                  <p style={{ color: '#d1d5db', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.875rem' }}>
                    ¡Gracias! 🙏 ¿Cómo fue tu experiencia?
                  </p>
                  <button
                    className="w-full font-bold"
                    style={{
                      background: '#facc15',
                      color: '#1a1a1a',
                      padding: '0.875rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                    onClick={() => setRatingSent(true)}
                  >
                    ⭐ Enviar calificación
                  </button>
                </>
              )}
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
              {feedbackSent ? (
                <p style={{ color: '#86efac', fontSize: '0.875rem', fontWeight: 700 }}>
                  ✅ Feedback recibido. ¡Gracias por ayudarnos a mejorar!
                </p>
              ) : (
                <>
                  <p style={{ color: '#d1d5db', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    ¡Lo sentimos! 😞 Contanos qué pasó (es privado):
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
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  />
                  <button
                    className="w-full font-bold"
                    style={{
                      background: feedback.trim() ? '#dc2626' : '#4b5563',
                      color: '#fff',
                      padding: '0.875rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: feedback.trim() ? 'pointer' : 'default',
                      fontSize: '0.875rem',
                      transition: 'background 0.2s',
                    }}
                    onClick={() => { if (feedback.trim()) setFeedbackSent(true); }}
                  >
                    Enviar feedback
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Section 3: Club ── */}
        <div
          className="w-full relative overflow-hidden z-10"
          style={{
            marginTop: '0.875rem',
            background: '#1d1f2a',
            border: '1px solid rgba(147,51,234,0.2)',
            padding: '1.25rem',
            borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          }}
        >
          <div className="absolute rounded-full" style={{ top: '-3rem', right: '-3rem', width: '8rem', height: '8rem', background: 'rgba(147,51,234,0.1)', filter: 'blur(48px)' }} />

          <div className="relative z-10">
            {/* A) Voucher recién desbloqueado */}
            {clubState.voucherJustUnlocked ? (
              <div className="flex flex-col items-center text-center" style={{ gap: '0.75rem' }}>
                <span style={{ fontSize: '3rem', lineHeight: 1 }}>🍺</span>
                <h3 className="font-extrabold" style={{ fontSize: '1.375rem', color: '#ddb8ff' }}>
                  ¡Desbloqueaste tu Pinta Gratis!
                </h3>
                <p style={{ color: '#cfc2d7', fontSize: '0.85rem', lineHeight: 1.5, maxWidth: '280px' }}>
                  Llegaste a <strong>{VISITS_FOR_VOUCHER} visitas</strong>. Canjeá tu pinta gratis la próxima vez que vengas — el mozo la aplica al escanear el QR.
                </p>
                <div
                  className="inline-flex items-center rounded-2xl"
                  style={{
                    background: 'rgba(147,51,234,0.18)',
                    border: '1px dashed rgba(221,184,255,0.5)',
                    padding: '0.625rem 1.25rem',
                    gap: '0.5rem',
                    marginTop: '0.25rem',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>🎟️</span>
                  <span style={{ color: '#ddb8ff', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Voucher activo
                  </span>
                </div>
              </div>
            ) : alreadyCounted ? (
              /* B) Cliente recurrente — visita sumada */
              <div className="flex flex-col items-center text-center" style={{ gap: '0.75rem' }}>
                <span style={{ fontSize: '2.5rem' }}>🎁</span>
                <h3 className="font-extrabold" style={{ fontSize: '1.25rem', color: '#ddb8ff' }}>
                  ¡Visita sumada al Club!
                </h3>
                <div
                  className="flex items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(147,51,234,0.12)', border: '1px solid rgba(147,51,234,0.25)', padding: '0.875rem 1.5rem', gap: '0.75rem' }}
                >
                  <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>🍺</span>
                  <div className="text-left">
                    <p className="font-black" style={{ color: '#ddb8ff', fontSize: '1.5rem', lineHeight: 1 }}>{clubState.visits}</p>
                    <p style={{ color: '#988ca0', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {clubState.visits === 1 ? 'visita' : 'visitas'}
                    </p>
                  </div>
                </div>
                <p style={{ color: '#988ca0', fontSize: '0.8rem', lineHeight: 1.5 }}>
                  Te {visitsLeft === 1 ? 'falta' : 'faltan'} <strong style={{ color: '#ddb8ff' }}>{visitsLeft}</strong> {visitsLeft === 1 ? 'visita' : 'visitas'} para tu pinta gratis.
                </p>
              </div>
            ) : (
              /* C) Cliente nuevo o sin teléfono todavía */
              <>
                <h3
                  className="font-extrabold flex items-center"
                  style={{ fontSize: '1.125rem', color: '#ddb8ff', gap: '0.5rem', marginBottom: '0.5rem' }}
                >
                  ¡Pinta Gratis! 🍺
                </h3>
                <p style={{ color: '#cfc2d7', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Sumá esta visita al Club. A las <strong>{VISITS_FOR_VOUCHER} visitas</strong> te regalamos una pinta.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Número de WhatsApp"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full"
                    style={{
                      background: '#323440',
                      border: 'none',
                      color: '#e1e1f1',
                      borderRadius: '0.75rem',
                      padding: '0.875rem 1rem',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  />
                  <button
                    className="w-full font-black text-center uppercase"
                    onClick={handleRegisterPhone}
                    style={{
                      background: phoneInput.trim() ? '#9333ea' : '#323440',
                      color: phoneInput.trim() ? '#f6e6ff' : '#64748b',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      cursor: phoneInput.trim() ? 'pointer' : 'default',
                      fontSize: '0.8rem',
                      letterSpacing: '0.08em',
                      boxShadow: phoneInput.trim() ? '0 10px 25px rgba(147,51,234,0.2)' : 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    Sumar esta visita
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

        {/* ── Footer ── */}
        <div className="relative z-10 text-center" style={{ marginTop: '1.25rem', marginBottom: '1rem' }}>
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
            Volver al inicio
          </a>
        </div>
      </div>
    </Phone>
  );
}
