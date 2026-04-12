import { useState, useCallback } from 'react';
import AlertCard from '../components/AlertCard';
import AlertModal from '../components/AlertModal';
import OrderDetailModal from '../components/OrderDetailModal';
import { useAlerts, removeAlert } from '../lib/alertStore';
import { addCajaAlert } from '../lib/cajaStore';

const VARIANT_PRIORITY = { red: 0, purple: 1, orange: 2, paid: 3 };
const VARIANT_HEADER_COLOR = {
  red: '#d62d20',
  purple: '#9333ea',
  orange: '#f07020',
  paid: '#30d158',
};

export default function ActiveAlertsPage({
  mesa1Status, setMesa1Status,
  mesa2Status, setMesa2Status,
  mesa5Done, setMesa5Done,
}) {
  const [modalData, setModalData] = useState(null);
  const [orderModal, setOrderModal] = useState(null);
  // Queue of alerts being viewed in the modal (for chaining LISTO)
  const [alertQueue, setAlertQueue] = useState([]);
  const dynamicAlerts = useAlerts();

  // ── Demo alerts (hardcoded for other tables) ──

  const mesa1Card = mesa1Status === 'PENDING' ? {
    id: 'mesa1',
    tableName: 'MESA 1',
    variant: 'red',
    waitTime: '2 MIN',
    title: 'Cuenta: Tarjeta',
    subtitle: '💸 + $2.000 propina',
    icon: 'credit_card',
    actionLabel: '¡LISTO!',
    onClick: () => setModalData({
      tableName: 'MESA 1', waitingTime: '2 MIN', billingEmoji: '💳', billingLabel: 'PAGA CON TARJETA', headerColor: '#d62d20',
      onAction: () => { setMesa1Status('GONE'); setModalData(null); addCajaAlert({ mesa: 'MESA 1', metodo: 'Tarjeta', monto: '$24.000', tipoPago: 'PAGO TOTAL', propina: '$2.000' }); },
    }),
    onActionClick: () => { setMesa1Status('GONE'); addCajaAlert({ mesa: 'MESA 1', metodo: 'Tarjeta', monto: '$24.000', tipoPago: 'PAGO TOTAL', propina: '$2.000' }); },
  } : null;

  const mesa2Card = mesa2Status === 'PENDING' ? {
    id: 'mesa2',
    tableName: 'MESA 2',
    variant: 'red',
    waitTime: '1 MIN',
    title: 'Cuenta: Efectivo',
    icon: 'check',
    actionLabel: '¡LISTO!',
    onClick: () => setModalData({
      tableName: 'MESA 2', waitingTime: '1 MIN', billingEmoji: '💵', billingLabel: 'PAGA CON EFECTIVO', headerColor: '#d62d20',
      onAction: () => { setMesa2Status('GONE'); setModalData(null); addCajaAlert({ mesa: 'MESA 2', metodo: 'Efectivo', monto: '$18.500', tipoPago: 'PAGO TOTAL', propina: null }); },
    }),
    onActionClick: () => { setMesa2Status('GONE'); addCajaAlert({ mesa: 'MESA 2', metodo: 'Efectivo', monto: '$18.500', tipoPago: 'PAGO TOTAL', propina: null }); },
  } : null;

  const mesa5Card = !mesa5Done ? {
    id: 'mesa5',
    tableName: 'MESA 5',
    variant: 'orange',
    waitTime: '4 MIN',
    title: 'Llevar Hielo',
    icon: 'notifications',
    actionLabel: '¡LISTO!',
    onClick: () => setModalData({
      tableName: 'MESA 5', waitingTime: '4 MIN', billingEmoji: '🧊', billingLabel: 'LLEVAR HIELO', headerColor: '#f07020',
      onAction: () => { setMesa5Done(true); setModalData(null); },
    }),
    onActionClick: () => setMesa5Done(true),
  } : null;

  // ── Dynamic alerts — group by mesa, one card per mesa ──

  function getTimeSince(ts) {
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 1) return 'AHORA';
    return `${mins} MIN`;
  }

  // Group alerts by mesa
  const grouped = {};
  for (const alert of dynamicAlerts) {
    const mesa = alert.mesa;
    if (!grouped[mesa]) grouped[mesa] = [];
    grouped[mesa].push(alert);
  }

  // Open the modal/queue for a group of alerts
  const openAlertQueue = useCallback((alerts) => {
    const sorted = [...alerts].sort((a, b) => (VARIANT_PRIORITY[a.variant] ?? 99) - (VARIANT_PRIORITY[b.variant] ?? 99));
    const first = sorted[0];

    if (first.variant === 'purple' && first.items) {
      // Order alert — use OrderDetailModal, then chain rest
      setOrderModal(first);
      setAlertQueue(sorted.slice(1));
    } else {
      // Use AlertModal, chain rest
      setAlertQueue(sorted);
    }
  }, []);

  // Handle LISTO in the alert queue modal
  const handleQueueListo = useCallback(() => {
    if (alertQueue.length === 0) return;
    const current = alertQueue[0];
    removeAlert(current.id);
    const remaining = alertQueue.slice(1);

    if (remaining.length === 0) {
      setAlertQueue([]);
      return;
    }

    const next = remaining[0];
    if (next.variant === 'purple' && next.items) {
      setAlertQueue(remaining.slice(1));
      setOrderModal(next);
    } else {
      setAlertQueue(remaining);
    }
  }, [alertQueue]);

  // Handle LISTO in OrderDetailModal when it's part of a queue
  const handleOrderListo = useCallback(() => {
    if (orderModal) {
      removeAlert(orderModal.id);
      setOrderModal(null);
    }
    // If there are more alerts in the queue, show the next one
    if (alertQueue.length > 0) {
      const next = alertQueue[0];
      if (next.variant === 'purple' && next.items) {
        setOrderModal(next);
        setAlertQueue(alertQueue.slice(1));
      } else {
        // alertQueue already set, modal will render from alertQueue[0]
        setAlertQueue([...alertQueue]);
      }
    }
  }, [orderModal, alertQueue]);

  // Build one card per mesa group — ordenado por createdAt ASC (primer alerta arriba)
  const dynamicCards = Object.entries(grouped)
    .map(([mesa, alerts]) => {
      const sorted = [...alerts].sort((a, b) => (VARIANT_PRIORITY[a.variant] ?? 99) - (VARIANT_PRIORITY[b.variant] ?? 99));
      const top = sorted[0];
      const count = alerts.length;
      // Icono: orange siempre campana
      const icon = top.variant === 'orange' ? 'notifications' : (top.icon || 'notifications');
      // Subtitle en card: ocultar para alertas orange (se muestra solo en el popup)
      const cardSubtitle = top.variant === 'orange' ? undefined : top.subtitle;

      return {
        id: `group-${mesa}`,
        tableName: mesa,
        variant: top.variant,
        waitTime: getTimeSince(top.createdAt),
        title: top.title,
        subtitle: cardSubtitle,
        icon,
        badgeCount: count > 1 ? count : top.badgeCount,
        actionLabel: '¡LISTO!',
        _createdAt: top.createdAt,
        _alerts: alerts,
        _top: top,
        onClick: () => openAlertQueue(alerts),
        onActionClick: () => removeAlert(top.id),
      };
    })
    .sort((a, b) => a._createdAt - b._createdAt); // más antiguo primero

  const demoAlerts = [mesa1Card, mesa2Card, mesa5Card].filter(Boolean);
  const alerts = [...dynamicCards, ...demoAlerts];

  // Current alert being shown in the queue modal
  const currentQueueAlert = alertQueue.length > 0 ? alertQueue[0] : null;

  return (
    <>
      <div
        className="px-5 pt-2 pb-5 flex flex-col gap-3.5 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-5 lg:gap-6 lg:px-8 xl:px-12 lg:pb-8 max-w-[1400px] mx-auto w-full"
        style={{ padding: '1rem' }}
      >
        {alerts.length === 0 && (
          <div
            className="col-span-3 flex flex-col items-center justify-center text-center"
            style={{ padding: '4rem 1rem', color: '#636366' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', marginBottom: '0.75rem', opacity: 0.4 }}>check_circle</span>
            <p className="font-semibold text-lg" style={{ color: '#8e8e93' }}>Sin alertas pendientes</p>
            <p className="text-sm" style={{ marginTop: '0.25rem' }}>Todas las mesas están al día</p>
          </div>
        )}
        {alerts.map(({ id, onClick, onActionClick, ...rest }) => (
          <AlertCard
            key={id}
            {...rest}
            onClick={onClick}
            onActionClick={onActionClick}
          />
        ))}
      </div>

      {/* Demo alert modals (Mesa 1, 2, 5) */}
      {modalData && (
        <AlertModal
          tableName={modalData.tableName}
          waitingTime={modalData.waitingTime}
          billingEmoji={modalData.billingEmoji}
          billingLabel={modalData.billingLabel}
          headerColor={modalData.headerColor}
          onAction={modalData.onAction}
          actionLabel="¡LISTO!"
          onClose={() => setModalData(null)}
        />
      )}

      {/* Dynamic alert queue modal */}
      {currentQueueAlert && !orderModal && (
        <AlertModal
          tableName={currentQueueAlert.mesa}
          waitingTime={getTimeSince(currentQueueAlert.createdAt)}
          billingEmoji={currentQueueAlert.emoji || '🔔'}
          billingLabel={currentQueueAlert.title.toUpperCase()}
          billingDesc={currentQueueAlert.subtitle}
          headerColor={VARIANT_HEADER_COLOR[currentQueueAlert.variant] || '#f07020'}
          onAction={handleQueueListo}
          actionLabel={alertQueue.length > 1 ? `¡LISTO! (${alertQueue.length - 1} más)` : '¡LISTO!'}
          onClose={() => setAlertQueue([])}
        />
      )}

      {/* Order detail modal */}
      {orderModal && (
        <OrderDetailModal
          mesaNumber={orderModal.mesa?.replace('MESA ', '') || '6'}
          items={orderModal.items || []}
          actionLabel={alertQueue.length > 0 ? `¡LISTO! (${alertQueue.length} más)` : '¡LISTO!'}
          onAction={handleOrderListo}
          onClose={() => { setOrderModal(null); setAlertQueue([]); }}
        />
      )}
    </>
  );
}
