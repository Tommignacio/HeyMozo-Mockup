import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/heymozo.css';
import ClientePage from './pages/ClientePage';
import MenuPage from './pages/MenuPage';
import MozoLayout from './pages/MozoLayout';
import CajeroLayout from './pages/CajeroLayout';
import CartPage from './pages/CartPage';

/* ── Persist state in sessionStorage so it survives navigation / refresh ── */
function usePersistedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const saved = sessionStorage.getItem(key);
    if (saved === null) return defaultValue;
    try { return JSON.parse(saved); } catch { return defaultValue; }
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
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
  const [mesa3Released, setMesa3Released] = usePersistedState('mesa3Released', false);
  const [mesa4Status, setMesa4Status] = usePersistedState('mesa4Status', 'NEW_ORDER');
  const [mesa6Status, setMesa6Status] = usePersistedState('mesa6Status', 'WAITING');

  const mesaState = {
    mesa1Status, setMesa1Status,
    mesa2Status, setMesa2Status,
    mesa3Released, setMesa3Released,
    mesa4Status, setMesa4Status,
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
          <Route path="/mozo/*" element={<MozoLayout {...mesaState} />} />
          <Route path="/cajero" element={<CajeroLayout {...mesaState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
