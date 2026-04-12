import { useState, useEffect } from 'react';

const KEY = 'hm_caja_alerts';

export function getCajaAlerts() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

/**
 * Add a payment notification to the cajero feed.
 * Deduplicates by mesa + metodo so pre-seeded demo cards aren't doubled.
 */
export function addCajaAlert(alert) {
  const alerts = getCajaAlerts();
  const isDuplicate = alerts.some(a => a.mesa === alert.mesa && a.metodo === alert.metodo);
  if (isDuplicate) return;
  alerts.push({
    ...alert,
    id: `caja-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: Date.now(),
  });
  localStorage.setItem(KEY, JSON.stringify(alerts));
  // Notify same-window listeners
  window.dispatchEvent(new CustomEvent('hm-caja-changed'));
  // Also dispatch storage event so other-window listeners pick it up immediately
  window.dispatchEvent(new StorageEvent('storage', { key: KEY, newValue: JSON.stringify(alerts) }));
}

export function removeCajaAlert(id) {
  const alerts = getCajaAlerts().filter(a => a.id !== id);
  localStorage.setItem(KEY, JSON.stringify(alerts));
  window.dispatchEvent(new CustomEvent('hm-caja-changed'));
  window.dispatchEvent(new StorageEvent('storage', { key: KEY, newValue: JSON.stringify(alerts) }));
}

export function clearCajaAlerts() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent('hm-caja-changed'));
}

export function useCajaAlerts() {
  const [alerts, setAlerts] = useState(getCajaAlerts);

  useEffect(() => {
    const refresh = () => setAlerts(getCajaAlerts());

    window.addEventListener('hm-caja-changed', refresh);

    // Cross-tab sync via storage event
    const onStorage = (e) => { if (e.key === KEY || e.key === null) refresh(); };
    window.addEventListener('storage', onStorage);

    // Polling fallback — ensures updates are picked up even if events are missed
    const poll = setInterval(() => {
      const fresh = getCajaAlerts();
      setAlerts(prev =>
        JSON.stringify(prev) === JSON.stringify(fresh) ? prev : fresh
      );
    }, 1500);

    return () => {
      window.removeEventListener('hm-caja-changed', refresh);
      window.removeEventListener('storage', onStorage);
      clearInterval(poll);
    };
  }, []);

  return alerts;
}
