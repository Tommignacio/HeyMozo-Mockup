import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';

const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'Doble Smash Burger',
    description: 'Doble medallón smash, cheddar, cebolla caramelizada',
    unitPrice: 8500,
    qty: 2,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBR0Hp8UL7sUEjUQHaEJIOHFZ4NJvBnZ-hbfERps1zIgRxxaR8M-jMKxIU72ANk7xEj04Kmh6n8rzArmT9vFQsBI1SnCWpCW7v-rovREGVLav4YbAzI_j5RSfQL9abZLNvJEUrbu-1eo4IfYvXGikfBKDdzDwa-HXrWERprBxmALRwuGtp_mGvpe89EbjjC6WvATcUvKNkKzBJgXdaELAzPoIK3h9UmbIsBydxShNyhbEtBpjxgjUaYd52tQiVcm_lQxdsNXHM23LZc',
  },
  {
    id: 2,
    name: 'Limonada Natural',
    description: 'Jugo de limón fresco con hierbabuena',
    unitPrice: 4200,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop',
  },
];

function fmt(n) {
  return '$' + n.toLocaleString('es-CL');
}

export default function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [note, setNote] = useState('');

  const total = items.reduce((acc, i) => acc + i.unitPrice * i.qty, 0);

  function changeQty(id, delta) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  }

  return (
    <Phone>
      <div
        className="flex flex-col font-[Inter,sans-serif] text-white"
        style={{ background: '#1c1c1e', minHeight: '100%', paddingBottom: '7rem' }}
      >
        {/* ── Header ── */}
        <header
          className="sticky top-0 z-50 backdrop-blur-md"
          style={{
            background: 'rgba(28,28,30,0.80)',
            borderBottom: '1px solid #3a3a3c',
            padding: '1rem',
          }}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/cliente/menu')}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="#9333ea"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium text-white">Menú</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">Tu Pedido</h1>
            <div style={{ width: '60px' }} />
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="flex flex-col" style={{ padding: '1.5rem 1rem 0', gap: '1rem' }}>

          {/* ── Item cards ── */}
          <section className="flex flex-col" style={{ gap: '0.75rem' }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex rounded-2xl"
                style={{
                  background: '#2c2c2e',
                  border: '1px solid #3a3a3c',
                  padding: '1rem',
                  gap: '1rem',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-xl object-cover shrink-0"
                  style={{ width: '96px', height: '96px' }}
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-bold text-white" style={{ fontSize: '1rem', lineHeight: '1.25' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '4px', lineHeight: '1.4' }}>
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between" style={{ marginTop: '0.75rem' }}>
                    {/* Quantity controls */}
                    <div
                      className="flex items-center"
                      style={{
                        gap: '1rem',
                        background: 'rgba(28,28,30,0.5)',
                        border: '1px solid #3a3a3c',
                        borderRadius: '0.5rem',
                        padding: '0.375rem 0.75rem',
                      }}
                    >
                      <button
                        className="font-bold leading-none"
                        style={{ fontSize: '1.25rem', color: '#9333ea', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => changeQty(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="font-bold text-white" style={{ fontSize: '0.875rem' }}>
                        {item.qty}
                      </span>
                      <button
                        className="font-bold leading-none"
                        style={{ fontSize: '1.25rem', color: '#9333ea', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => changeQty(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-white" style={{ fontSize: '1.125rem' }}>
                      {fmt(item.unitPrice * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* ── Notes ── */}
          <div
            className="flex items-center"
            style={{
              background: '#2c2c2e',
              border: '1px solid #3a3a3c',
              borderRadius: '0.75rem',
              padding: '1rem',
              gap: '0.75rem',
            }}
          >
            <svg
              className="shrink-0"
              style={{ width: '24px', height: '24px', color: '#9ca3af' }}
              fill="none"
              stroke="#9ca3af"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Agregar nota al pedido (alergias, sin sal, etc.)"
              className="bg-transparent w-full text-white"
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '0.875rem',
                color: '#fff',
              }}
            />
          </div>

          {/* ── Total ── */}
          <div
            className="flex items-center justify-between rounded-2xl"
            style={{
              background: '#2c2c2e',
              border: '1px solid #3a3a3c',
              padding: '1.25rem',
              marginBottom: '1rem',
            }}
          >
            <span className="font-bold text-white" style={{ fontSize: '1.25rem' }}>
              Total
            </span>
            <span className="font-bold text-white" style={{ fontSize: '1.5rem' }}>
              {fmt(total)}
            </span>
          </div>
        </main>

        {/* ── Confirm button (fixed bottom) ── */}
        <div
          className="fixed z-50"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.5rem 1rem',
            background: 'linear-gradient(to top, #1c1c1e 60%, transparent)',
          }}
        >
          <button
            className="w-full flex items-center justify-center"
            style={{
              background: '#13eca7',
              borderRadius: '1rem',
              padding: '1rem',
              gap: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 20px 40px rgba(19,236,167,0.2)',
            }}
          >
            <span className="font-bold" style={{ fontSize: '1.125rem', color: '#1c1c1e' }}>
              Confirmar Pedido
            </span>
            <svg
              style={{ width: '24px', height: '24px' }}
              fill="none"
              stroke="#1c1c1e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>

        {/* ── Background glow decoration ── */}
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }}
        />
        <div
          className="fixed rounded-full pointer-events-none"
          style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }}
        />
      </div>
    </Phone>
  );
}
