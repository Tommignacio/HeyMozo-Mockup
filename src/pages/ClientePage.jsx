import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import { addAlert } from '../lib/alertStore';
import { getOrderTotal } from '../lib/cartStore';
import { useLoyalty, redeemVoucher, VISITS_FOR_VOUCHER } from '../lib/loyaltyStore';

// Persiste durante la sesión SPA; se resetea solo en recarga de página (nuevo QR scan)
let _sessionVisited = false;

function fmt(n) { return '$' + n.toLocaleString('es-CL'); }

const QUICK_ACTIONS = [
  { emoji: '🧊', label: 'Hielo' },
  { emoji: '🧂', label: 'Condimentos' },
  { emoji: '📄', label: 'Servilletas' },
  { emoji: '🧽', label: 'Limpiar mesa' },
];

export default function ClientePage() {
  const navigate = useNavigate();
  const [mozoSheetOpen, setMozoSheetOpen] = useState(false);
  const [mozoSent, setMozoSent] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [sessionModal, setSessionModal] = useState(false);
  const [confirmNewSession, setConfirmNewSession] = useState(false);
  const [voucherModal, setVoucherModal] = useState(false);

  const { phone: vipPhone, visits: vipVisits, hasVoucher } = useLoyalty();

  useEffect(() => {
    const hadSession = localStorage.getItem('hm_mesa6_session');
    if (hadSession && !_sessionVisited) {
      setSessionModal(true);
    }
    // Si al escanear ya hay un voucher activo, mostrar el modal de bienvenida
    if (!_sessionVisited && localStorage.getItem('hm_vip_voucher') === '1' && !sessionStorage.getItem('hm_voucher_shown')) {
      setVoucherModal(true);
      sessionStorage.setItem('hm_voucher_shown', '1');
    }
    _sessionVisited = true;
    localStorage.setItem('hm_mesa6_session', '1');
  }, []);

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
                      Panel del Restaurante
                      <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: '#aaa', flexShrink: 0 }}><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                    </button>
                    <div style={{ borderTop: '1px solid #3a3a3c' }} />
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] font-semibold flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none font-[inherit]"
                      style={{ color: '#ef4444', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='#3a3a3c'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      onClick={() => { setNavOpen(false); sessionStorage.clear(); ['hm_mesa6_session','hm_vip_phone','hm_vip_visits','hm_vip_voucher','hm_vip_registry','hm_alerts','hm_cart','hm_order','mesa1Status','mesa2Status','mesa6Status','hm_mesa5_done','hm_caja_alerts','hm_mesa6_transfer_amount'].forEach(k => localStorage.removeItem(k)); window.location.reload(); }}
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
                Estás en la&nbsp;<span style={{ fontSize: '0.875rem' }}>Mesa 6</span>
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

            {/* Badge VIP Club — muestra voucher si está activo, o contador de visitas */}
            {vipPhone && (
              <div className="text-center" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                {hasVoucher ? (
                  <button
                    onClick={() => setVoucherModal(true)}
                    className="inline-flex items-center gap-2 rounded-2xl cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgba(147,51,234,0.22), rgba(221,184,255,0.12))',
                      border: '1px dashed rgba(221,184,255,0.6)',
                      padding: '0.625rem 1.1rem',
                      boxShadow: '0 8px 24px rgba(147,51,234,0.25)',
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>🎟️</span>
                    <span style={{ color: '#ddb8ff', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                      TENÉS 1 PINTA GRATIS · Tocá para canjear
                    </span>
                  </button>
                ) : (
                  <div
                    className="inline-flex items-center gap-2 rounded-2xl"
                    style={{
                      background: 'rgba(147,51,234,0.1)',
                      border: '1px solid rgba(147,51,234,0.25)',
                      padding: '0.5rem 1rem',
                    }}
                  >
                    <span style={{ fontSize: '1rem' }}>🎁</span>
                    <span style={{ color: '#ddb8ff', fontSize: '0.8rem', fontWeight: 700 }}>
                      Club · {vipVisits} {vipVisits === 1 ? 'visita' : 'visitas'}
                    </span>
                  </div>
                )}
              </div>
            )}
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

      {/* ── Modal: Sesión activa en la mesa ── */}
      {sessionModal && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0,0,0,0.75)' }}
        >
          <div
            className="w-full"
            style={{
              background: '#1c1c24',
              borderRadius: '24px 24px 0 0',
              padding: '1.75rem 1.5rem 2rem',
              animation: 'mozo-slide-up 0.3s ease-out forwards',
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center" style={{ marginBottom: '1.25rem' }}>
              <div className="rounded-full" style={{ width: '48px', height: '6px', background: '#4b5563' }} />
            </div>

            {/* Icono */}
            <div className="flex justify-center" style={{ marginBottom: '1rem' }}>
              <div
                className="flex items-center justify-center rounded-full"
                style={{ background: 'rgba(147,51,234,0.15)', width: '56px', height: '56px' }}
              >
                <span className="material-symbols-outlined" style={{ color: '#a855f7', fontSize: '28px' }}>table_restaurant</span>
              </div>
            </div>

            <h2 className="text-white text-xl font-bold text-center">Esta mesa tiene una sesión activa</h2>
            <p className="text-center text-sm" style={{ color: '#9ca3af', marginTop: '0.5rem', padding: '0 0.5rem', lineHeight: 1.5 }}>
              ¿Sos parte de este grupo o estás empezando una nueva sesión?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.75rem' }}>
              {/* Unirme */}
              <button
                className="w-full font-bold text-white"
                style={{
                  background: '#9333ea',
                  padding: '1rem',
                  borderRadius: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(147,51,234,0.25)',
                }}
                onClick={() => setSessionModal(false)}
              >
                Unirme a esta mesa
              </button>

              {/* Nueva mesa — ahora con confirmación de 2 pasos */}
              <button
                className="w-full font-bold"
                style={{
                  background: '#2c2c2e',
                  color: '#e4e4e7',
                  padding: '1rem',
                  borderRadius: '0.875rem',
                  border: '1px solid #3a3a3c',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
                onClick={() => { setSessionModal(false); setConfirmNewSession(true); }}
              >
                Empezar nueva sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Confirmar NUEVA SESIÓN (2º paso, destructivo) ── */}
      {confirmNewSession && (() => {
        const currentTotal = getOrderTotal();
        return (
          <div className="absolute inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.78)' }}>
            <div
              className="w-full"
              style={{
                background: '#1c1c24',
                borderRadius: '24px 24px 0 0',
                padding: '1.75rem 1.5rem 2rem',
                animation: 'mozo-slide-up 0.3s ease-out forwards',
              }}
            >
              <div className="flex justify-center" style={{ marginBottom: '1.25rem' }}>
                <div className="rounded-full" style={{ width: '48px', height: '6px', background: '#4b5563' }} />
              </div>

              <div className="flex justify-center" style={{ marginBottom: '1rem' }}>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ background: 'rgba(239,68,68,0.15)', width: '56px', height: '56px' }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: '28px' }}>warning</span>
                </div>
              </div>

              <h2 className="text-white text-xl font-bold text-center">¿Seguro querés empezar de cero?</h2>
              <p className="text-center text-sm" style={{ color: '#9ca3af', marginTop: '0.75rem', padding: '0 0.5rem', lineHeight: 1.5 }}>
                Esto va a borrar{currentTotal > 0 ? <> el pedido actual de <strong style={{ color: '#fca5a5' }}>{fmt(currentTotal)}</strong> y</> : ''} todo lo que tu grupo ya cargó en la mesa. No se puede deshacer.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.75rem' }}>
                {/* Volver — prominente, primario */}
                <button
                  className="w-full font-bold text-white"
                  style={{
                    background: '#9333ea',
                    padding: '1rem',
                    borderRadius: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    boxShadow: '0 8px 24px rgba(147,51,234,0.25)',
                  }}
                  onClick={() => { setConfirmNewSession(false); setSessionModal(true); }}
                >
                  ← Volver, me confundí
                </button>

                {/* Confirmar destructivo */}
                <button
                  className="w-full font-bold"
                  style={{
                    background: 'transparent',
                    color: '#ef4444',
                    padding: '0.875rem',
                    borderRadius: '0.875rem',
                    border: '1px solid rgba(239,68,68,0.35)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                  onClick={() => {
                    ['hm_mesa6_session','hm_alerts','hm_cart','hm_order'].forEach(k => localStorage.removeItem(k));
                    sessionStorage.removeItem('hm_visit_counted');
                    sessionStorage.removeItem('hm_voucher_shown');
                    localStorage.setItem('hm_mesa6_session', '1');
                    setConfirmNewSession(false);
                  }}
                >
                  Sí, borrar y empezar nueva
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Modal: Voucher activo (canje en próxima visita) ── */}
      {voucherModal && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0,0,0,0.80)' }}
          onClick={() => setVoucherModal(false)}
        >
          <div
            className="w-full"
            style={{
              background: 'linear-gradient(180deg, #2a1a3d 0%, #1c1c24 100%)',
              borderRadius: '24px 24px 0 0',
              padding: '1.75rem 1.5rem 2rem',
              animation: 'mozo-slide-up 0.3s ease-out forwards',
              border: '1px solid rgba(221,184,255,0.25)',
              borderBottom: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center" style={{ marginBottom: '1.25rem' }}>
              <div className="rounded-full" style={{ width: '48px', height: '6px', background: '#4b5563' }} />
            </div>

            {/* Icono grande */}
            <div className="flex justify-center" style={{ marginBottom: '1rem' }}>
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(147,51,234,0.35), rgba(147,51,234,0.05))',
                  width: '88px',
                  height: '88px',
                }}
              >
                <span style={{ fontSize: '3rem', lineHeight: 1 }}>🍺</span>
              </div>
            </div>

            <h2 className="text-white font-extrabold text-center" style={{ fontSize: '1.375rem' }}>
              ¡Tenés una Pinta Gratis!
            </h2>
            <p className="text-center" style={{ color: '#cfc2d7', marginTop: '0.5rem', padding: '0 0.25rem', lineHeight: 1.5, fontSize: '0.875rem' }}>
              Completaste <strong style={{ color: '#ddb8ff' }}>{VISITS_FOR_VOUCHER} visitas</strong> en tu última venida. Mostrále esta pantalla al mozo y te la canjea ahora mismo 🎉
            </p>

            {/* Ticket del voucher */}
            <div
              className="text-center"
              style={{
                marginTop: '1.5rem',
                padding: '1rem 1.25rem',
                background: 'rgba(147,51,234,0.15)',
                border: '1px dashed rgba(221,184,255,0.5)',
                borderRadius: '0.875rem',
              }}
            >
              <p style={{ color: '#988ca0', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Voucher HeyMozo
              </p>
              <p className="font-black" style={{ color: '#ddb8ff', fontSize: '1.125rem', marginTop: '0.25rem' }}>
                1× Pinta Gratis 🍺
              </p>
              <p style={{ color: '#988ca0', fontSize: '0.7rem', marginTop: '0.375rem' }}>
                Asociado a {vipPhone || 'tu número'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                className="w-full font-bold text-white"
                style={{
                  background: '#9333ea',
                  padding: '1rem',
                  borderRadius: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  boxShadow: '0 8px 24px rgba(147,51,234,0.3)',
                }}
                onClick={() => {
                  redeemVoucher();
                  addAlert({
                    mesa: 'MESA 6',
                    variant: 'purple',
                    title: 'Canje de Voucher',
                    subtitle: '1× Pinta Gratis del Club',
                    icon: 'redeem',
                    emoji: '🎟️',
                  });
                  setVoucherModal(false);
                }}
              >
                Canjear ahora — Avisar al mozo
              </button>
              <button
                className="w-full font-medium"
                style={{
                  background: 'transparent',
                  color: '#988ca0',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
                onClick={() => setVoucherModal(false)}
              >
                Canjearlo más tarde
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
                    addAlert({
                      mesa: 'MESA 6',
                      variant: 'orange',
                      title: `Llevar ${action.label}`,
                      icon: 'notifications',
                      emoji: action.emoji,
                    });
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
                addAlert({
                  mesa: 'MESA 6',
                  variant: 'orange',
                  title: 'Llamar al Mozo',
                  subtitle: 'El cliente necesita asistencia',
                  icon: 'notifications',
                  emoji: '🙋‍♂️',
                });
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
