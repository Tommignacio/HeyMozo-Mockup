import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import PayModal from '../components/PayModal';

export default function ClientePage() {
  const navigate = useNavigate();
  const [payModalOpen, setPayModalOpen] = useState(false);

  return (
    <Phone>
      <div
        className="flex flex-col text-white font-[Inter,sans-serif]"
        style={{ background: '#1c1c1e', minHeight: '100%' }}
      >
        <div className="flex-1 flex flex-col">
          {/* Header — Logo del restaurante */}
          <header className="flex flex-col items-center justify-center" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
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
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                }}
                onClick={() => navigate('/cliente/menu')}
              >
                <span className="material-symbols-outlined text-2xl">restaurant_menu</span>
                <span>Ver Menú y Pedir</span>
              </button>

              {/* Llamar al Mozo — Amber llamativo */}
              <button
                className="w-full flex items-center justify-center gap-3 font-extrabold uppercase tracking-tight rounded-2xl active:scale-95 transition-transform duration-100 relative overflow-hidden"
                style={{
                  background: '#f59e0b',
                  color: '#1c1c1e',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 10px 25px rgba(245, 158, 11, 0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                }}
                onClick={() => alert('Ya se está llamando al mozo')}
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
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                }}
                onClick={() => setPayModalOpen(true)}
              >
                <span className="material-symbols-outlined text-2xl">credit_card</span>
                <span>Pagar / Dejar Propina</span>
              </button>
            </div>

            {/* Feedback sutil */}
            <div className="text-center" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
              <a
                className="inline-flex items-center gap-2 hover:text-[#13eca7] transition-colors duration-200"
                style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Gracias por tu opinión!'); }}
              >
                <span>⭐ ¿Cómo te atendimos? Dejanos tu opinión</span>
              </a>
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

      <PayModal isOpen={payModalOpen} onClose={() => setPayModalOpen(false)} />
    </Phone>
  );
}
