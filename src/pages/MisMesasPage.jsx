import MesaCard from '../components/MesaCard';

const mesas = [
  { number: '1', variant: 'red',    icon: 'receipt',      status: 'Pide Cuenta',  time: '191m', badgeCount: 1 },
  { number: '2', variant: 'orange', icon: 'bell-receipt', status: 'Llama+Cta',    time: '3m',   badgeCount: 1 },
  { number: '3', variant: 'yellow', icon: 'info',         status: 'Nvo Cliente',  time: '1m'                  },
  { number: '4', variant: 'green',  icon: 'person',       status: 'Llama Mozo',   time: '4m'                  },
  { number: '5', variant: 'orange', icon: 'bell',         status: 'Llama Mozo',   time: '4m'                  },
  { number: '6', variant: 'libre',  icon: 'table',        status: 'Libre'                                      },
  { number: '7', variant: 'libre',  icon: 'table',        status: 'Libre'                                      },
  { number: '8', variant: 'libre',  icon: 'table',        status: 'Libre'                                      },
  { number: '9', variant: 'libre',  icon: 'table',        status: 'Libre'                                      },
  { number: '10', variant: 'libre', icon: 'table',        status: 'Libre'                                      },
  { number: '11', variant: 'libre', icon: 'table',        status: 'Libre'                                      },
  { number: '12', variant: 'libre', icon: 'table',        status: 'Libre'                                      },
];

export default function MisMesasPage() {
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
