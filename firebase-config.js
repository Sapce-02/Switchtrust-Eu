// ============================================
// SwiftTrust EU — shared Firebase config
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyAMucqvSoBlUo5jn5Pu4ClQIGRlInu55mQ",
  authDomain: "project-app-259f2.firebaseapp.com",
  projectId: "project-app-259f2",
  storageBucket: "project-app-259f2.firebasestorage.app",
  messagingSenderId: "389607996830",
  appId: "1:389607996830:web:a9e456c60e4608f1a9ea8f"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// SwiftTrust EU admin
const STB_ADMIN_EMAIL = 'enjoygfd42@gmail.com';

// ---------------------------------------------
// Helpers shared by all pages
// ---------------------------------------------

// Money formatter — Spanish/European format: 1234.5 -> "1.234,50 €"
function stbMoney(n) {
  return Number(n || 0).toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Date formatter — English text, European format: "15 Oct 2026, 14:32"
function stbDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// 12-digit account number (demo-friendly for EU)
function stbGenAccountNumber() {
  let s = '';
  for (let i = 0; i < 12; i++) s += Math.floor(Math.random() * 10);
  return s;
}

// 9-digit routing number for display purposes
function stbGenRoutingNumber() {
  let s = '';
  for (let i = 0; i < 9; i++) s += Math.floor(Math.random() * 10);
  return s;
}

// Transfer reference like STBEU-20261015-4821
function stbGenReference() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const r = Math.floor(1000 + Math.random() * 9000);
  return `STBEU-${y}${m}${day}-${r}`;
}

// Simple PIN hash (demo only — NOT production-grade)
function stbHashPin(pin) {
  return btoa('stbph$' + pin + '$2026');
}

// Toast notifications
function stbToast(msg, type) {
  let el = document.getElementById('stb-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'stb-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'stb-toast show' + (type ? ' ' + type : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.className = 'stb-toast'; }, 2800);
}

// Redirect to login if not signed in
function stbRequireAuth() {
  return new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (!user) {
        window.location.href = 'login.html';
      } else {
        resolve(user);
      }
    });
  });
}
