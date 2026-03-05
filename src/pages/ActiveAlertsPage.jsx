import { useState } from 'react';
import AlertCard from '../components/AlertCard';
import AlertModal from '../components/AlertModal';

const MESA1_MODAL_ITEMS = [
  { emoji: '🧊', label: 'Hielo' },
  { label: 'Servilletas' },
];

export default function ActiveAlertsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const alerts = [
    {
      tableName: 'MESA 1',
      variant: 'red',
      badgeCount: 1,
      title: 'CHECK REQUESTED',
      subtitle: 'WAITING: 191 MIN',
      actionLabel: 'VISTO!',
      actionVariant: 'blue',
      icon: 'check',
      onOpenModal: () => setModalOpen(true),
    },
    {
      tableName: 'MESA 5',
      variant: 'orange',
      title: 'CALL WAITER',
      subtitle: 'WAITING: 4 MIN',
      actionLabel: '¡VOY!',
      actionVariant: 'dark',
      icon: 'bell',
    },
    {
      tableName: 'MESA 2',
      variant: 'orange',
      title: 'CALL WAITER + CHECK',
      subtitle: 'WAITING: 3 MIN',
      actionLabel: 'RESUELTO',
      actionVariant: 'dark',
      icon: 'bell-check',
    },
    {
      tableName: 'MESA 3',
      variant: 'yellow',
      title: 'NEW CLIENT',
      subtitle: 'ARRIVED: 1 MIN',
      actionLabel: 'OK',
      actionVariant: 'dark',
      icon: 'info',
    },
  ];

  return (
    <>
      <div className="px-3 pb-5 flex flex-col items-center gap-2.5 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:items-start md:gap-4 lg:px-8 lg:pb-8">
        {alerts.map((alert) => {
          const { onOpenModal, ...rest } = alert;
          return (
            <AlertCard
              key={alert.tableName}
              {...rest}
              onClick={onOpenModal}
            />
          );
        })}
      </div>

      {modalOpen && (
        <AlertModal
          tableName="MESA 1"
          items={MESA1_MODAL_ITEMS}
          summary={
            <>
              Mesa 1: Hielo +<br />
              Servilletas - Waiting
              <br />
              4 min
            </>
          }
          onClose={() => setModalOpen(false)}
          onVerComanda={() => {}}
        />
      )}
    </>
  );
}
