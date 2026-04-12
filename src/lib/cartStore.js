import { useState, useEffect } from 'react';

const CART_KEY = 'hm_cart';
const ORDER_KEY = 'hm_order'; // accumulates all confirmed rounds (for payment + history)

function parsePrice(str) {
  return Number(str.replace(/[$.]/g, '')) || 0;
}

// ── Cart (current unsent items) ──

export function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}

export function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.title === item.title);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      title: item.title,
      description: item.description,
      unitPrice: typeof item.price === 'number' ? item.price : parsePrice(item.price),
      image: item.image,
      qty: 1,
    });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('hm-cart-changed'));
}

export function updateCartQty(title, delta) {
  let cart = getCart();
  cart = cart.map(i => i.title === title ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('hm-cart-changed'));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent('hm-cart-changed'));
}

export function getCartTotal() {
  return getCart().reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
}

export function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

// ── Order history (cumulative confirmed items, for payment + history display) ──

export function getOrder() {
  try { return JSON.parse(localStorage.getItem(ORDER_KEY) || '[]'); }
  catch { return []; }
}

export function getOrderTotal() {
  return getOrder().reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
}

// Merge cart items into the cumulative hm_order (adds quantities for existing items)
function mergeCartIntoOrder(cartItems) {
  const order = getOrder();
  for (const cartItem of cartItems) {
    const existing = order.find(i => i.title === cartItem.title);
    if (existing) {
      existing.qty += cartItem.qty;
    } else {
      order.push({ ...cartItem });
    }
  }
  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
}

// Confirm order: merge cart into cumulative order, then clear cart
export function confirmOrder() {
  mergeCartIntoOrder(getCart());
  clearCart();
}

export function clearOrder() {
  localStorage.removeItem(ORDER_KEY);
}

export function clearCartAndOrder() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(ORDER_KEY);
  window.dispatchEvent(new CustomEvent('hm-cart-changed'));
}

// ── Hooks ──

export function useCart() {
  const [cart, setCart] = useState(getCart);

  useEffect(() => {
    const refresh = () => setCart(getCart());
    window.addEventListener('hm-cart-changed', refresh);
    const onStorage = (e) => { if (e.key === CART_KEY) refresh(); };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('hm-cart-changed', refresh);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const total = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return { cart, total, count };
}

// Hook that reads hm_order (confirmed history), re-renders on cart changes since
// confirmOrder() fires 'hm-cart-changed'
export function useOrder() {
  const [order, setOrder] = useState(getOrder);

  useEffect(() => {
    const refresh = () => setOrder(getOrder());
    window.addEventListener('hm-cart-changed', refresh);
    const onStorage = (e) => { if (e.key === ORDER_KEY) refresh(); };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('hm-cart-changed', refresh);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const total = order.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  const count = order.reduce((sum, i) => sum + i.qty, 0);

  return { order, total, count };
}
