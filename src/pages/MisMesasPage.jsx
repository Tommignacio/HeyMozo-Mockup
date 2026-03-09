import MesaCard from '../components/MesaCard';

const staticMesas = [
  { number: '3', variant: 'yellow', icon: 'info',   status: 'Nvo Cliente', time: '1m'               },
  { number: '4', variant: 'green',  icon: 'person', status: 'Llama Mozo',  time: '4m'               },
  { number: '5', variant: 'orange', icon: 'bell',   status: 'Llama Mozo',  time: '4m', badgeCount: 1 },
  { number: '6',  variant: 'libre', icon: 'table',  status: 'Libre'                     },
  { number: '7',  variant: 'libre', icon: 'table',  status: 'Libre'                     },
  { number: '8',  variant: 'libre', icon: 'table',  status: 'Libre'                     },
  { number: '9',  variant: 'libre', icon: 'table',  status: 'Libre'                     },
  { number: '10', variant: 'libre', icon: 'table',  status: 'Libre'                     },
  { number: '11', variant: 'libre', icon: 'table',  status: 'Libre'                     },
  { number: '12', variant: 'libre', icon: 'table',  status: 'Libre'                     },
];

function getMesa1Card(status) {
  if (status === 'PENDING') return { number: '1', variant: 'red',   icon: 'receipt', status: 'CUENTA: TARJETA',   time: '2 MIN' };
  if (status === 'PAID')    return { number: '1', variant: 'libre', icon: 'table',   status: 'COBRADO (TARJETA)' };
  return                           { number: '1', variant: 'libre', icon: 'table',   status: 'Libre' };
}

function getMesa2Card(status) {
  if (status === 'PENDING') return { number: '2', variant: 'red',   icon: 'receipt', status: 'CUENTA: EFECTIVO',   time: '1 MIN' };
  if (status === 'PAID')    return { number: '2', variant: 'libre', icon: 'table',   status: 'COBRADO (EFECTIVO)' };
  return                           { number: '2', variant: 'libre', icon: 'table',   status: 'Libre' };
}

export default function MisMesasPage({ mesa1Status = 'PENDING', mesa2Status = 'PENDING' }) {
  const mesas = [getMesa1Card(mesa1Status), getMesa2Card(mesa2Status), ...staticMesas];

  return (
    <div className="px-3 pt-2 pb-6 lg:px-8 lg:pb-8">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {mesas.map((mesa) => (
          <MesaCard key={mesa.number} {...mesa} />
        ))}
      </div>
    </div>
  );
}
