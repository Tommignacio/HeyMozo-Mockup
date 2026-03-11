// Placeholder image - comida/plato from Unsplash (reused for all items)
const PLATE_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';

export const menuCategories = [
  {
    category: 'Entradas',
    items: [
      { title: 'Ensalada César', description: 'Lechuga romana, crotones, parmesano y aderezo césar', price: '$8.500', image: PLATE_IMAGE },
      { title: 'Bruschetta', description: 'Pan tostado con tomate, albahaca y aceite de oliva', price: '$6.200', image: PLATE_IMAGE },
      { title: 'Sopa del día', description: 'Sopa casera variada según temporada', price: '$5.800', image: PLATE_IMAGE },
    ],
  },
  {
    category: 'Principales',
    items: [
      { title: 'Pasta a la boloñesa', description: 'Spaghetti con salsa de carne, tomate y hierbas', price: '$12.900', image: PLATE_IMAGE },
      { title: 'Pollo al horno', description: 'Pechuga con papas rústicas y vegetales', price: '$14.500', image: PLATE_IMAGE },
      { title: 'Risotto de champiñones', description: 'Arroz cremoso con champiñones y parmesano', price: '$13.200', image: PLATE_IMAGE },
    ],
  },
  {
    category: 'Postres',
    items: [
      { title: 'Tiramisú', description: 'Clásico italiano con café y mascarpone', price: '$7.800', image: PLATE_IMAGE },
      { title: 'Brownie con helado', description: 'Brownie de chocolate con bola de helado de vainilla', price: '$6.500', image: PLATE_IMAGE },
    ],
  },
  {
    category: 'Bebidas',
    items: [
      { title: 'Agua mineral', description: '500ml con o sin gas', price: '$2.500', image: PLATE_IMAGE },
      { title: 'Limonada natural', description: 'Jugo de limón fresco con hierbabuena', price: '$4.200', image: PLATE_IMAGE },
      { title: 'Café espresso', description: 'Simple o doble', price: '$3.200', image: PLATE_IMAGE },
    ],
  },
];
