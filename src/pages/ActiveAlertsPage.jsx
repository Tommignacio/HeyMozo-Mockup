import { useState } from 'react';
import AlertCard from '../components/AlertCard';
import AlertModal from '../components/AlertModal';

const MESA1_MODAL_ITEMS = [
  { emoji: '💳', label: 'Paga con Tarjeta' },
  { label: 'Llevar Posnet' },
];

export default function ActiveAlertsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const alerts = [
    {
      tableName: 'MESA 1',
      variant: 'red',
      badgeCount: 1,
      waitTime: '2 MIN',
      title: 'CUENTA: TARJETA',
      icon: 'check',
      actionLabel: '¡VOY!',
      actionVariant: 'blue',
      onOpenModal: () => setModalOpen(true),
    },
    {
      tableName: 'MESA 2',
      variant: 'red',
      waitTime: '1 MIN',
      title: 'CUENTA: EFECTIVO',
      icon: 'check',
      actionLabel: '¡VOY!',
      actionVariant: 'blue',
    },
    {
      tableName: 'MESA 5',
      variant: 'orange',
      waitTime: '4 MIN',
      title: 'LLEVAR HIELO',
      icon: 'bell',
      actionLabel: '¡VOY!',
      actionVariant: 'blue',
    },
    {
      tableName: 'MESA 3',
      variant: 'paid',
      title: 'YA PAGARON (MP)',
      icon: 'check-circle',
      actionLabel: 'LIBERAR MESA',
      actionVariant: 'green-outline',
    },
  ];

  return (
    <>
      <div className="px-3 pt-1 pb-5 flex flex-col items-center gap-3 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:items-start md:gap-5 lg:gap-6 lg:px-8 xl:px-12 lg:pb-8 max-w-[1400px] mx-auto w-full">
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
          waitingTime="2 min"
          onClose={() => setModalOpen(false)}
          onVerComanda={() => {}}
        />
      )}
    </>
  );
}
