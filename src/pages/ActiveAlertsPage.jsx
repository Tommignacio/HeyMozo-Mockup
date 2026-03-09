import { useState } from 'react';
import AlertCard from '../components/AlertCard';
import AlertModal from '../components/AlertModal';

// Estados por mesa: 'PENDING' → 'PAID' → 'GONE'

export default function ActiveAlertsPage({ mesa1Status, setMesa1Status, mesa2Status, setMesa2Status }) {
  const [modalData, setModalData] = useState(null);

  const mesa1Card = mesa1Status === 'PENDING'
    ? {
        id: 'mesa1',
        tableName: 'MESA 1',
        variant: 'red',
        waitTime: '2 MIN',
        title: 'CUENTA: TARJETA',
        icon: 'check',
        actionLabel: '¡VOY!',
        actionVariant: 'blue',
        onClick: () => setModalData({
          tableName: 'MESA 1', waitingTime: '2 MIN', billingEmoji: '💳', billingLabel: 'PAGA CON TARJETA',
          onAction: () => { setMesa1Status('PAID'); setModalData(null); },
        }),
        onActionClick: () => setMesa1Status('PAID'),
      }
    : {
        id: 'mesa1',
        tableName: 'MESA 1',
        variant: 'paid',
        title: 'COBRADO (TARJETA)',
        icon: 'check-circle',
        actionLabel: 'LIBERAR MESA',
        actionVariant: 'green-outline',
        onActionClick: () => setMesa1Status('GONE'),
      };

  const mesa2Card = mesa2Status === 'PENDING'
    ? {
        id: 'mesa2',
        tableName: 'MESA 2',
        variant: 'red',
        waitTime: '1 MIN',
        title: 'CUENTA: EFECTIVO',
        icon: 'check',
        actionLabel: '¡VOY!',
        actionVariant: 'blue',
        onClick: () => setModalData({
          tableName: 'MESA 2', waitingTime: '1 MIN', billingEmoji: '💵', billingLabel: 'PAGA CON EFECTIVO',
          onAction: () => { setMesa2Status('PAID'); setModalData(null); },
        }),
        onActionClick: () => setMesa2Status('PAID'),
      }
    : {
        id: 'mesa2',
        tableName: 'MESA 2',
        variant: 'paid',
        title: 'COBRADO (EFECTIVO)',
        icon: 'check-circle',
        actionLabel: 'LIBERAR MESA',
        actionVariant: 'green-outline',
        onActionClick: () => setMesa2Status('GONE'),
      };

  const staticAlerts = [
    {
      id: 'mesa5',
      tableName: 'MESA 5',
      variant: 'orange',
      waitTime: '4 MIN',
      title: 'LLEVAR HIELO',
      icon: 'bell',
      actionLabel: '¡VOY!',
      actionVariant: 'blue',
      onClick: () => setModalData({ tableName: 'MESA 5', waitingTime: '4 MIN', billingEmoji: '🧊', billingLabel: 'LLEVAR HIELO', headerColor: '#f07020' }),
    },
    {
      id: 'mesa3',
      tableName: 'MESA 3',
      variant: 'paid',
      title: 'YA PAGARON (MP)',
      icon: 'check-circle',
      actionLabel: 'LIBERAR MESA',
      actionVariant: 'green-outline',
    },
  ];

  // PENDING arriba → static en el medio → PAID al fondo → GONE fuera
  const pending = [
    ...(mesa1Status === 'PENDING' ? [mesa1Card] : []),
    ...(mesa2Status === 'PENDING' ? [mesa2Card] : []),
  ];
  const paid = [
    ...(mesa1Status === 'PAID' ? [mesa1Card] : []),
    ...(mesa2Status === 'PAID' ? [mesa2Card] : []),
  ];
  const alerts = [...pending, ...staticAlerts, ...paid];

  return (
    <>
      <div className="px-3 pt-1 pb-5 flex flex-col items-center gap-3 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:items-start md:gap-5 lg:gap-6 lg:px-8 xl:px-12 lg:pb-8 max-w-[1400px] mx-auto w-full">
        {alerts.map(({ id, onClick, onActionClick, ...rest }) => (
          <AlertCard
            key={id}
            {...rest}
            onClick={onClick}
            onActionClick={onActionClick}
          />
        ))}
      </div>

      {modalData && (
        <AlertModal
          tableName={modalData.tableName}
          waitingTime={modalData.waitingTime}
          billingEmoji={modalData.billingEmoji}
          billingLabel={modalData.billingLabel}
          headerColor={modalData.headerColor}
          onAction={modalData.onAction}
          variant="billing"
          actionLabel="¡VOY!"
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
}
