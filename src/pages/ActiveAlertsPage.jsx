import { useState } from 'react';
import AlertCard from '../components/AlertCard';
import AlertModal from '../components/AlertModal';
import OrderDetailModal from '../components/OrderDetailModal';

// Estados por mesa: 'PENDING' → 'PAID' → 'GONE'

const mesa4Items = [
  { qty: 2, name: 'Pinta IPA', description: 'Cerveza artesanal tirada' },
  { qty: 1, name: 'Papas Fritas', description: 'Porción grande', modifier: 'SIN SAL' },
];

export default function ActiveAlertsPage({ mesa1Status, setMesa1Status, mesa2Status, setMesa2Status, mesa3Released, setMesa3Released, mesa4Status, setMesa4Status, mesa6Status, setMesa6Status }) {
  const [modalData, setModalData] = useState(null);
  const [orderModal, setOrderModal] = useState(false);

  const mesa1Card = mesa1Status === 'PENDING'
    ? {
        id: 'mesa1',
        tableName: 'MESA 1',
        variant: 'red',
        waitTime: '2 MIN',
        title: 'Llevar Posnet (Tarjeta)',
        subtitle: '💸 + $2.000 Propina (Acreditada)',
        icon: 'credit_card',
        actionLabel: '¡LISTO!',
        onClick: () => setModalData({
          tableName: 'MESA 1', waitingTime: '2 MIN', billingEmoji: '💳', billingLabel: 'PAGA CON TARJETA', headerColor: '#d62d20',
          onAction: () => { setMesa1Status('PAID'); setModalData(null); },
        }),
        onActionClick: () => setMesa1Status('PAID'),
      }
    : {
        id: 'mesa1',
        tableName: 'MESA 1',
        variant: 'paid',
        waitTime: '2 MIN',
        title: 'Cobrado (Tarjeta)',
        icon: 'check-circle',
        actionLabel: 'LIBERAR MESA',
        onActionClick: () => setMesa1Status('GONE'),
      };

  const mesa2Card = mesa2Status === 'PENDING'
    ? {
        id: 'mesa2',
        tableName: 'MESA 2',
        variant: 'red',
        waitTime: '1 MIN',
        title: 'Cuenta: Efectivo',
        icon: 'check',
        actionLabel: '¡VOY!',
        actionVariant: 'blue',
        onClick: () => setModalData({
          tableName: 'MESA 2', waitingTime: '1 MIN', billingEmoji: '💵', billingLabel: 'PAGA CON EFECTIVO', headerColor: '#d62d20',
          onAction: () => { setMesa2Status('PAID'); setModalData(null); },
        }),
        onActionClick: () => setMesa2Status('PAID'),
      }
    : {
        id: 'mesa2',
        tableName: 'MESA 2',
        variant: 'paid',
        waitTime: '1 MIN',
        title: 'Cobrado (Efectivo)',
        icon: 'check-circle',
        actionLabel: 'LIBERAR MESA',
        actionVariant: 'green-outline',
        onActionClick: () => setMesa2Status('GONE'),
      };

  const mesa6Card = mesa6Status === 'WAITING'
    ? { id: 'mesa6', tableName: 'MESA 6', variant: 'blue', waitTime: '1 MIN', title: 'Validando Transferencia en Caja', subtitle: 'Monto total: $22.000', icon: 'hourglass_empty', actionLabel: 'ESPERANDO OK DE CAJA...', disabledBtn: true }
    : mesa6Status === 'APPROVED'
    ? { id: 'mesa6', tableName: 'MESA 6', variant: 'paid', waitTime: '1 MIN', title: 'Transferencia Aprobada ✓', subtitle: 'Monto total: $22.000', icon: 'check_circle', actionLabel: '¡LISTO!', onActionClick: () => setMesa6Status('GONE') }
    : mesa6Status === 'REJECTED'
    ? { id: 'mesa6', tableName: 'MESA 6', variant: 'red', waitTime: '1 MIN', title: 'Transferencia Rechazada', subtitle: 'Avisar al cliente', icon: 'notifications', actionLabel: 'AVISAR CLIENTE', onActionClick: () => setMesa6Status('GONE') }
    : null;

  const staticAlerts = [
    ...(mesa6Card ? [mesa6Card] : []),
    ...(mesa4Status === 'NEW_ORDER' ? [{
      id: 'mesa4',
      tableName: 'MESA 4',
      variant: 'purple',
      waitTime: '1 MIN',
      title: 'Nuevo Pedido',
      icon: 'shopping_cart',
      badgeCount: 3,
      actionLabel: 'PENDIENTE',
      onClick: () => setOrderModal(true),
      onActionClick: () => setMesa4Status('COOKING'),
    }] : []),
    ...(mesa4Status === 'COOKING' ? [{
      id: 'mesa4',
      tableName: 'MESA 4',
      variant: 'purple',
      waitTime: '1 MIN',
      title: 'Esperando Comida',
      icon: 'cart',
      dimmed: true,
      actionLabel: '¡LISTO!',
      onClick: () => setOrderModal(true),
      onActionClick: () => setMesa4Status('OCCUPIED'),
    }] : []),
    {
      id: 'mesa5',
      tableName: 'MESA 5',
      variant: 'orange',
      waitTime: '4 MIN',
      title: 'Llevar Hielo',
      icon: 'notifications',
      actionLabel: '¡LISTO!',
      onClick: () => setModalData({ tableName: 'MESA 5', waitingTime: '4 MIN', billingEmoji: '🧊', billingLabel: 'LLEVAR HIELO', headerColor: '#f07020' }),
    },
    ...(!mesa3Released ? [{
      id: 'mesa3',
      tableName: 'MESA 3',
      variant: 'paid',
      waitTime: '5 MIN',
      title: 'Cobrado (Transferencia OK)',
      subtitle: '💸 + $1.500 Propina',
      icon: 'check_circle',
      actionLabel: 'LIBERAR MESA',
      onActionClick: () => setMesa3Released(true),
    }] : []),
  ];

  // PENDING arriba → static en el medio → COOKING/PAID al fondo → GONE fuera
  const pending = [
    ...(mesa1Status === 'PENDING' ? [mesa1Card] : []),
    ...(mesa2Status === 'PENDING' ? [mesa2Card] : []),
  ];
  const paid = [
    ...(mesa1Status === 'PAID' ? [mesa1Card] : []),
    ...(mesa2Status === 'PAID' ? [mesa2Card] : []),
  ];
  const cooking = staticAlerts.filter(a => a.dimmed);
  const topAlerts = staticAlerts.filter(a => !a.dimmed);
  const alerts = [...pending, ...topAlerts, ...cooking, ...paid];

  return (
    <>
      <div className="px-5 pt-2 pb-5 flex flex-col gap-3.5 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:items-start md:gap-5 lg:gap-6 lg:px-8 xl:px-12 lg:pb-8 max-w-[1400px] mx-auto w-full" style={{ padding: '1rem' }}>
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
          actionLabel="¡VOY!"
          onClose={() => setModalData(null)}
        />
      )}

      {orderModal && (
        <OrderDetailModal
          mesaNumber="4"
          items={mesa4Items}
          actionLabel={mesa4Status === 'NEW_ORDER' ? 'PENDIENTE' : '¡LISTO!'}
          onAction={() => {
            if (mesa4Status === 'NEW_ORDER') setMesa4Status('COOKING');
            else if (mesa4Status === 'COOKING') setMesa4Status('OCCUPIED');
          }}
          onClose={() => setOrderModal(false)}
        />
      )}
    </>
  );
}
