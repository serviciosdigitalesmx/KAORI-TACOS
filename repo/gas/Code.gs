function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Tacos Kas Ri')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getBootstrap() {
  return {
    config: getConfig(),
    menu: getMenu()
  };
}

function getConfig() {
  return {
    businessName: 'Tacos Kas Ri',
    heroSubtitle: 'Servicio a domicilio',
    whatsapp: '528115084869',
    phone: '8115084869',
    phoneAlt: '5548549106',
    openHour: 18,
    closeHour: 24,
    closedDay: 'martes',
    deliveryTime: '30-45 min'
  };
}

function getMenu() {
  return [
    { id: 1, sec: 'tacos', name: 'Tacos de trompo', price: 60, desc: 'Promoción visible en el volante', tag: '⭐ Promo', image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9a?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 2, sec: 'tacos', name: 'Chingas', price: 40, desc: 'Producto del volante', tag: '🌮', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 3, sec: 'tacos', name: 'Chingas con queso', price: 55, desc: 'Con queso', tag: '🧀', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 4, sec: 'tacos', name: 'Gringa grande', price: 79, desc: 'Gringa grande', tag: '⭐', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 5, sec: 'tacos', name: 'Papa sencilla', price: 50, desc: 'Papa sencilla', tag: '🥔', image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 6, sec: 'tacos', name: 'Hamburguesa sencilla', price: 45, desc: 'Hamburguesa sencilla', tag: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 7, sec: 'tacos', name: 'Salchitrompo', price: 60, desc: 'Salchicha con trompo', tag: '🌭', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 8, sec: 'tacos', name: 'Torta con trompo', price: 60, desc: 'Torta con trompo', tag: '🥪', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 9, sec: 'tacos', name: 'Taquitos de bistec con queso', price: 65, desc: 'Orden visible en el volante', tag: '🔥', image: 'https://images.unsplash.com/photo-1626700051269-d1b3db3e1b44?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 10, sec: 'tacos', name: 'Taquitos de bistec con queso', price: 80, desc: 'Versión grande', tag: '🔥', image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 11, sec: 'tacos', name: 'Pirata', price: 55, desc: 'Tortilla, carne y queso', tag: '🌯', image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 12, sec: 'tacos', name: 'Pirata con queso', price: 70, desc: 'Con queso extra', tag: '🧀', image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 13, sec: 'tacos', name: 'Pirata grande', price: 100, desc: 'Versión grande', tag: '📌', image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 14, sec: 'hamburguesas', name: 'Hamburguesa con bistec', price: 75, desc: 'Con bistec', tag: '🥩', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 15, sec: 'hamburguesas', name: 'Hamburguesa hawaiana', price: 65, desc: 'Hawaiana', tag: '🍍', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 16, sec: 'hamburguesas', name: 'Hamburguesa lite', price: 80, desc: 'Lite', tag: '✨', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 17, sec: 'hamburguesas', name: 'Hamburguesa c bistec', price: 75, desc: 'Con bistec', tag: '🥩', image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 18, sec: 'tortas', name: 'Torta hawaiana', price: 65, desc: 'Hawaiana', tag: '🍍', image: 'https://images.unsplash.com/photo-1619096252216-ef06c45683dc?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 19, sec: 'frijoles', name: 'Frijoles charros sencillos', price: 30, desc: 'Sencillos', tag: '🫘', image: 'https://images.unsplash.com/photo-1601314167099-232775b3d5d2?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 20, sec: 'frijoles', name: 'Frijoles preparados con bistec', price: 50, desc: 'Con bistec', tag: '🥩', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 21, sec: 'frijoles', name: 'Frijoles preparados mixtos', price: 47, desc: 'Mixtos', tag: '🫘', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80', available: true },
    { id: 22, sec: 'frijoles', name: 'Con trompo', price: 45, desc: 'Con trompo', tag: '🌮', image: 'https://images.unsplash.com/photo-1604908554017-1f3f1b4a1f3d?auto=format&fit=crop&w=900&q=80', available: true }
  ];
}
