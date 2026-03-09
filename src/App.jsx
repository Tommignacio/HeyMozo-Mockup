import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ActiveAlertsPage from './pages/ActiveAlertsPage';
import MisMesasPage from './pages/MisMesasPage';

function App() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [mesa1Status, setMesa1Status] = useState('PENDING');
  const [mesa2Status, setMesa2Status] = useState('PENDING');
  const pageTitle = activeTab === 'alerts' ? 'Active Alerts' : 'Mis Mesas';

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#1c1c1e] font-sans text-white">
      {/* Sidebar - desktop only */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-0">
        <Header pageTitle={pageTitle} />

        <main className="flex-1 overflow-y-auto">
          {/* Mobile page title */}
          <h1 className="text-[28px] font-bold px-4 pt-1 pb-3 tracking-tight lg:hidden">
            {pageTitle}
          </h1>

          {activeTab === 'alerts' ? (
            <ActiveAlertsPage
              mesa1Status={mesa1Status} setMesa1Status={setMesa1Status}
              mesa2Status={mesa2Status} setMesa2Status={setMesa2Status}
            />
          ) : (
            <MisMesasPage mesa1Status={mesa1Status} mesa2Status={mesa2Status} />
          )}
        </main>

        {/* Bottom nav - mobile only */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
