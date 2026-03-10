const SERVICETTE_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24" className="fill-[#8e8e93]">
    <path d="M11 3L9.5 9H11V21H9V9H7L5.5 3H11ZM18.5 3C17 3 15.75 4.25 15.75 5.75V11H17.5V21H19.5V11H21.25V5.75C21.25 4.25 20 3 18.5 3Z" />
  </svg>
);

export default function AlertModal({ tableName, items = [], waitingTime, onClose, onVerComanda, onAction, variant = 'default', actionLabel = '¡VISTO!', billingEmoji = '💳', billingLabel = 'PAGA CON TARJETA', headerColor = '#e8362a' }) {
  if (variant === 'billing') {
    return (
      <div
        className="fixed inset-0 bg-black/72 z-50 flex items-center justify-center p-4 lg:p-8"
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <div
          className="bg-[#2a2a2c] rounded-[20px] overflow-hidden w-full max-w-sm shadow-2xl animate-[modal-in_0.25s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con color dinámico, tabla centrada y tiempo */}
          <div className="py-3 px-5 flex items-center justify-between" style={{ background: headerColor }}>
            <div className="w-12" />
            <div className="text-[22px] font-extrabold text-white tracking-wide">{tableName}</div>
            {waitingTime
              ? <div className="text-[14px] text-white/80 font-semibold uppercase tracking-wider w-12 text-right">{waitingTime}</div>
              : <div className="w-12" />
            }
          </div>

          {/* Cuerpo minimalista de cobranza */}
          <div className="bg-[#1e1e20] mx-3.5 mt-3.5 rounded-[14px] flex flex-col items-center py-9 gap-5">
            <div className="text-[80px] leading-none">{billingEmoji}</div>
            <div className="text-[28px] font-extrabold text-white tracking-wide text-center">{billingLabel}</div>
          </div>

          {/* Botón acción — flush al fondo del card */}
          <button
            type="button"
            className="mt-3 mx-0 mb-0 p-7 text-center text-[22px] font-bold bg-[#3478f6] text-white cursor-pointer tracking-wide transition-opacity active:opacity-75 border-none w-full font-[inherit]"
            onClick={onAction || onClose}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/72 z-50 flex items-center justify-center p-4 lg:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="bg-[#2a2a2c] rounded-[20px] overflow-hidden w-full max-w-sm shadow-2xl animate-[modal-in_0.25s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="py-3 px-5 text-center" style={{ background: headerColor }}>
          <div className="text-[22px] font-extrabold text-white tracking-wide">{tableName}</div>
          {waitingTime && (
            <div className="text-[13px] text-white/70 font-medium mt-0.5 uppercase tracking-wider">Waiting: {waitingTime}</div>
          )}
        </div>

        {/* Items list */}
        <div className="bg-[#1e1e20] mx-3.5 mt-3.5 rounded-[14px] overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 py-[18px] px-5 ${
                i < items.length - 1 ? 'border-b border-[#2c2c2e]' : ''
              }`}
            >
              {item.emoji ? (
                <div className="text-[34px] leading-none shrink-0">{item.emoji}</div>
              ) : (
                <div className="w-[34px] shrink-0 flex items-center justify-center">
                  {item.icon ?? SERVICETTE_ICON}
                </div>
              )}
              <div className="text-[22px] font-bold text-white tracking-tight">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Ver comanda link */}
        {onVerComanda && (
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 pt-2.5 px-5 pb-1 text-[#8e8e93] text-sm font-medium cursor-pointer bg-transparent border-none w-full font-[inherit]"
            onClick={onVerComanda}
          >
            <div className="w-[18px] h-[18px] border-2 border-[#8e8e93] rounded-full flex items-center justify-center text-[13px] leading-none text-[#8e8e93] shrink-0">
              +
            </div>
            <span>Ver comanda completa [3]</span>
          </button>
        )}

        {/* Action button */}
        <button
          type="button"
          className="mx-3.5 mb-4 mt-3.5 p-[15px] rounded-[30px] text-center text-lg font-bold bg-[#3478f6] text-white cursor-pointer tracking-wide transition-opacity active:opacity-75 border-none w-[calc(100%-28px)] font-[inherit]"
          onClick={onClose}
        >
          ¡VISTO!
        </button>
      </div>
    </div>
  );
}
