import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/heymozo.css';
import ClientePage from './pages/ClientePage';
import MenuPage from './pages/MenuPage';
import MozoLayout from './pages/MozoLayout';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/cliente" replace />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/cliente/menu" element={<MenuPage />} />
          <Route path="/mozo/*" element={<MozoLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
