// Central model loader — import here to ensure models are registered with mongoose
import './Address.js';
import './Order.js';
import './Products.js';
import './User.js';

// Optionally export models if other modules prefer named imports
import Address from './Address.js';
import Order from './Order.js';
import Product from './Products.js';
import User from './User.js';

export { Address, Order, Product, User };
