import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCajaAlerts, addCajaAlert } from './lib/cajaStore';
import './App.css';
import './styles/heymozo.css';
import ClientePage from './pages/ClientePage';
import MenuPage from './pages/MenuPage';
import MozoLayout from './pages/MozoLayout';
import CajeroLayout from './pages/CajeroLayout';
import CartPage from './pages/CartPage';
import ConfirmadoPage from './pages/ConfirmadoPage';
import PagarPage from './pages/PagarPage';
import TransferenciaPage from './pages/TransferenciaPage';
import PosnetPage from './pages/PosnetPage';
import EfectivoPage from './pages/EfectivoPage';
import PostPagoPage from './pages/PostPagoPage';
import ValidandoTransferenciaPage from './pages/ValidandoTransferenciaPage';
import ModoPagoLitePage from './pages/ModoPagoLitePage';

/* ── Persist state in localStorage so it survives navigation / refresh and syncs across tabs ── */
function usePersistedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved === null) return defaultValue;
    try { return JSON.parse(saved); } catch { return defaultValue; }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Listen for changes from other tabs
  useEffect(() => {
    function onStorage(e) {
      if (e.key === key && e.newValue !== null) {
        try { setValue(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [value, setValue];
}

function App() {
  const [mesa1Status, setMesa1Status] = usePersistedState('mesa1Status', 'PENDING');
  const [mesa2Status, setMesa2Status] = usePersistedState('mesa2Status', 'PENDING');
  const [mesa6Status, setMesa6Status] = usePersistedState('mesa6Status', 'NONE');

  // Seed cajero feed with demo billing alerts if empty on app start
  useEffect(() => {
    if (getCajaAlerts().length === 0) {
      if (mesa1Status === 'PENDING') addCajaAlert({ mesa: 'MESA 1', metodo: 'Tarjeta', monto: '$24.000', tipoPago: 'PAGO TOTAL', propina: '$2.000' });
      if (mesa2Status === 'PENDING') addCajaAlert({ mesa: 'MESA 2', metodo: 'Efectivo', monto: '$18.500', tipoPago: 'PAGO TOTAL', propina: null });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mesaState = {
    mesa1Status, setMesa1Status,
    mesa2Status, setMesa2Status,
    mesa6Status, setMesa6Status,
  };

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/cliente" replace />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/cliente/menu" element={<MenuPage />} />
          <Route path="/cliente/pedido" element={<CartPage />} />
          <Route path="/cliente/confirmado" element={<ConfirmadoPage />} />
          <Route path="/cliente/pagar" element={<PagarPage />} />
          <Route path="/cliente/transferencia" element={<TransferenciaPage />} />
          <Route path="/cliente/posnet" element={<PosnetPage />} />
          <Route path="/cliente/efectivo" element={<EfectivoPage />} />
          <Route path="/cliente/validando-transferencia" element={<ValidandoTransferenciaPage />} />
          <Route path="/cliente/pago-lite" element={<ModoPagoLitePage />} />
          <Route path="/cliente/post-pago" element={<PostPagoPage />} />
          <Route path="/mozo/*" element={<MozoLayout {...mesaState} />} />
          <Route path="/cajero" element={<CajeroLayout {...mesaState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
