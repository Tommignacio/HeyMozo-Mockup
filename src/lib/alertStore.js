import { useState, useEffect } from 'react';

const KEY = 'hm_alerts';

export function getAlerts() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

export function addAlert(alert) {
  const alerts = getAlerts();
  // Dedup: si ya existe una alerta activa con misma mesa + título, no agregar
  const isDuplicate = alerts.some(a => a.mesa === alert.mesa && a.title === alert.title);
  if (isDuplicate) return;
  alerts.push({ ...alert, id: `alert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, createdAt: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(alerts));
  window.dispatchEvent(new CustomEvent('hm-alerts-changed'));
}

export function removeAlert(id) {
  const alerts = getAlerts().filter(a => a.id !== id);
  localStorage.setItem(KEY, JSON.stringify(alerts));
  window.dispatchEvent(new CustomEvent('hm-alerts-changed'));
}

export function updateAlert(id, changes) {
  const alerts = getAlerts().map(a => a.id === id ? { ...a, ...changes } : a);
  localStorage.setItem(KEY, JSON.stringify(alerts));
  window.dispatchEvent(new CustomEvent('hm-alerts-changed'));
}

export function clearAlerts() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent('hm-alerts-changed'));
}

export function useAlerts() {
  const [alerts, setAlerts] = useState(getAlerts);

  useEffect(() => {
    const refresh = () => setAlerts(getAlerts());
    window.addEventListener('hm-alerts-changed', refresh);
    const onStorage = (e) => { if (e.key === KEY) refresh(); };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('hm-alerts-changed', refresh);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return alerts;
}
