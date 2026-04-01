import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

const QUICK_ACTIONS = [
  { emoji: '🧊', label: 'Hielo' },
  { emoji: '🧂', label: 'Condimentos' },
  { emoji: '🧻', label: 'Servilletas' },
  { emoji: '🧹', label: 'Limpiar mesa' },
];

export default function ClientePage() {
  const navigate = useNavigate();
  const [mozoSheetOpen, setMozoSheetOpen] = useState(false);
  const [mozoSent, setMozoSent] = useState(null);
  const [vipSheetOpen, setVipSheetOpen] = useState(false);
  const [vipPhone, setVipPhone] = useState('');
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Phone>
      <div
        className="flex flex-col text-white font-[Inter,sans-serif]"
        style={{ background: '#1c1c1e', minHeight: '100%' }}
      >
        <div className="flex-1 flex flex-col">
          {/* Header — Logo del restaurante */}
          <header className="flex flex-col items-center justify-center" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
            {/* Nav gear — top right */}
            <div className="absolute top-3 right-3 z-20">
              <button
                type="button"
                className="text-[#8e8e93] hover:text-white transition-colors bg-transparent border-none p-2 cursor-pointer"
                onClick={() => setNavOpen((v) => !v)}
              >
                <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'currentColor' }}>
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.03-1.58zm-7.14 2.66c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
              </button>
              {navOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNavOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-50 rounded-2xl overflow-hidden" style={{ background: '#2c2c2e', border: '1px solid #3a3a3c', minWidth: 170, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] font-semibold text-white flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none font-[inherit]"
                      style={{ transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='#3a3a3c'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      onClick={() => { setNavOpen(false); navigate('/mozo'); }}
                    >
                      Vista Mozo
                      <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: '#aaa', flexShrink: 0 }}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                    </button>
                    <div style={{ borderTop: '1px solid #3a3a3c' }} />
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] font-semibold text-white flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none font-[inherit]"
                      style={{ transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='#3a3a3c'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      onClick={() => { setNavOpen(false); navigate('/cajero'); }}
                    >
                      Dashboard Cajero
                      <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: '#aaa', flexShrink: 0 }}><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                    </button>
                    <div style={{ borderTop: '1px solid #3a3a3c' }} />
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] font-semibold flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none font-[inherit]"
                      style={{ color: '#ef4444', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='#3a3a3c'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      onClick={() => { setNavOpen(false); sessionStorage.clear(); window.location.reload(); }}
                    >
                      Reiniciar Demo
                      <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: 'currentColor', flexShrink: 0 }}><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3" style={{ marginBottom: '2.5rem' }}>
              <div
                className="flex items-center justify-center rounded-full"
                style={{ background: '#e8362a', padding: '0.5rem' }}
              >
                <span className="material-symbols-outlined text-white text-2xl shrink-0">restaurant</span>
              </div>
              <span className="text-white text-xl font-black tracking-tight">Mi Resto</span>
            </div>
          </header>

          <main className="flex-1 flex flex-col items-center" style={{ padding: '0 1.5rem' }}>
            {/* Saludo — Foco en el ¡Hola! gigante */}
            <div className="text-center space-y-1" style={{ marginBottom: '3rem' }}>
              <h1 className="text-white font-extrabold tracking-tight" style={{ fontSize: '3.75rem' }}>¡Hola!</h1>
              <p className="text-gray-400 text-sm font-medium" style={{ paddingTop: '0.5rem' }}>
                Estás en la&nbsp;<span style={{ fontSize: '0.875rem' }}>Mesa 4</span>
              </p>
            </div>

            {/* Botones principales */}
            <div className="w-full flex flex-col" style={{ maxWidth: '24rem', gap: '1.25rem' }}>
              {/* Ver Menú y Pedir */}
              <button
                className="w-full flex items-center justify-center gap-3 text-white font-bold rounded-2xl active:scale-95 transition-transform duration-100"
                style={{
                  background: '#9333ea',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 10px 25px rgba(147, 51, 234, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                }}
                onClick={() => navigate('/cliente/menu')}
              >
                <span className="material-symbols-outlined text-2xl">restaurant_menu</span>
                <span>Ver Menú y Pedir</span>
              </button>

              {/* Llamar al Mozo */}
              <button
                className="w-full flex items-center justify-center gap-3 text-white font-bold rounded-2xl active:scale-95 transition-transform duration-100"
                style={{
                  background: '#e07b00',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 10px 25px rgba(224, 123, 0, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                }}
                onClick={() => setMozoSheetOpen(true)}
              >
                <span className="material-symbols-outlined text-2xl font-bold">notifications_active</span>
                <span>Llamar al Mozo</span>
              </button>

              {/* Pagar / Dejar Propina */}
              <button
                className="w-full flex items-center justify-center gap-3 text-white font-bold rounded-2xl active:scale-95 transition-transform duration-100"
                style={{
                  background: '#16a34a',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 10px 25px rgba(22, 163, 74, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                }}
                onClick={() => navigate('/cliente/pagar')}
              >
                <span className="material-symbols-outlined text-2xl">credit_card</span>
                <span>Pagar / Dejar Propina</span>
              </button>
            </div>

            {/* Botón VIP Club */}
            <div className="text-center" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
              <button
                style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', padding: 0 }}
                onClick={() => setVipSheetOpen(true)}
              >
                🎁 ¿Ya sos del Club? Recuperá tu regalo acá
              </button>
            </div>
          </main>
        </div>

        {/* Footer — Atribución HeyMozo */}
        <footer className="text-center w-full" style={{ padding: '1rem 1.5rem 2rem' }}>
          <div
            className="flex flex-col items-center gap-1"
            style={{ paddingTop: '1.5rem', borderTop: '1px solid #3a3a3c' }}
          >
            <div
              className="flex items-center gap-1.5 font-medium"
              style={{ fontSize: '0.75rem', color: '#4b5563' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#e8362a' }}>restaurant</span>
              <span>Tecnología HeyMozo</span>
            </div>
          </div>
        </footer>

        {/* Decoración de fondo — glow rojizo apagado (izq) + púrpura (der) */}
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }}
        />
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }}
        />
      </div>

      {/* ── Bottom Sheet: VIP Club ── */}
      {vipSheetOpen && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0, 0, 0, 0.70)' }}
          onClick={() => setVipSheetOpen(false)}
        >
          <div
            className="w-full"
            style={{
              background: '#1a1c29',
              borderRadius: '24px 24px 0 0',
              padding: '1.5rem',
              animation: 'mozo-slide-up 0.3s ease-out forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
              <div className="rounded-full" style={{ width: '48px', height: '6px', background: '#4b5563' }} />
            </div>

            {/* Title */}
            <h2 className="text-white text-xl font-bold text-center">¡Hola de nuevo! 👑</h2>
            <p className="text-center text-sm" style={{ color: '#9ca3af', marginTop: '0.5rem', padding: '0 0.5rem' }}>
              Ingresá tu celular para activar tus beneficios exclusivos en el menú de hoy.
            </p>

            {/* Phone input */}
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Tu WhatsApp (ej: 11 1234 5678)"
              value={vipPhone}
              onChange={(e) => setVipPhone(e.target.value)}
              className="w-full"
              style={{
                background: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.75rem',
                padding: '1rem',
                color: '#e1e1f1',
                fontSize: '1rem',
                outline: 'none',
                marginTop: '1.5rem',
                fontFamily: 'Inter, sans-serif',
              }}
            />

            {/* CTA button */}
            <button
              className="w-full font-bold text-white"
              style={{
                background: '#9333ea',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                marginTop: '1rem',
                boxShadow: '0 10px 25px rgba(147,51,234,0.2)',
              }}
              onClick={() => setVipSheetOpen(false)}
            >
              Activar mis beneficios
            </button>

            {/* Cancel */}
            <div className="flex justify-center" style={{ marginTop: '1rem', marginBottom: '0.25rem' }}>
              <button
                className="text-sm"
                style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setVipSheetOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Sheet: Llamar al Mozo ── */}
      {mozoSheetOpen && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0, 0, 0, 0.70)' }}
          onClick={() => { setMozoSheetOpen(false); setMozoSent(null); }}
        >
          <div
            className="w-full"
            style={{
              background: '#1c1c24',
              borderRadius: '24px 24px 0 0',
              padding: '1.5rem',
              animation: 'mozo-slide-up 0.3s ease-out forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center" style={{ marginBottom: '1rem' }}>
              <div className="rounded-full" style={{ width: '48px', height: '6px', background: '#4b5563' }} />
            </div>

            {/* Title */}
            <h2 className="text-white text-xl font-bold text-center">¿Qué necesitás?</h2>

            {/* Quick actions grid */}
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginTop: '1.5rem' }}>
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center justify-center rounded-xl active:scale-95 transition-transform"
                  style={{
                    background: '#2c2c2e',
                    height: '96px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setMozoSent(action.label);
                    setTimeout(() => { setMozoSheetOpen(false); setMozoSent(null); }, 1200);
                  }}
                >
                  <span style={{ fontSize: '2rem', marginBottom: '4px' }}>{action.emoji}</span>
                  <span className="text-white text-sm">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Main call button */}
            <button
              className="w-full flex items-center justify-center font-bold text-white active:opacity-90 transition-opacity"
              style={{
                background: '#f97316',
                padding: '1rem',
                borderRadius: '0.75rem',
                marginTop: '1rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 10px 25px rgba(249,115,22,0.2)',
              }}
              onClick={() => {
                setMozoSent('Mozo en camino');
                setTimeout(() => { setMozoSheetOpen(false); setMozoSent(null); }, 1200);
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>🙋‍♂️</span>
              Otra consulta (Viene el mozo)
            </button>

            {/* Cancel */}
            <div className="flex justify-center" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              <button
                className="text-sm transition-colors"
                style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => { setMozoSheetOpen(false); setMozoSent(null); }}
              >
                Cancelar
              </button>
            </div>

            {/* Sent feedback toast */}
            {mozoSent && (
              <div
                className="text-center text-sm font-medium"
                style={{
                  color: '#4ade80',
                  marginTop: '0.5rem',
                  animation: 'mozo-fade-in 0.2s ease-out',
                }}
              >
                ✓ {mozoSent} — pedido enviado
              </div>
            )}
          </div>

          <style>{`
            @keyframes mozo-slide-up {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            @keyframes mozo-fade-in {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}

    </Phone>
  );
}
