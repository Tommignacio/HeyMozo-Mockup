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
  const [mesa3Released, setMesa3Released] = useState(false);
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

          <div className={activeTab !== 'alerts' ? 'hidden' : undefined}>
            <ActiveAlertsPage
              mesa1Status={mesa1Status} setMesa1Status={setMesa1Status}
              mesa2Status={mesa2Status} setMesa2Status={setMesa2Status}
              mesa3Released={mesa3Released} setMesa3Released={setMesa3Released}
            />
          </div>
          <div className={activeTab !== 'mesas' ? 'hidden' : undefined}>
            <MisMesasPage
              mesa1Status={mesa1Status} setMesa1Status={setMesa1Status}
              mesa2Status={mesa2Status} setMesa2Status={setMesa2Status}
              mesa3Released={mesa3Released} setMesa3Released={setMesa3Released}
            />
          </div>
        </main>

        {/* Bottom nav - mobile only */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
