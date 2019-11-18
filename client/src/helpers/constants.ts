export const menuItems = [
  { to: '/', name: 'home', text: 'Home' },
  { to: '/vehicles', name: 'fleet', text: 'Our Fleet' },
  { to: '/bookings', name: 'bookings', text: 'Bookings' },
  { to: '/about', name: 'about', text: 'About' },
  { to: '/login', name: 'login', text: 'Login' },
  { to: '/register', name: 'register', text: 'Register' }
];

export const carTypes = ['All', 'Economy', 'Compact', 'SUV', 'Full Size'];

export const features = [
  { name: 'passengers', text: 'Passengers', icon: 'users', isNumber: true },
  { name: 'baggages', text: 'Baggages', icon: 'suitcase', isNumber: true },
  { name: 'doors', text: 'Doors', icon: 'nintendo switch', isNumber: true },
  { name: 'transmission', icon: 'settings', isString: true },
  { name: 'propulsion', icon: 'cogs', isString: true },
  { name: 'incineration', icon: 'leaf', isString: true },
  { name: 'airconditioning', text: 'Air Conditioning', icon: 'snowflake' },
  { name: 'ABS', text: 'ABS', icon: 'users' },
  { name: 'USB', text: 'USB', icon: 'usb' },
  { name: 'powerWindows', text: 'Power Windows', icon: 'microchip' },
  { name: 'remoteLocking', text: 'Remote Locking', icon: 'lock open' },
  { name: 'Bluetooth', text: 'Bluetooth', icon: 'bluetooth' },
  { name: 'cruiseControl', text: 'Cruise Control', icon: 'dashboard' },
  { name: 'electricCar', text: 'Electric Car', icon: 'power card' }
];

export const extrasItems = [
  {
    name: 'SCDW Protection',
    path: '',
    price: 800,
    symbol: 'SCDW',
    system: 'day',
    description:
      'The Super Collision Damage Waiver reduces your excess in case of damage to your rental car.'
  },
  {
    name: 'WSP Protection',
    path: '',
    price: 600,
    symbol: 'WSP',
    system: 'day',
    description:
      'The windshield protection eliminates your liability in case of damage to the front windshield and headlights.'
  },
  {
    name: 'TP Protection',
    path: '',
    price: 400,
    symbol: 'TP',
    system: 'day',
    description:
      'The theft protection reduces your excess in case of theft of the vehicle.'
  },
  {
    name: 'SAAP Protection',
    path: '',
    price: 500,
    symbol: 'SAAP',
    system: 'day',
    description:
      'The Sand and Ash Protection reduces your excess in case of damage done by sand and ash storms.'
  },
  {
    name: 'GPS Navigation System',
    path: '',
    price: 4800,
    symbol: 'GPS',
    system: 'unit',
    description:
      "Don't get lost in Iceland, hire a GPS system. (Max charge 7 days)"
  },
  {
    name: 'Infant Seat',
    path: '',
    price: 3500,
    symbol: 'Infant',
    system: 'unit',
    description: 'Infant Seat 0-9 kg.'
  },
  {
    name: 'Child Seat',
    path: '',
    price: 2700,
    symbol: 'Child',
    system: 'unit',
    description: 'Child Seat for children 9-18 kg.'
  },
  {
    name: 'Booster Seat',
    path: '',
    price: 2000,
    symbol: 'Booster',
    system: 'unit',
    description: 'Booster Seat for children 18-36 kg.'
  }
];
