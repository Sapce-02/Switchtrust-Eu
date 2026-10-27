// ============================================
// SwiftTrust EU — shared Firebase config
// New Firebase project (fedex-87c97)
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyAC8NACjLLTIkm3dvJSibvYks1xL9Oh1UM",
  authDomain: "fedex-87c97.firebaseapp.com",
  projectId: "fedex-87c97",
  storageBucket: "fedex-87c97.firebasestorage.app",
  messagingSenderId: "24830041797",
  appId: "1:24830041797:web:a6f4f1047d657c345fdaac",
  measurementId: "G-H2F9P45C8H"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// SwiftTrust EU admin
const STB_ADMIN_EMAIL = 'greatj656@gmail.com'; 

// ---------------------------------------------
// Helpers shared by all pages
// ---------------------------------------------

function stbMoney(n) {
  return Number(n || 0).toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function stbDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function stbGenAccountNumber() {
  let s = '';
  for (let i = 0; i < 12; i++) s += Math.floor(Math.random() * 10);
  return s;
}

function stbGenRoutingNumber() {
  let s = '';
  for (let i = 0; i < 9; i++) s += Math.floor(Math.random() * 10);
  return s;
}

function stbGenReference() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const r = Math.floor(1000 + Math.random() * 9000);
  return `STBEU-${y}${m}${day}-${r}`;
}

function stbHashPin(pin) {
  return btoa('stbeu$' + pin + '$2026'); 
}

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