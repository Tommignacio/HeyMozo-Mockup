export default function AlertModal({ tableName, waitingTime, onClose, onAction, actionLabel = '¡VOY!', billingEmoji = '💳', billingLabel = 'PAGA CON TARJETA', billingDesc, headerColor = '#d62d20' }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="bg-[#11131e] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden transform transition-all animate-[modal-in_0.25s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">

        {/* Header */}
        <div className="flex items-center justify-between relative" style={{ padding: '26px', background: headerColor }}>
          <div>
            <div className="text-white text-2xl font-bold tracking-wide">{tableName}</div>
            {waitingTime && (
              <div className="text-white/80 text-sm font-medium mt-0.5">
                Esperando: {waitingTime}
              </div>
            )}
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold cursor-pointer border-none"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Billing body */}
        <div className="flex flex-col items-center gap-5" style={{ padding: '40px 24px' }}>
          <div className="text-[80px] leading-none">{billingEmoji}</div>
          <div className="text-[24px] font-bold text-white tracking-wide text-center">{billingLabel}</div>
          {billingDesc && (
            <div className="text-sm text-center" style={{ color: '#9ca3af', marginTop: '-0.5rem', lineHeight: 1.4 }}>{billingDesc}</div>
          )}
        </div>

        {/* Action button */}
        <div className="pb-8 sm:pb-4" style={{ margin: '16px', padding: '15px' }}>
          <button
            type="button"
            className="bg-white rounded-full w-full font-bold text-lg cursor-pointer border-none transition-transform active:scale-95"
            style={{ padding: '9px', color: headerColor }}
            onClick={() => { onAction?.(); onClose?.(); }}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
