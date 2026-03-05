import Phone from '../components/Phone';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function MisMesasPage({ activeTab, onTabChange }) {
  return (
    <Phone>
      <Header />
      <div className="page-content">
        <div className="page-title">Mis Mesas</div>
        <div className="alerts-list" style={{ padding: 16, color: '#8e8e93' }}>
          <p>Próximamente...</p>
        </div>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </Phone>
  );
}
