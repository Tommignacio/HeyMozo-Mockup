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
      title: 'PIDE CUENTA',
      detail: '💳 PAGA CON TARJETA (Llevar Posnet)',
      subtitle: 'ESPERANDO: 2 MIN',
      actionLabel: '¡LLEVANDO POSNET!',
      actionVariant: 'blue',
      icon: 'check',
      onOpenModal: () => setModalOpen(true),
    },
    {
      tableName: 'MESA 2',
      variant: 'red',
      title: 'PIDE CUENTA',
      detail: '💵 EFECTIVO (Paga con $50.000)',
      subtitle: 'ESPERANDO: 1 MIN',
      actionLabel: '¡LLEVANDO VUELTO!',
      actionVariant: 'blue',
      icon: 'check',
    },
    {
      tableName: 'MESA 5',
      variant: 'orange',
      title: 'LLAMA MOZO',
      detail: '🧊 Traer Hielo',
      subtitle: 'ESPERANDO: 4 MIN',
      actionLabel: '¡VOY!',
      actionVariant: 'dark',
      icon: 'bell',
    },
    {
      tableName: 'MESA 3',
      variant: 'paid',
      title: 'CUENTA PAGADA',
      detail: '📱 MERCADO PAGO (Comprobante OK)',
      subtitle: 'TIEMPO TOTAL: 1h 45m',
      actionLabel: '✅ ¡SE FUERON! (Liberar)',
      actionVariant: 'green-outline',
      icon: 'check-circle',
    },
  ];

  return (
    <>
      <div className="px-3 pt-1 pb-5 flex flex-col items-center gap-3 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:items-start md:gap-4 lg:px-8 lg:pb-8">
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
