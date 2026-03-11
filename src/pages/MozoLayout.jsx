import { useState } from 'react';
import ActiveAlertsPage from './ActiveAlertsPage';
import MisMesasPage from './MisMesasPage';

export default function MozoLayout() {
  const [activeTab, setActiveTab] = useState('alerts');

  return activeTab === 'alerts' ? (
    <ActiveAlertsPage activeTab={activeTab} onTabChange={setActiveTab} />
  ) : (
    <MisMesasPage activeTab={activeTab} onTabChange={setActiveTab} />
  );
}
