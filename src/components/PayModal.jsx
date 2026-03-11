import { Button, Modal } from '@heroui/react';

const MERCADO_PAGO_BLUE = '#009EE3';

export default function PayModal({ isOpen, onClose }) {
  const handlePayment = (method) => {
    alert(`Pago con ${method} realizado.`);
    onClose();
  };

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <Modal.Container className="fixed inset-0 flex items-center justify-center px-4 py-6">
        <Modal.Dialog className="w-[90vw] max-w-md rounded-[32px] bg-surface p-6 shadow-2xl">
          <Modal.CloseTrigger className="data-[hovered]:bg-muted text-foreground rounded-full p-1 hover:bg-muted/60" />
          <Modal.Header className="items-start gap-3 pb-4">
            <Modal.Icon className="bg-brand-soft text-brand-foreground">
              <span className="text-lg font-semibold">💳</span>
            </Modal.Icon>
            <div>
              <Modal.Heading className="text-2xl font-semibold text-foreground">Formas de pago</Modal.Heading>
              <p className="text-sm text-muted">Elegí la forma de pago que prefieras y confirmá la cuenta.</p>
            </div>
          </Modal.Header>

          <Modal.Body>
            <div className="flex flex-col gap-3">
              <Button
                fullWidth
                variant="outline"
                className="justify-start rounded-2xl px-4 py-3 text-base font-semibold"
                onPress={() => handlePayment('efectivo')}
              >
                💵 Pagar en efectivo
              </Button>
              <Button
                fullWidth
                variant="outline"
                className="justify-start rounded-2xl px-4 py-3 text-base font-semibold"
                onPress={() => handlePayment('tarjeta')}
              >
                💳 Pagar con tarjeta
              </Button>
              <Button
                fullWidth
                variant="solid"
                className="rounded-2xl px-4 py-3 text-base font-semibold text-white shadow-lg"
                style={{ backgroundColor: MERCADO_PAGO_BLUE }}
                onPress={() => handlePayment('Mercado Pago')}
              >
                <div className="flex items-center justify-center gap-2">
                  <MercadoPagoLogo />
                  Mercado Pago
                </div>
              </Button>
            </div>
          </Modal.Body>

            <Button slot="close" variant="ghost" className="w-full">
              Cancelar
            </Button>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}

function MercadoPagoLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="13" fill="#009EE3" />
      <text x="14" y="18" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">
        MP
      </text>
    </svg>
  );
}
