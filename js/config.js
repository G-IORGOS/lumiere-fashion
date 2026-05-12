// ═══════════════════════════════════════════════════════════════
//  LUMIÈRE — Κεντρική Διαμόρφωση
//  Αλλάξτε τα παρακάτω για να προσαρμόσετε το κατάστημά σας
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  store: {
    name:        'LUMIÈRE',
    tagline:     'Γυναικεία Μόδα',
    domain:      'lumiere.gr',
    phone:       '+30 210 0000000',
    whatsapp:    '30XXXXXXXXXX',          // χωρίς + π.χ. 306912345678
    viber:       '30XXXXXXXXXX',
    email:       'info@lumiere.gr',
    adminEmail:  'admin@lumiere.gr',
    address:     'Ερμού 10, 10563 Αθήνα',
    // Νομικά στοιχεία — υποχρεωτικά για ελληνικό eshop
    vat:         '123456789',             // ΑΦΜ
    gemi:        '123456789000',          // ΓΕΜΗ
    doy:         "Α' Αθηνών",
    legalName:   'LUMIÈRE ΜΟΝΟΠΡΟΣΩΠΗ ΙΚΕ',
  },

  shipping: {
    freeThreshold: 49,                    // Δωρεάν αποστολή από X€
    methods: [
      { id:'acs',      name:'ACS Courier',      price:3.50, days:'1-2 εργάσιμες', logo:'🚚' },
      { id:'elta',     name:'ELTA Courier',      price:3.00, days:'2-3 εργάσιμες', logo:'📮' },
      { id:'speedex',  name:'Speedex',           price:3.50, days:'1-2 εργάσιμες', logo:'⚡' },
      { id:'boxnow',   name:'Box Now Locker',    price:2.50, days:'1-2 εργάσιμες', logo:'📦' },
    ],
    // API keys — ζητήστε από κάθε courier
    acsApiKey:     '',
    eltaApiKey:    '',
    speedexApiKey: '',
  },

  payment: {
    vivaWallet: {
      enabled:    true,
      merchantId: 'YOUR_MERCHANT_ID',     // Από Viva Wallet dashboard
      apiKey:     'YOUR_API_KEY',
      // Smart Checkout URL — παίρνετε από Viva Wallet
      checkoutUrl:'https://demo.vivapayments.com/web/checkout?ref=',
    },
    stripe: {
      enabled:   false,
      publicKey: 'pk_test_...',           // Από Stripe dashboard
    },
    paypal: {
      enabled:   false,
      clientId:  'YOUR_PAYPAL_CLIENT_ID',
    },
    cod: {
      enabled: true,
      fee:     1.50,                      // Χρέωση αντικαταβολής
      label:   'Αντικαταβολή',
    },
    bankTransfer: {
      enabled: true,
      iban:    'GR00 0000 0000 0000 0000 0000 000',
      bank:    'Τράπεζα Πειραιώς',
      beneficiary: 'LUMIÈRE ΜΟΝΟΠΡΟΣΩΠΗ ΙΚΕ',
    },
  },

  // EmailJS — δωρεάν έως 200 emails/μήνα — emailjs.com
  emailjs: {
    serviceId:        'YOUR_SERVICE_ID',
    orderTemplateId:  'YOUR_ORDER_TEMPLATE',  // Email στον πελάτη
    adminTemplateId:  'YOUR_ADMIN_TEMPLATE',  // Email στον admin
    publicKey:        'YOUR_PUBLIC_KEY',
  },

  // AADE myDATA — υποχρεωτικό για ΦΠΑ/τιμολόγια
  mydata: {
    enabled:         false,               // true για παραγωγή
    aadeUserId:      '',                  // aade.gr > myDATA
    subscriptionKey: '',
    issuerVat:       '',                  // ΑΦΜ επιχείρησης
    issuerCountry:   'GR',
    vatRate:         24,                  // Συντελεστής ΦΠΑ %
  },

  // Google Analytics / Meta Pixel
  analytics: {
    googleId: 'G-XXXXXXXXXX',
    metaPixelId: '',
  },

  admin: {
    password: 'admin2025',               // Αλλάξτε το πριν το deploy!
  },
};

// ═══════════════════════════════════════════════════════════════
//  Αρχικά Προϊόντα — Μπορείτε να τα αλλάξετε από τον Admin Panel
// ═══════════════════════════════════════════════════════════════

const INITIAL_PRODUCTS = [
  {
    id:1, sku:'FOR-LIN-001',
    name:'Midi Φόρεμα Linen Blend',
    brand:'LUMIÈRE', category:'foremata',
    price:89, oldPrice:null,
    image:'assets/products/for-lin-001.jpg',
    emoji:'👗',
    colors:['Εκρού','Μπλε Ναυτικό','Μαύρο'],
    sizes:['XS','S','M','L'],
    badge:'new', rating:5, reviews:12,
    stock:15,
    description:'Midi φόρεμα από premium linen blend. Άνετη γραμμή A, κουμπιά μπροστά, ζώνη που συμπεριλαμβάνεται. Ιδανικό για καθημερινή και επίσημη χρήση.',
    featured:true, active:true
  },
  {
    id:2, sku:'BLZ-SAT-002',
    name:'Σατέν Μπλούζα Minimal',
    brand:'LUMIÈRE', category:'blouzes',
    price:45, oldPrice:62,
    image:'assets/products/blz-sat-002.jpg',
    emoji:'👚',
    colors:['Εκρού','Ροζ','Λευκό'],
    sizes:['S','M','L','XL'],
    badge:'sale', rating:4, reviews:8,
    stock:20,
    description:'Σατέν μπλούζα με V-neck και ελαφριά αίσθηση. Πέφτει τέλεια στο σώμα.',
    featured:true, active:true
  },
  {
    id:3, sku:'PAN-FLR-003',
    name:'Flared Παντελόνι High Waist',
    brand:'LUMIÈRE', category:'pantelonia',
    price:72, oldPrice:null,
    image:'assets/products/pan-flr-003.jpg',
    emoji:'👖',
    colors:['Μαύρο','Λευκό','Camel'],
    sizes:['XS','S','M'],
    badge:null, rating:5, reviews:19,
    stock:8,
    description:'High waist flared παντελόνι από stretch ύφασμα. Κολακευτικό σε κάθε σιλουέτα.',
    featured:false, active:true
  },
  {
    id:4, sku:'TSA-STR-004',
    name:'Structured Δερμάτινη Τσάντα',
    brand:'LUMIÈRE', category:'aksesuar',
    price:145, oldPrice:null,
    image:'assets/products/tsa-str-004.jpg',
    emoji:'👜',
    colors:['Camel','Μαύρο','Ταμπά'],
    sizes:null,
    badge:'exclusive', rating:5, reviews:6,
    stock:5,
    description:'Χειροποίητη τσάντα από genuine leather. Αφαιρούμενο λουράκι, εσωτερικές θήκες.',
    featured:true, active:true
  },
  {
    id:5, sku:'FOR-FLO-005',
    name:'Maxi Floral Φόρεμα',
    brand:'LUMIÈRE', category:'foremata',
    price:115, oldPrice:145,
    image:'assets/products/for-flo-005.jpg',
    emoji:'🌸',
    colors:['Φλοράλ Ροζ','Φλοράλ Μπλε'],
    sizes:['XS','S','M','L','XL'],
    badge:'sale', rating:4, reviews:22,
    stock:12,
    description:'Maxi φόρεμα με floral τύπωμα. Ελαφριά crepe ύφανση, wrap design, κρυφό φερμουάρ.',
    featured:false, active:true
  },
  {
    id:6, sku:'BLZ-RIB-006',
    name:'Ribbed Crop Top',
    brand:'LUMIÈRE', category:'blouzes',
    price:32, oldPrice:null,
    image:'assets/products/blz-rib-006.jpg',
    emoji:'👙',
    colors:['Λευκό','Μαύρο','Camel','Γκρι'],
    sizes:['XS','S','M'],
    badge:'new', rating:4, reviews:31,
    stock:25,
    description:'Ribbed crop top από premium cotton blend. Slim fit, stretch ύφασμα.',
    featured:false, active:true
  },
  {
    id:7, sku:'PAN-LIN-007',
    name:'Wide Leg Linen Παντελόνι',
    brand:'LUMIÈRE', category:'pantelonia',
    price:85, oldPrice:null,
    image:'assets/products/pan-lin-007.jpg',
    emoji:'🩱',
    colors:['Εκρού','Camel','Λευκό'],
    sizes:['XS','S','M','L'],
    badge:null, rating:5, reviews:14,
    stock:10,
    description:'Wide leg παντελόνι από 100% linen. Ψηλόμεσο, ελαστική μέση, ευρεία κοπή.',
    featured:true, active:true
  },
  {
    id:8, sku:'KOL-GLD-008',
    name:'Gold Chain Κολιέ Layered',
    brand:'LUMIÈRE', category:'aksesuar',
    price:28, oldPrice:null,
    image:'assets/products/kol-gld-008.jpg',
    emoji:'📿',
    colors:['Χρυσό','Ασημί'],
    sizes:null,
    badge:'new', rating:5, reviews:9,
    stock:30,
    description:'Set από 3 gold plated κολιέ διαφορετικού μήκους. 18k επιχρύσωση, υποαλλεργικά.',
    featured:false, active:true
  },
];
