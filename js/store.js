// ═══════════════════════════════════════════════════════════════
//  LUMIÈRE — Store: Products, Orders, Customers (localStorage)
// ═══════════════════════════════════════════════════════════════

const Store = (() => {

  // ── Products ──────────────────────────────────────────────
  function getProducts() {
    const saved = localStorage.getItem('lum_products');
    if (saved) return JSON.parse(saved);
    // First run: seed from config
    saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  }

  function saveProducts(products) {
    localStorage.setItem('lum_products', JSON.stringify(products));
  }

  function getProduct(id) {
    return getProducts().find(p => p.id === parseInt(id));
  }

  function addProduct(product) {
    const products = getProducts();
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...product, id: newId, active: true };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
  }

  function updateProduct(id, data) {
    const products = getProducts();
    const idx = products.findIndex(p => p.id === parseInt(id));
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...data };
    saveProducts(products);
    return products[idx];
  }

  function deleteProduct(id) {
    const products = getProducts().filter(p => p.id !== parseInt(id));
    saveProducts(products);
  }

  function getActiveProducts() {
    return getProducts().filter(p => p.active !== false);
  }

  // ── Orders ────────────────────────────────────────────────
  function getOrders() {
    return JSON.parse(localStorage.getItem('lum_orders') || '[]');
  }

  function saveOrders(orders) {
    localStorage.setItem('lum_orders', JSON.stringify(orders));
  }

  function createOrder(orderData) {
    const orders = getOrders();
    const orderId = 'LUM-' + Date.now().toString().slice(-6);
    const order = {
      id: orderId,
      ...orderData,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.unshift(order);
    saveOrders(orders);
    return order;
  }

  function updateOrderStatus(orderId, status) {
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return null;
    orders[idx].status = status;
    orders[idx].updatedAt = new Date().toISOString();
    saveOrders(orders);
    return orders[idx];
  }

  function getOrder(orderId) {
    return getOrders().find(o => o.id === orderId);
  }

  // ── Customers ─────────────────────────────────────────────
  function getCustomers() {
    return JSON.parse(localStorage.getItem('lum_customers') || '[]');
  }

  function upsertCustomer(email, data) {
    const customers = getCustomers();
    const idx = customers.findIndex(c => c.email === email);
    if (idx >= 0) {
      customers[idx] = { ...customers[idx], ...data, updatedAt: new Date().toISOString() };
    } else {
      customers.push({ email, ...data, createdAt: new Date().toISOString(), orders: 0 });
    }
    localStorage.setItem('lum_customers', JSON.stringify(customers));
  }

  // ── Wishlist ──────────────────────────────────────────────
  function getWishlist() {
    return JSON.parse(localStorage.getItem('lum_wishlist') || '[]');
  }

  function toggleWishlist(productId) {
    const wl = getWishlist();
    const idx = wl.indexOf(productId);
    if (idx >= 0) {
      wl.splice(idx, 1);
    } else {
      wl.push(productId);
    }
    localStorage.setItem('lum_wishlist', JSON.stringify(wl));
    return idx < 0; // true = added
  }

  function isWishlisted(productId) {
    return getWishlist().includes(productId);
  }

  // ── Analytics helpers ─────────────────────────────────────
  function getStats() {
    const orders = getOrders();
    const products = getProducts();
    const revenue = orders.filter(o => o.status !== 'cancelled')
      .reduce((s, o) => s + (o.total || 0), 0);
    return {
      totalOrders:   orders.length,
      pendingOrders: orders.filter(o => o.status === 'new').length,
      totalRevenue:  revenue,
      totalProducts: products.length,
      activeProducts: products.filter(p => p.active).length,
    };
  }

  return {
    getProducts, saveProducts, getProduct, getActiveProducts,
    addProduct, updateProduct, deleteProduct,
    getOrders, createOrder, updateOrderStatus, getOrder,
    getCustomers, upsertCustomer,
    getWishlist, toggleWishlist, isWishlisted,
    getStats,
  };
})();
