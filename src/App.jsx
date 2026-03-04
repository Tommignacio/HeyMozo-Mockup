import { useState } from 'react';
import './App.css';
import './styles/heymozo.css';
import ActiveAlertsPage from './pages/ActiveAlertsPage';
import MisMesasPage from './pages/MisMesasPage';

function App() {
  const [activeTab, setActiveTab] = useState('alerts');

  return (
    <div className="app-container">
      {activeTab === 'alerts' ? (
        <ActiveAlertsPage activeTab={activeTab} onTabChange={setActiveTab} />
      ) : (
        <MisMesasPage activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

export default App;
