import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phone from '../components/Phone';
import ClienteHeader from '../components/ClienteHeader';
import PayModal from '../components/PayModal';

const ACTIONS = [
  { id: 'llamar', label: 'Llamar al mozo', icon: '🔔', alert: 'Ya se está llamando al mozo' },
  { id: 'menu', label: 'Ver menú', icon: '📋', navigate: '/cliente/menu' },
  { id: 'cuenta', label: 'Pedir la cuenta', icon: '🧾', alert: 'Ya se notificó al mozo' },
  { id: 'pagar', label: 'Pagar', icon: '💳', alert: null, openPayModal: true },
];

export default function ClientePage() {
  const navigate = useNavigate();
  const [payModalOpen, setPayModalOpen] = useState(false);

  const handleAction = (action) => {
    if (action.openPayModal) {
      setPayModalOpen(true);
      return;
    }
    if (action.alert) {
      alert(action.alert);
    }
    if (action.navigate) {
      navigate(action.navigate);
    }
  };

  return (
    <Phone>
      <div className="phone-cliente" style={{ width: '100%', minHeight: '100%' }}>
        <ClienteHeader />
        <div className="cliente-actions">
          {ACTIONS.map((action) => (
            <button
              key={action.id}
              className={`cliente-btn ${action.id === 'pagar' ? 'cliente-btn-primary' : ''}`}
              onClick={() => handleAction(action)}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
      <PayModal isOpen={payModalOpen} onClose={() => setPayModalOpen(false)} />
    </Phone>
  );
}
