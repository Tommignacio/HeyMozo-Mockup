import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import { menuCategories } from '../data/menuItems';

export default function MenuPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [cartCount] = useState(2);
  const [cartTotal] = useState('$15.500');

  const currentItems = menuCategories[activeCategory].items;

  return (
    <Phone>
      <div
        className="flex flex-col font-[Inter,sans-serif] text-white"
        style={{ background: '#1c1c1e', minHeight: '100%', paddingBottom: '7rem' }}
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
            <div className="relative">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {cartCount > 0 && (
                <span
                  className="absolute flex items-center justify-center bg-red-500 text-white font-bold rounded-full"
                  style={{ top: '-4px', right: '-4px', height: '16px', width: '16px', fontSize: '10px' }}
                >
                  {cartCount}
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
                  background: i === activeCategory ? '#16a34a' : '#2c2c2e',
                  color: i === activeCategory ? '#fff' : '#9ca3af',
                  fontWeight: i === activeCategory ? 600 : 500,
                  border: i === activeCategory ? 'none' : '1px solid #3a3a3c',
                  boxShadow: i === activeCategory ? '0 10px 15px rgba(22,163,74,0.2)' : 'none',
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
                style={{
                  width: '96px',
                  height: '96px',
                  background: '#3a3a3c',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1" style={{ padding: '2px 0' }}>
                <div>
                  <h3 className="font-bold text-white" style={{ fontSize: '1rem' }}>
                    {item.title}
                  </h3>
                  <p
                    className="leading-tight"
                    style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px' }}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between" style={{ marginTop: '0.5rem' }}>
                  <span className="font-bold text-white" style={{ fontSize: '1.125rem' }}>
                    {item.price}
                  </span>
                  <button
                    className="flex items-center gap-1 text-white font-bold rounded-lg border-none cursor-pointer transition-colors"
                    style={{
                      background: '#16a34a',
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.75rem',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* ── Floating Bottom Bar ── */}
        <div
          className="fixed z-50"
          style={{ bottom: '1.5rem', left: 0, right: 0, padding: '0 1rem' }}
        >
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
              <span
                className="uppercase tracking-wider font-medium"
                style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}
              >
                Mi Pedido
              </span>
              <span className="text-sm font-bold text-white">
                {cartCount} ítems | {cartTotal}
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
