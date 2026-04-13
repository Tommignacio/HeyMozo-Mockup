import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import { useCart, useOrder, updateCartQty, confirmOrder } from '../lib/cartStore';
import { getAlerts, addAlert, updateAlert } from '../lib/alertStore';

function fmt(n) {
  return '$' + n.toLocaleString('es-CL');
}

// Merge new cart items into existing alert items array
function mergeAlertItems(existing, newItems) {
  const merged = existing.map(i => ({ ...i }));
  for (const item of newItems) {
    const idx = merged.findIndex(i => i.name === item.name);
    if (idx >= 0) {
      merged[idx] = { ...merged[idx], qty: merged[idx].qty + item.qty };
    } else {
      merged.push({ ...item });
    }
  }
  return merged;
}

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, total, count } = useCart();
  const { order: sentOrder } = useOrder();

  function handleConfirm() {
    if (cart.length === 0) return;

    const newItems = cart.map(i => ({ qty: i.qty, name: i.title, description: i.description }));

    // Check if there's already a pending "Nuevo Pedido" alert for MESA 6 that the mozo hasn't resolved
    const pendingOrderAlert = getAlerts().find(a => a.mesa === 'MESA 6' && a.variant === 'purple');

    if (pendingOrderAlert) {
      // Mozo hasn't pressed LISTO yet — merge new items into existing alert
      const merged = mergeAlertItems(pendingOrderAlert.items || [], newItems);
      const totalCount = merged.reduce((s, i) => s + i.qty, 0);
      updateAlert(pendingOrderAlert.id, { items: merged, badgeCount: totalCount });
    } else {
      // No pending alert — create a new one
      addAlert({
        mesa: 'MESA 6',
        variant: 'purple',
        title: 'Nuevo Pedido',
        icon: 'shopping_cart',
        badgeCount: count,
        items: newItems,
      });
    }

    // Merge cart into cumulative order (for payment), clear cart
    confirmOrder();
    navigate('/cliente/confirmado');
  }

  const hasCart = cart.length > 0;
  const hasHistory = sentOrder.length > 0;
  const isEmpty = !hasCart && !hasHistory;

  return (
    <Phone>
      <div
        className="flex flex-col font-[Inter,sans-serif] text-white"
        style={{ background: '#1c1c1e', minHeight: '100%', paddingBottom: hasCart ? '7rem' : '2rem' }}
      >
        {/* ── Header ── */}
        <header
          className="sticky top-0 z-50"
          style={{
            background: '#131315',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => navigate('/cliente/menu')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            <svg width="20" height="20" fill="none" stroke="#86efac" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-bold" style={{ color: '#e4e2e4', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Tu Pedido
          </h1>
          <div style={{ width: '28px' }} />
        </header>

        <main className="flex flex-col" style={{ padding: '1.5rem 1rem 0', gap: '1rem' }}>

          {/* ── Empty state ── */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center text-center" style={{ padding: '4rem 1rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', marginBottom: '0.75rem', opacity: 0.4, color: '#636366' }}>shopping_cart</span>
              <p className="font-semibold text-lg" style={{ color: '#8e8e93' }}>Tu pedido está vacío</p>
              <p className="text-sm" style={{ marginTop: '0.25rem', color: '#636366' }}>Agregá ítems desde el menú</p>
              <button
                style={{ marginTop: '1.5rem', background: '#9333ea', color: '#fff', borderRadius: '0.75rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => navigate('/cliente/menu')}
              >
                Ir al Menú
              </button>
            </div>
          )}

          {/* ── Current cart items (editable, not yet sent) ── */}
          {hasCart && (
            <section className="flex flex-col" style={{ gap: '0.5rem' }}>
              <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#9333ea' }}>shopping_cart</span>
                <span className="font-bold uppercase tracking-wider" style={{ fontSize: '0.7rem', color: '#9333ea' }}>
                  Agregando ahora
                </span>
              </div>
              {cart.map((item) => (
                <div
                  key={item.title}
                  className="flex rounded-2xl"
                  style={{ background: '#2c2c2e', border: '1px solid #3a3a3c', padding: '1rem', gap: '1rem' }}
                >
                  {item.image && (
                    <img src={item.image} alt={item.title} className="rounded-xl object-cover shrink-0" style={{ width: '80px', height: '80px' }} />
                  )}
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h3 className="font-bold text-white" style={{ fontSize: '0.9rem', lineHeight: '1.25' }}>{item.title}</h3>
                      <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px', lineHeight: '1.4' }}>{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between" style={{ marginTop: '0.75rem' }}>
                      <div className="flex items-center" style={{ gap: '0.875rem', background: 'rgba(28,28,30,0.5)', border: '1px solid #3a3a3c', borderRadius: '0.5rem', padding: '0.25rem 0.625rem' }}>
                        <button style={{ fontSize: '1.125rem', color: '#9333ea', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => updateCartQty(item.title, -1)}>−</button>
                        <span className="font-bold text-white" style={{ fontSize: '0.875rem' }}>{item.qty}</span>
                        <button style={{ fontSize: '1.125rem', color: '#9333ea', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }} onClick={() => updateCartQty(item.title, 1)}>+</button>
                      </div>
                      <span className="font-bold text-white" style={{ fontSize: '1rem' }}>{fmt(item.unitPrice * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {/* Cart subtotal */}
              <div className="flex items-center justify-between rounded-xl" style={{ background: 'rgba(147,51,234,0.08)', border: '1px solid rgba(147,51,234,0.2)', padding: '0.75rem 1rem' }}>
                <span className="font-semibold" style={{ color: '#ddb8ff', fontSize: '0.875rem' }}>Subtotal nuevo pedido</span>
                <span className="font-bold" style={{ color: '#ddb8ff', fontSize: '1rem' }}>{fmt(total)}</span>
              </div>
            </section>
          )}

          {/* ── Order history (previously confirmed, read-only) ── */}
          {hasHistory && (
            <section className="flex flex-col" style={{ gap: '0.5rem', marginTop: hasCart ? '1rem' : 0 }}>
              <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#4ade80' }}>check_circle</span>
                <span className="font-bold uppercase tracking-wider" style={{ fontSize: '0.7rem', color: '#4ade80' }}>
                  Ya enviado a cocina
                </span>
              </div>
              {sentOrder.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl"
                  style={{ background: '#2c2c2e', border: '1px solid #3a3a3c', padding: '0.75rem 1rem', opacity: 0.75, gap: '0.75rem' }}
                >
                  <div className="flex items-center" style={{ gap: '0.625rem', flex: 1, minWidth: 0 }}>
                    <div className="flex items-center justify-center shrink-0 rounded-lg font-bold" style={{ width: '28px', height: '28px', background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontSize: '0.75rem' }}>
                      {item.qty}x
                    </div>
                    <span className="font-medium text-white truncate" style={{ fontSize: '0.875rem' }}>{item.title}</span>
                  </div>
                  <span style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 600, shrink: 0 }}>{fmt(item.unitPrice * item.qty)}</span>
                </div>
              ))}
              {/* History subtotal */}
              <div className="flex items-center justify-between rounded-xl" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', padding: '0.75rem 1rem' }}>
                <span className="font-semibold" style={{ color: '#4ade80', fontSize: '0.875rem' }}>Subtotal enviado</span>
                <span className="font-bold" style={{ color: '#4ade80', fontSize: '1rem' }}>{fmt(sentOrder.reduce((s, i) => s + i.unitPrice * i.qty, 0))}</span>
              </div>

            </section>
          )}

          {/* ── Grand total (shown only when both sections exist) ── */}
          {hasCart && hasHistory && (
            <div className="flex items-center justify-between rounded-2xl" style={{ background: '#2c2c2e', border: '1px solid #3a3a3c', padding: '1rem 1.25rem' }}>
              <span className="font-bold text-white" style={{ fontSize: '1rem' }}>Total acumulado</span>
              <span className="font-bold text-white" style={{ fontSize: '1.375rem' }}>{fmt(total + sentOrder.reduce((s, i) => s + i.unitPrice * i.qty, 0))}</span>
            </div>
          )}

        </main>

        {/* ── Confirm button (only when current cart has items) ── */}
        {hasCart && (
          <div className="fixed z-50" style={{ bottom: 0, left: 0, right: 0, padding: '1.5rem 1rem', background: 'linear-gradient(to top, #1c1c1e 60%, transparent)' }}>
            <button
              className="w-full flex items-center justify-center"
              style={{ background: '#13eca7', borderRadius: '1rem', padding: '1rem', gap: '0.75rem', border: 'none', cursor: 'pointer', boxShadow: '0 20px 40px rgba(19,236,167,0.2)' }}
              onClick={handleConfirm}
            >
              <span className="font-bold" style={{ fontSize: '1.125rem', color: '#1c1c1e' }}>
                {hasHistory ? 'Añadir al pedido' : 'Confirmar Pedido'}
              </span>
              <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="#1c1c1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        )}

        {/* ── Background glow ── */}
        <div className="fixed rounded-full pointer-events-none" style={{ top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(232, 54, 42, 0.04)', filter: 'blur(100px)' }} />
        <div className="fixed rounded-full pointer-events-none" style={{ bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(147, 51, 234, 0.05)', filter: 'blur(100px)' }} />
      </div>
    </Phone>
  );
}
