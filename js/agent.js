// ═══════════════════════════════════════════════════════════════
//  LUMIÈRE — Notification Agent
//  Αποστολή emails για παραγγελίες μέσω EmailJS (δωρεάν)
//  Ρύθμιση: emailjs.com → Sign up → Email Services → Templates
// ═══════════════════════════════════════════════════════════════

const Agent = (() => {

  let initialized = false;

  function init() {
    if (initialized || !CONFIG.emailjs.publicKey || CONFIG.emailjs.publicKey === 'YOUR_PUBLIC_KEY') return;
    // EmailJS SDK loaded via CDN in HTML
    if (typeof emailjs !== 'undefined') {
      emailjs.init(CONFIG.emailjs.publicKey);
      initialized = true;
    }
  }

  // ── Email πελάτη μετά από παραγγελία ──────────────────────
  async function sendOrderConfirmation(order) {
    init();
    const params = {
      to_email:    order.customer.email,
      to_name:     order.customer.firstName + ' ' + order.customer.lastName,
      order_id:    order.id,
      order_total: formatPrice(order.total),
      order_items: order.items.map(i => `${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`).join('\n'),
      shipping_method: order.shipping.name,
      shipping_address: `${order.customer.address}, ${order.customer.city} ${order.customer.postal}`,
      payment_method: order.payment.label,
      store_name:  CONFIG.store.name,
      store_email: CONFIG.store.email,
      store_phone: CONFIG.store.phone,
    };

    if (!initialized) {
      console.log('📧 [DEMO] Order confirmation email:', params);
      return { status: 200, text: 'DEMO — EmailJS not configured' };
    }

    try {
      const res = await emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.orderTemplateId,
        params
      );
      console.log('✅ Order confirmation sent to', order.customer.email);
      return res;
    } catch(err) {
      console.error('❌ Email error:', err);
      throw err;
    }
  }

  // ── Notification admin για νέα παραγγελία ─────────────────
  async function notifyAdmin(order) {
    init();
    const params = {
      to_email:    CONFIG.store.adminEmail,
      order_id:    order.id,
      order_total: formatPrice(order.total),
      customer_name: order.customer.firstName + ' ' + order.customer.lastName,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      order_items: order.items.map(i => `${i.sku} | ${i.name} x${i.qty}`).join('\n'),
      shipping_method: order.shipping.name,
      payment_method: order.payment.label,
      order_time:  new Date(order.createdAt).toLocaleString('el-GR'),
    };

    if (!initialized) {
      console.log('📧 [DEMO] Admin notification email:', params);
      return;
    }

    try {
      await emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.adminTemplateId,
        params
      );
      console.log('✅ Admin notified for order', order.id);
    } catch(err) {
      console.error('❌ Admin email error:', err);
    }
  }

  // ── myDATA: Αποστολή παραστατικού στην ΑΑΑΔΕ ──────────────
  async function submitToMyData(order) {
    if (!CONFIG.mydata.enabled) {
      console.log('📄 [DEMO] myDATA submission — not configured');
      return { demo: true };
    }

    const vatRate   = CONFIG.mydata.vatRate / 100;
    const netAmount = order.total / (1 + vatRate);
    const vatAmount = order.total - netAmount;

    const invoiceData = {
      invoicesDoc: {
        invoice: [{
          issuer: {
            vatNumber:   CONFIG.mydata.issuerVat,
            country:     CONFIG.mydata.issuerCountry,
            branch:      0
          },
          counterpart: {
            vatNumber:   order.customer.vat || '000000000',
            country:     'GR',
            branch:      0,
            name:        order.customer.firstName + ' ' + order.customer.lastName,
            address: {
              street:    order.customer.address,
              city:      order.customer.city,
              postalCode:order.customer.postal,
            }
          },
          invoiceHeader: {
            series:     'A',
            aa:         order.id,
            issueDate:  order.createdAt.split('T')[0],
            invoiceType:'1.1',            // Τιμολόγιο Πώλησης
            currency:   'EUR',
          },
          paymentMethods: {
            paymentMethodDetails: [{
              type:   1,                  // 1=Domestic Payment
              amount: order.total,
            }]
          },
          invoiceDetails: order.items.map((item, idx) => ({
            lineNumber:    idx + 1,
            netValue:      (item.price * item.qty / (1 + vatRate)).toFixed(2),
            vatCategory:   1,             // 24% κατηγορία
            vatAmount:     (item.price * item.qty * vatRate / (1 + vatRate)).toFixed(2),
          })),
          invoiceSummary: {
            totalNetValue: netAmount.toFixed(2),
            totalVatAmount: vatAmount.toFixed(2),
            totalGrossValue: order.total.toFixed(2),
          }
        }]
      }
    };

    // Κλήση myDATA API
    const url = 'https://mydata.aade.gr/sendInvoices';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          'aade-user-id':      CONFIG.mydata.aadeUserId,
          'Ocp-Apim-Subscription-Key': CONFIG.mydata.subscriptionKey,
        },
        body: jsonToXml(invoiceData),
      });
      const data = await res.text();
      console.log('✅ myDATA response:', data);
      return data;
    } catch(err) {
      console.error('❌ myDATA error:', err);
    }
  }

  // ── ACS Courier: Δημιουργία voucher ───────────────────────
  async function createACSVoucher(order) {
    if (!CONFIG.shipping.acsApiKey || order.shipping.id !== 'acs') return null;
    // ACS API call — docs: acs-courier.com/developers
    console.log('📦 [DEMO] ACS voucher creation for order', order.id);
    return { voucherNumber: 'ACS-DEMO-' + order.id, trackingUrl: 'https://acscourier.net/track' };
  }

  // ── Push Notification (browser) ───────────────────────────
  async function requestPushPermission() {
    if (!('Notification' in window)) return;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  function pushNotify(title, body) {
    if (Notification.permission !== 'granted') return;
    new Notification(title, {
      body,
      icon: 'assets/icon-192.png',
      badge: 'assets/badge-72.png',
    });
  }

  // ── Utility ───────────────────────────────────────────────
  function formatPrice(n) {
    return n.toFixed(2).replace('.', ',') + '€';
  }

  function jsonToXml(obj, rootName = '') {
    // Minimal JSON→XML for myDATA (use a library in production)
    let xml = '';
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'object' && !Array.isArray(v)) {
        xml += `<${k}>${jsonToXml(v)}</${k}>`;
      } else if (Array.isArray(v)) {
        v.forEach(item => { xml += `<${k}>${jsonToXml(item)}</${k}>`; });
      } else {
        xml += `<${k}>${v}</${k}>`;
      }
    }
    return xml;
  }

  return {
    sendOrderConfirmation,
    notifyAdmin,
    submitToMyData,
    createACSVoucher,
    requestPushPermission,
    pushNotify,
  };
})();
