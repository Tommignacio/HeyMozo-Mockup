// src/lib/loyaltyStore.js
// Club HeyMozo: gestiona teléfono asociado, visitas y vouchers canjeables.
// Las visitas se suman automáticamente al llegar a PostPago si ya hay un teléfono registrado.
// Si el cliente no tiene batería, cualquier persona de la mesa puede tipear otro número
// para que esa visita le sume a ese tercero (crea o actualiza ese registro).

import { useSyncExternalStore } from 'react';

const PHONE_KEY = 'hm_vip_phone';
const VISITS_KEY = 'hm_vip_visits';
const VOUCHER_KEY = 'hm_vip_voucher';
const REGISTRY_KEY = 'hm_vip_registry'; // { [phone]: { visits, voucher } }

export const VISITS_FOR_VOUCHER = 5;

// ── Registry helpers (multi-phone) ────────────────────────────────────
function getRegistry() {
  try {
    return JSON.parse(localStorage.getItem(REGISTRY_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveRegistry(reg) {
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(reg));
  window.dispatchEvent(new CustomEvent('hm-loyalty-changed'));
}

// ── Current (active) phone ────────────────────────────────────────────
export function getActivePhone() {
  return localStorage.getItem(PHONE_KEY) || '';
}

export function getActiveVisits() {
  return Number(localStorage.getItem(VISITS_KEY) || 0);
}

export function hasActiveVoucher() {
  return localStorage.getItem(VOUCHER_KEY) === '1';
}

// ── Register/update a phone and its visit count ───────────────────────
// Returns: { phone, visits, voucherJustUnlocked, voucherActive }
export function registerVisit(phone) {
  const clean = String(phone || '').trim();
  if (!clean) return null;

  const reg = getRegistry();
  const prev = reg[clean] || { visits: 0, voucher: false };
  const newVisits = prev.visits + 1;

  // Llegó a VISITS_FOR_VOUCHER → desbloquea voucher (canjeable en la próxima visita)
  const voucherJustUnlocked = newVisits >= VISITS_FOR_VOUCHER && !prev.voucher;
  const voucherActive = voucherJustUnlocked ? true : prev.voucher;

  reg[clean] = { visits: newVisits, voucher: voucherActive };
  saveRegistry(reg);

  // Si el teléfono es el mismo que el activo, actualizamos los keys flat
  if (clean === getActivePhone()) {
    localStorage.setItem(VISITS_KEY, String(newVisits));
    localStorage.setItem(VOUCHER_KEY, voucherActive ? '1' : '0');
    window.dispatchEvent(new CustomEvent('hm-loyalty-changed'));
  }

  return { phone: clean, visits: newVisits, voucherJustUnlocked, voucherActive };
}

// Fija el teléfono activo en esta mesa (sincroniza con registry)
export function setActivePhone(phone) {
  const clean = String(phone || '').trim();
  if (!clean) return;
  const reg = getRegistry();
  const entry = reg[clean] || { visits: 0, voucher: false };
  localStorage.setItem(PHONE_KEY, clean);
  localStorage.setItem(VISITS_KEY, String(entry.visits));
  localStorage.setItem(VOUCHER_KEY, entry.voucher ? '1' : '0');
  window.dispatchEvent(new CustomEvent('hm-loyalty-changed'));
}

// Canjea el voucher (resetea las visitas a 0 y saca el flag)
export function redeemVoucher() {
  const phone = getActivePhone();
  if (!phone) return;
  const reg = getRegistry();
  reg[phone] = { visits: 0, voucher: false };
  saveRegistry(reg);
  localStorage.setItem(VISITS_KEY, '0');
  localStorage.setItem(VOUCHER_KEY, '0');
  window.dispatchEvent(new CustomEvent('hm-loyalty-changed'));
}

// ── Reactive hook ─────────────────────────────────────────────────────
function subscribe(cb) {
  window.addEventListener('hm-loyalty-changed', cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener('hm-loyalty-changed', cb);
    window.removeEventListener('storage', cb);
  };
}

function getSnapshot() {
  return `${getActivePhone()}|${getActiveVisits()}|${hasActiveVoucher() ? 1 : 0}`;
}

export function useLoyalty() {
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return {
    phone: getActivePhone(),
    visits: getActiveVisits(),
    hasVoucher: hasActiveVoucher(),
  };
}
