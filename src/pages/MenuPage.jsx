import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import { menuCategories } from '../data/menuItems';
import { addToCart, useCart, useOrder } from '../lib/cartStore';
import { addAlert } from '../lib/alertStore';

function fmt(n) {
  return '$' + n.toLocaleString('es-CL');
}

export default function MenuPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const { cart, count, total } = useCart();
  const { order: sentOrder } = useOrder();
  const totalCount = count + sentOrder.reduce((s, i) => s + i.qty, 0);
  const [addedItem, setAddedItem] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mistakeSent, setMistakeSent] = useState(false);

  const currentItems = menuCategories[activeCategory].items;

  function handleAdd(item) {
    addToCart(item);
    setAddedItem(item.title);
    setTimeout(() => setAddedItem(null), 800);
  }

  return (
    <Phone>
      <div
        className="flex flex-col font-[Inter,sans-serif] text-white"
        style={{ background: '#1c1c1e', minHeight: '100%', paddingBottom: totalCount > 0 ? '7rem' : '2rem' }}
      >
        {/* ── Sticky Header ── */}
        <header
          className="sticky top-0 z-50 backdrop-blur-md"
          style={{
            background: 'rgba(28,28,30,0.95)',
            borderBottom: '1px solid #3a3a3c',
            padding: '0.75rem 1rem',
          }}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => navigate('/cliente')}
            >
              <span className="material-symbols-outlined text-white">arrow_back_ios</span>
              <span className="text-sm font-medium">Volver</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">
              {menuCategories[activeCategory].category}
            </h1>
            {/* Cart icon — opens popup if items, does nothing if empty */}
            <div
              className="relative cursor-pointer"
              onClick={() => totalCount > 0 ? setCartOpen(true) : undefined}
            >
              <span className="material-symbols-outlined text-2xl" style={{ opacity: totalCount > 0 ? 1 : 0.4 }}>
                shopping_cart
              </span>
              {totalCount > 0 && (
                <span
                  className="absolute flex items-center justify-center bg-red-500 text-white font-bold rounded-full"
                  style={{ top: '-4px', right: '-4px', height: '16px', width: '16px', fontSize: '10px' }}
                >
                  {totalCount}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* ── Sticky Category Pills ── */}
        <nav
          className="sticky z-40"
          style={{ top: '49px', background: '#1c1c1e', padding: '0.75rem 0', overflow: 'hidden' }}
        >
          <div
            className="flex gap-2 overflow-x-auto"
            style={{
              padding: '0 1rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {menuCategories.map((cat, i) => (
              <button
                key={cat.category}
                className="whitespace-nowrap rounded-full text-sm border-none cursor-pointer transition-colors"
                style={{
                  padding: '0.5rem 1rem',
                  background: i === activeCategory ? '#9333ea' : '#2c2c2e',
                  color: i === activeCategory ? '#fff' : '#9ca3af',
                  fontWeight: i === activeCategory ? 600 : 500,
                  border: i === activeCategory ? 'none' : '1px solid #3a3a3c',
                  boxShadow: i === activeCategory ? '0 10px 15px rgba(147,51,234,0.2)' : 'none',
                }}
                onClick={() => setActiveCategory(i)}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </nav>

        {/* ── Product Cards List ── */}
        <main
          className="flex flex-col"
          style={{ padding: '0.5rem 1rem 0', gap: '1rem' }}
        >
          {currentItems.map((item) => (
            <div
              key={item.title}
              className="flex rounded-2xl"
              style={{
                background: '#2c2c2e',
                padding: '0.75rem',
                gap: '1rem',
                border: '1px solid #3a3a3c',
              }}
            >
              {/* Image */}
              <div
                className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ width: '96px', height: '96px', background: '#3a3a3c' }}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1" style={{ padding: '2px 0' }}>
                <div>
                  <h3 className="font-bold text-white" style={{ fontSize: '1rem' }}>{item.title}</h3>
                  <p className="leading-tight" style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}>
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between" style={{ marginTop: '0.5rem' }}>
                  <span className="font-bold text-white" style={{ fontSize: '1.125rem' }}>{item.price}</span>
                  <button
                    className="flex items-center gap-1 text-white font-bold rounded-lg border-none cursor-pointer transition-colors"
                    style={{
                      background: addedItem === item.title ? '#7e22ce' : '#9333ea',
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.75rem',
                    }}
                    onClick={() => handleAdd(item)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                      {addedItem === item.title ? 'check' : 'add'}
                    </span>
                    {addedItem === item.title ? 'Agregado' : 'Agregar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* ── Floating Bottom Bar (only when cart or order has items) ── */}
        {totalCount > 0 && (
          <div className="fixed z-50" style={{ bottom: '1.5rem', left: 0, right: 0, padding: '0 1rem' }}>
            <div
              className="flex items-center justify-between rounded-2xl"
              style={{
                background: '#9333ea',
                padding: '0 1.25rem',
                height: '3.5rem',
                boxShadow: '0 25px 50px rgba(147,51,234,0.4)',
              }}
            >
              <div className="flex flex-col">
                <span className="uppercase tracking-wider font-medium" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>
                  Mi Pedido
                </span>
                <span className="text-sm font-bold text-white">
                  {totalCount} {totalCount === 1 ? 'ítem' : 'ítems'} | {fmt(total + sentOrder.reduce((s, i) => s + i.unitPrice * i.qty, 0))}
                </span>
              </div>
              <button
                className="flex items-center gap-2 text-sm font-bold text-white bg-transparent border-none cursor-pointer"
                onClick={() => navigate('/cliente/pedido')}
              >
                Ver Pedido
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Background glow decoration ── */}
        <div className="fixed rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }} />
        <div className="fixed rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }} />
      </div>

      {/* ── Cart Preview Bottom Sheet ── */}
      {cartOpen && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0,0,0,0.70)' }}
          onClick={() => setCartOpen(false)}
        >
          <div
            className="w-full"
            style={{
              background: '#1c1c24',
              borderRadius: '24px 24px 0 0',
              padding: '1.5rem 1.5rem 2rem',
              animation: 'cart-slide-up 0.28s ease-out forwards',
              maxHeight: '75vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center" style={{ marginBottom: '1rem' }}>
              <div className="rounded-full" style={{ width: '48px', height: '6px', background: '#4b5563' }} />
            </div>

            {/* Title row */}
            <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
              <h2 className="text-white text-xl font-bold">Mi Pedido</h2>
              <span style={{ background: '#9333ea', color: '#fff', borderRadius: '999px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
                {totalCount} {totalCount === 1 ? 'ítem' : 'ítems'}
              </span>
            </div>

            {/* Items list */}
            <div className="flex flex-col overflow-y-auto" style={{ gap: '0.5rem', flex: 1, minHeight: 0 }}>
              {/* Current cart section */}
              {cart.length > 0 && (
                <>
                  <div className="flex items-center" style={{ gap: '0.375rem', marginBottom: '0.25rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#9333ea' }}>shopping_cart</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9333ea', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Agregando ahora</span>
                  </div>
                  {cart.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-xl"
                      style={{ background: '#2c2c2e', padding: '0.75rem 1rem', gap: '0.75rem' }}
                    >
                      <div className="flex items-center" style={{ gap: '0.75rem', flex: 1, minWidth: 0 }}>
                        <div
                          className="flex items-center justify-center shrink-0 rounded-lg font-bold"
                          style={{ width: '32px', height: '32px', background: 'rgba(147,51,234,0.2)', color: '#ddb8ff', fontSize: '0.875rem' }}
                        >
                          {item.qty}x
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-white truncate" style={{ fontSize: '0.875rem' }}>{item.title}</span>
                          <span style={{ color: '#9ca3af', fontSize: '0.7rem' }}>{item.description}</span>
                        </div>
                      </div>
                      <span className="font-bold text-white shrink-0" style={{ fontSize: '0.9rem' }}>
                        {fmt(item.unitPrice * item.qty)}
                      </span>
                    </div>
                  ))}
                </>
              )}

              {/* Sent order history section */}
              {sentOrder.length > 0 && (
                <>
                  <div className="flex items-center" style={{ gap: '0.375rem', marginTop: cart.length > 0 ? '0.75rem' : 0, marginBottom: '0.25rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#4ade80' }}>check_circle</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ya enviado a cocina</span>
                  </div>
                  {sentOrder.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-xl"
                      style={{ background: '#2c2c2e', padding: '0.75rem 1rem', gap: '0.75rem', opacity: 0.7 }}
                    >
                      <div className="flex items-center" style={{ gap: '0.75rem', flex: 1, minWidth: 0 }}>
                        <div
                          className="flex items-center justify-center shrink-0 rounded-lg font-bold"
                          style={{ width: '32px', height: '32px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontSize: '0.875rem' }}
                        >
                          {item.qty}x
                        </div>
                        <span className="font-medium text-white truncate" style={{ fontSize: '0.875rem' }}>{item.title}</span>
                      </div>
                      <span className="font-bold shrink-0" style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                        {fmt(item.unitPrice * item.qty)}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Total row */}
            <div
              className="flex items-center justify-between"
              style={{ borderTop: '1px solid #3a3a3c', paddingTop: '1rem', marginTop: '1rem' }}
            >
              <span className="font-bold text-white" style={{ fontSize: '1rem' }}>Total acumulado</span>
              <span className="font-extrabold" style={{ color: '#4ade80', fontSize: '1.25rem' }}>{fmt(total + sentOrder.reduce((s, i) => s + i.unitPrice * i.qty, 0))}</span>
            </div>

            {/* Dismiss + me equivoqué */}
            <div className="flex flex-col items-center" style={{ marginTop: '1rem', gap: '0.375rem' }}>
              <button
                className="w-full text-sm font-medium"
                style={{ color: '#9ca3af', background: '#2c2c2e', border: '1px solid #3a3a3c', borderRadius: '0.75rem', cursor: 'pointer', padding: '0.75rem', fontFamily: 'inherit' }}
                onClick={() => setCartOpen(false)}
              >
                Seguir eligiendo
              </button>

              {sentOrder.length > 0 && (
                mistakeSent ? (
                  <span style={{ fontSize: '0.75rem', color: '#fb923c' }}>✓ Mozo avisado — viene a ayudarte</span>
                ) : (
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4b5563', fontSize: '0.75rem', padding: '0.25rem' }}
                    onClick={() => {
                      addAlert({ mesa: 'MESA 6', variant: 'orange', title: 'Corrección de Pedido', subtitle: 'El cliente se equivocó en un ítem', icon: 'notifications', emoji: '🙋' });
                      setMistakeSent(true);
                    }}
                  >
                    Me equivoqué en el pedido — llamar al mozo
                  </button>
                )
              )}
            </div>
          </div>

          <style>{`
            @keyframes cart-slide-up {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </Phone>
  );
}
