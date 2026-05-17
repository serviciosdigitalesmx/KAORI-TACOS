const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

const defaultConfig = {
  businessName: process.env.BUSINESS_NAME || 'Tacos Kas Ri',
  whatsapp: process.env.WHATSAPP || '528115084869',
  phone: process.env.PHONE || '8115084869',
  phoneAlt: process.env.PHONE_ALT || '5548549106',
  openHour: Number(process.env.OPEN_HOUR || 18),
  closeHour: Number(process.env.CLOSE_HOUR || 24),
  closedDay: process.env.CLOSED_DAY || 'martes',
  deliveryTime: process.env.DELIVERY_TIME || '30-45 min',
  currency: 'MXN',
  heroTitle: process.env.HERO_TITLE || 'Tacos Kas Ri',
  heroSubtitle: process.env.HERO_SUBTITLE || 'Servicio a domicilio'
};

const defaultMenu = [
  { id: 1, sec: 'tacos', name: 'Tacos de trompo', price: 60, desc: 'Promoción visible en el volante', tag: '⭐ Promo', image: '', available: true },
  { id: 2, sec: 'tacos', name: 'Chingas', price: 40, desc: 'Producto del volante', tag: '🌮', image: '', available: true },
  { id: 3, sec: 'tacos', name: 'Chingas con queso', price: 55, desc: 'Con queso', tag: '🧀', image: '', available: true },
  { id: 4, sec: 'tacos', name: 'Gringa grande', price: 79, desc: 'Gringa grande', tag: '⭐', image: '', available: true },
  { id: 5, sec: 'tacos', name: 'Papa sencilla', price: 50, desc: 'Papa sencilla', tag: '🥔', image: '', available: true },
  { id: 6, sec: 'tacos', name: 'Hamburguesa sencilla', price: 45, desc: 'Hamburguesa sencilla', tag: '🍔', image: '', available: true },
  { id: 7, sec: 'tacos', name: 'Salchitrompo', price: 60, desc: 'Salchicha con trompo', tag: '🌭', image: '', available: true },
  { id: 8, sec: 'tacos', name: 'Torta con trompo', price: 60, desc: 'Torta con trompo', tag: '🥪', image: '', available: true },
  { id: 9, sec: 'tacos', name: 'Taquitos de bistec con queso', price: 65, desc: 'Orden visible en el volante', tag: '🔥', image: '', available: true },
  { id: 10, sec: 'tacos', name: 'Taquitos de bistec con queso', price: 80, desc: 'Versión grande', tag: '🔥', image: '', available: true },
  { id: 11, sec: 'tacos', name: 'Pirata', price: 55, desc: 'Tortilla, carne y queso', tag: '🌯', image: '', available: true },
  { id: 12, sec: 'tacos', name: 'Pirata con queso', price: 70, desc: 'Con queso extra', tag: '🧀', image: '', available: true },
  { id: 13, sec: 'tacos', name: 'Pirata grande', price: 100, desc: 'Versión grande', tag: '📌', image: '', available: true },
  { id: 14, sec: 'tacos', name: 'Papas sencillas', price: 49, desc: 'Versión en plural del volante', tag: '🥔', image: '', available: true },
  { id: 15, sec: 'tacos', name: 'Papas con bistec', price: 64, desc: 'Con bistec', tag: '🥩', image: '', available: true },
  { id: 16, sec: 'tacos', name: 'Papas mixtas', price: 75, desc: 'Mixtas', tag: '🥩', image: '', available: true },
  { id: 17, sec: 'hamburguesas', name: 'Hamburguesa con bistec', price: 75, desc: 'Con bistec', tag: '🥩', image: '', available: true },
  { id: 18, sec: 'hamburguesas', name: 'Hamburguesa hawaiana', price: 65, desc: 'Hawaiana', tag: '🍍', image: '', available: true },
  { id: 19, sec: 'hamburguesas', name: 'Hamburguesa lite', price: 80, desc: 'Lite', tag: '✨', image: '', available: true },
  { id: 20, sec: 'hamburguesas', name: 'Hamburguesa c bistec', price: 75, desc: 'Con bistec', tag: '🥩', image: '', available: true },
  { id: 21, sec: 'tortas', name: 'Torta hawaiana', price: 65, desc: 'Hawaiana', tag: '🍍', image: '', available: true },
  { id: 22, sec: 'frijoles', name: 'Frijoles charros sencillos', price: 30, desc: 'Sencillos', tag: '🫘', image: '', available: true },
  { id: 23, sec: 'frijoles', name: 'Frijoles preparados con bistec', price: 50, desc: 'Con bistec', tag: '🥩', image: '', available: true },
  { id: 24, sec: 'frijoles', name: 'Frijoles preparados mixtos', price: 47, desc: 'Mixtos', tag: '🫘', image: '', available: true },
  { id: 25, sec: 'frijoles', name: 'Con trompo', price: 45, desc: 'Con trompo', tag: '🌮', image: '', available: true }
];

function ensureData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CONFIG_FILE)) fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
  if (!fs.existsSync(MENU_FILE)) fs.writeFileSync(MENU_FILE, JSON.stringify(defaultMenu, null, 2));
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

ensureData();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/bootstrap', (req, res) => {
  try {
    const config = readJson(CONFIG_FILE, defaultConfig);
    const menu = readJson(MENU_FILE, defaultMenu);
    res.json({ config, menu });
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar bootstrap' });
  }
});

app.get('/api/config', (req, res) => {
  try {
    res.json(readJson(CONFIG_FILE, defaultConfig));
  } catch (error) {
    res.status(500).json({ error: 'Error al leer configuración' });
  }
});

app.put('/api/config', (req, res) => {
  try {
    const next = { ...readJson(CONFIG_FILE, defaultConfig), ...req.body };
    writeJson(CONFIG_FILE, next);
    res.json({ success: true, config: next });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar configuración' });
  }
});

app.get('/api/menu', (req, res) => {
  try {
    res.json(readJson(MENU_FILE, defaultMenu));
  } catch (error) {
    res.status(500).json({ error: 'Error al leer menú' });
  }
});

app.post('/api/menu', (req, res) => {
  try {
    const menu = readJson(MENU_FILE, defaultMenu);
    const maxId = menu.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
    const item = {
      id: maxId + 1,
      sec: req.body.sec || 'tacos',
      name: String(req.body.name || '').trim(),
      price: Number(req.body.price || 0),
      desc: String(req.body.desc || '').trim(),
      tag: String(req.body.tag || '').trim(),
      image: String(req.body.image || '').trim(),
      available: req.body.available !== false
    };
    if (!item.name) return res.status(400).json({ error: 'Nombre requerido' });
    menu.push(item);
    writeJson(MENU_FILE, menu);
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

app.put('/api/menu/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const menu = readJson(MENU_FILE, defaultMenu);
    const index = menu.findIndex(i => Number(i.id) === id);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
    menu[index] = { ...menu[index], ...req.body, id };
    writeJson(MENU_FILE, menu);
    res.json({ success: true, item: menu[index] });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const menu = readJson(MENU_FILE, defaultMenu);
    const next = menu.filter(i => Number(i.id) !== id);
    writeJson(MENU_FILE, next);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

app.patch('/api/menu/:id/toggle', (req, res) => {
  try {
    const id = Number(req.params.id);
    const menu = readJson(MENU_FILE, defaultMenu);
    const index = menu.findIndex(i => Number(i.id) === id);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
    menu[index].available = !menu[index].available;
    writeJson(MENU_FILE, menu);
    res.json({ success: true, item: menu[index] });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar disponibilidad' });
  }
});

app.get('/api/orders', (req, res) => {
  try {
    res.json(readJson(ORDERS_FILE, []));
  } catch (error) {
    res.status(500).json({ error: 'Error al leer pedidos' });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const orders = readJson(ORDERS_FILE, []);
    const order = {
      ...req.body,
      id: Date.now(),
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };
    orders.push(order);
    writeJson(ORDERS_FILE, orders);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar pedido' });
  }
});

app.patch('/api/orders/:id/status', (req, res) => {
  try {
    const id = Number(req.params.id);
    const orders = readJson(ORDERS_FILE, []);
    const index = orders.findIndex(o => Number(o.id) === id);
    if (index === -1) return res.status(404).json({ error: 'Pedido no encontrado' });
    orders[index].status = req.body.status;
    orders[index].updatedAt = new Date().toISOString();
    writeJson(ORDERS_FILE, orders);
    res.json({ success: true, order: orders[index] });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pedido' });
  }
});

app.delete('/api/orders/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const orders = readJson(ORDERS_FILE, []);
    const next = orders.filter(o => Number(o.id) !== id);
    writeJson(ORDERS_FILE, next);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pedido' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
