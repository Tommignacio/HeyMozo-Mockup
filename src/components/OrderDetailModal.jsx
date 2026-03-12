const FOOD_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-gray-500" aria-hidden="true">
    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
  </svg>
);

export default function OrderDetailModal({ mesaNumber, items = [], onAction, onClose, actionLabel = 'PENDIENTE' }) {
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="bg-[#11131e] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden transform transition-all animate-[modal-in_0.25s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">

        {/* Header */}
        <div className="bg-purple-600 flex items-center justify-between relative" style={{ padding: '26px' }}>
          <div>
            <div className="text-white text-2xl font-bold tracking-wide">MESA {mesaNumber}</div>
            <div className="text-white/80 text-sm font-medium mt-0.5">
              Detalle del Pedido ({totalItems} {totalItems === 1 ? 'ítem' : 'ítems'})
            </div>
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold cursor-pointer border-none"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Items list */}
        <div className="flex flex-col gap-2.5 max-h-[50vh] overflow-y-auto" style={{ padding: '20px 24px' }}>
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3" style={{ padding: '10px 0' }}>
              {/* Quantity badge */}
              <div className="border border-gray-600 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">{item.qty}x</span>
              </div>

              {/* Item info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {FOOD_ICON}
                  <span className="text-white font-semibold text-[15px] truncate">{item.name}</span>
                </div>
                {item.description && (
                  <div className="text-gray-500 text-xs mt-0.5 ml-7">{item.description}</div>
                )}
                {item.modifier && (
                  <div className="ml-7 mt-1.5 inline-flex">
                    <span className="bg-red-950/60 text-red-400 text-xs font-semibold px-2.5 py-1 rounded-md">
                      ! * {item.modifier}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="pb-8 sm:pb-4" style={{ margin: '16px', padding: '15px' }}>
          <button
            type="button"
            className="bg-white rounded-full w-full text-purple-700 font-bold text-lg cursor-pointer border-none transition-transform active:scale-95"
            style={{ padding: '9px' }}
            onClick={() => { onAction?.(); onClose?.(); }}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
