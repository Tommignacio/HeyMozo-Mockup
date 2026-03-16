import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/heymozo.css';
import ClientePage from './pages/ClientePage';
import MenuPage from './pages/MenuPage';
import MozoLayout from './pages/MozoLayout';
import CajeroLayout from './pages/CajeroLayout';

function App() {
  const [mesa1Status, setMesa1Status] = useState('PENDING');
  const [mesa2Status, setMesa2Status] = useState('PENDING');
  const [mesa3Released, setMesa3Released] = useState(false);
  const [mesa4Status, setMesa4Status] = useState('NEW_ORDER');
  const [mesa6Status, setMesa6Status] = useState('WAITING');

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
          <Route path="/mozo/*" element={<MozoLayout {...mesaState} />} />
          <Route path="/cajero" element={<CajeroLayout {...mesaState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
