# LUMIÈRE — Eshop Template

Πλήρες template ελληνικού fashion eshop. Έτοιμο για παραγωγή μετά από απλές ρυθμίσεις.

---

## Δομή Αρχείων

```
lumiere-eshop/
├── index.html          ← Κεντρική σελίδα (κατάστημα)
├── checkout.html       ← Checkout (αποστολή + πληρωμή)
├── admin.html          ← Admin panel (διαχείριση)
├── js/
│   ├── config.js       ← ΟΛΑ τα API keys & ρυθμίσεις εδώ
│   ├── store.js        ← Βάση δεδομένων (localStorage)
│   └── agent.js        ← Email & myDATA notifications
└── assets/products/    ← Φωτογραφίες προϊόντων εδώ
```

---

## Βήμα 1: Domain (.gr)

### Εγγραφή .gr domain
1. Επισκεφθείτε **papaki.gr** ή **hostinger.gr** ή **ote.gr/domains**
2. Αναζητήστε `lumiere.gr` (ή το όνομα που θέλετε)
3. Κόστος: ~9-15€/χρόνο για .gr
4. Για .gr domain απαιτείται **ΑΦΜ ελληνικής επιχείρησης**

### Hosting
- **Netlify** (δωρεάν για static site): netlify.com → New site → Upload folder
- **Vercel** (δωρεάν): vercel.com → Deploy
- **Hostinger** (~2.99€/μήνα): εάν χρειάζεστε PHP/backend

---

## Βήμα 2: Ρύθμιση `js/config.js`

Ανοίξτε το `js/config.js` και αλλάξτε:

```js
store: {
  name:    'ΤΟ BRAND ΣΑΣ',
  domain:  'yourshop.gr',
  phone:   '+30 210 XXXXXXX',
  whatsapp:'306XXXXXXXXX',      // χωρίς +
  email:   'info@yourshop.gr',
  vat:     'ΑΦΜ',
  gemi:    'ΓΕΜΗ',
  address: 'Διεύθυνση',
}
```

---

## Βήμα 3: Viva Wallet (Πληρωμές)

Η πιο δημοφιλής λύση πληρωμών στην Ελλάδα.

1. Εγγραφή: **vivawallet.com** → Create Business Account
2. Απαιτούμενα: ΑΦΜ, ΓΕΜΗ, ταυτότητα
3. Dashboard → Payment Sources → Smart Checkout → Δημιουργία
4. Αντιγράψτε το **Merchant ID** και το **API Key** στο `config.js`
5. Δοκιμαστικό περιβάλλον: demo.vivapayments.com

**Εναλλακτικά:**
- **Stripe** (stripe.com) — διεθνής, εύκολη εγκατάσταση
- **Alpha e-Commerce** — για πελάτες Alpha Bank
- **Piraeus winbank** — για πελάτες Πειραιώς

---

## Βήμα 4: Email Notifications (EmailJS)

Αποστολή email σε πελάτη & admin κατά τη παραγγελία.

1. Εγγραφή: **emailjs.com** → Free plan (200 emails/μήνα)
2. Add Email Service → Gmail/Outlook/custom SMTP
3. Create Template — Customer (μεταβλητές: `{{to_name}}`, `{{order_id}}`, `{{order_total}}`)
4. Create Template — Admin (μεταβλητές: `{{order_id}}`, `{{customer_name}}`, `{{order_total}}`)
5. Αντιγράψτε Service ID, Template IDs, Public Key στο `config.js`

**Παράδειγμα email template:**
```
Θέμα: Επιβεβαίωση παραγγελίας #{{order_id}}

Αγαπητέ/ή {{to_name}},

Η παραγγελία σας #{{order_id}} ελήφθη!
Σύνολο: {{order_total}}
Προϊόντα: {{order_items}}
```

---

## Βήμα 5: ΑΑΑΔΕ myDATA (Φορολογική Σύνδεση)

Υποχρεωτικό για κάθε ελληνική επιχείρηση από 2021.

1. Σύνδεση: **aade.gr** → Υπηρεσίες → myDATA → Εγγραφή
2. Developers portal: **mydata.aade.gr**
3. Αποκτήστε: `aade-user-id` και `Ocp-Apim-Subscription-Key`
4. Θέστε στο `config.js`: `mydata.enabled: true`
5. Βάλτε τα credentials στο admin panel → Ρυθμίσεις → myDATA

**Σημαντικό:** Για παραγωγή χρησιμοποιείστε certified myDATA provider:
- **e-Soft** (esoft.gr/mydata)
- **SoftOne** (softone.gr)
- **Entersoft** (entersoft.gr)

---

## Βήμα 6: Courier APIs

### ACS Courier
1. Εγγραφή: **acscourier.net** → Business Account
2. Ζητήστε API credentials από τον account manager
3. Βάλτε το API key στο `config.js → shipping.acsApiKey`

### ELTA Courier
1. Εγγραφή: **eltacourier.gr** → B2B λογαριασμός
2. Docs: developers.elta.gr

### Speedex / DPD
1. Εγγραφή: **speedex.gr** → Επαγγελματικός

**Εναλλακτική:** Χρησιμοποιήστε **AfterSalesTech** (aftersalestech.com) για ενοποίηση όλων σε ένα API.

---

## Βήμα 7: Προσθήκη Προϊόντων & Φωτογραφιών

### Μέσω Admin Panel
1. Άνοιξε `admin.html` (κωδικός: `admin2025` — αλλάξτε το!)
2. Προϊόντα → Νέο Προϊόν
3. Βάλτε: Όνομα, SKU, κατηγορία, τιμή, απόθεμα
4. URL Εικόνας: βάλτε τη διαδρομή της φωτογραφίας
5. Emoji: fallback όταν δεν υπάρχει εικόνα

### Φωτογραφίες
- Αποθηκεύστε στο φάκελο `assets/products/`
- Ονομασία: `sku-του-προϊόντος.jpg` (π.χ. `for-lin-001.jpg`)
- Διαστάσεις: **600×800px** (αναλογία 3:4) — JPG/WebP
- Μέγεθος: <150KB (βελτιστοποιήστε με squoosh.app)

### Μαζική εισαγωγή (JSON)
Επεξεργαστείτε το `INITIAL_PRODUCTS` στο `js/config.js`

---

## Βήμα 8: Νομικές Απαιτήσεις Ελληνικού Eshop

### Υποχρεωτικά
- [ ] **ΑΦΜ & ΓΕΜΗ** — ορατά στο footer
- [ ] **Πολιτική Απορρήτου** — δημιουργήστε `privacy.html`
- [ ] **Όροι Χρήσης** — δημιουργήστε `terms.html`
- [ ] **GDPR Cookie Consent** — ✅ υπάρχει ήδη
- [ ] **Δικαίωμα 14ημέρου Επιστροφής** — αναφορά στο footer
- [ ] **Στοιχεία Εταιρείας** — πλήρη στο footer
- [ ] **SSL Πιστοποιητικό** — δωρεάν μέσω Let's Encrypt (Netlify/Vercel το κάνει αυτόματα)
- [ ] **myDATA Σύνδεση** — για κάθε πώληση
- [ ] **ΦΠΑ 24%** — περιλαμβάνεται στις τιμές

### Προαιρετικά αλλά συνιστώνται
- [ ] Εγγραφή στο **ΕΣΗΕΑ** (Ηλεκτρονικό Εμπόριο)
- [ ] **Skroutz** marketplace listing — skroutz.gr/partners
- [ ] **BestPrice** listing

---

## Βήμα 9: Τηλεφωνική Εξυπηρέτηση & Chat

### WhatsApp Business (ήδη ενσωματωμένο)
1. Κατεβάστε **WhatsApp Business** app
2. Δημιουργήστε επαγγελματικό προφίλ
3. Βάλτε τον αριθμό στο `config.js → store.whatsapp`

### Live Chat (δωρεάν)
Προσθέστε **Tawk.to** — δωρεάν live chat:
```html
<!-- Επικολλήστε πριν το </body> στο index.html -->
<script>
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){ var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true; s1.src='https://embed.tawk.to/YOUR_TAWK_ID/1xxxxx';
s0.parentNode.insertBefore(s1,s0); })();
</script>
```

---

## Βήμα 10: Αλλαγή Ονόματος Brand

Αν θέλετε να αλλάξετε από "LUMIÈRE" σε άλλο brand:
1. `js/config.js` → `store.name`
2. `index.html` → αναζητήστε "Lumière" και αντικαταστήστε
3. `checkout.html` → ίδιο
4. `admin.html` → ίδιο

---

## Deploy σε Netlify (Δωρεάν)

1. netlify.com → Sign up (δωρεάν)
2. New site → Deploy manually
3. Σύρτε τον φάκελο `lumiere-eshop/` στη σελίδα
4. Σε λίγα δευτερόλεπτα: `random-name.netlify.app`
5. Settings → Domain → Add custom domain → `lumiere.gr`
6. DNS: βάλτε A Record που δείχνει στο Netlify IP

---

## Τιμολόγηση Template (για πώληση)

Αυτό το template μπορεί να πωληθεί:
- **Ως template**: 150-400€
- **Με εγκατάσταση**: 500-1500€
- **Με παραμετροποίηση**: 1000-3000€
- **Πλατφόρμες πώλησης**: ThemeForest, Creative Market, Envato
