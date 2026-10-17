// ================================================
// PMSVS - Shared Application State & Utilities
// Public Market Stall Vendor System
// ================================================

// ---- Storage Keys ----
const KEYS = {
  users:      'pmsvs_users',
  session:    'pmsvs_session',
  stalls:     'pmsvs_stalls',
  vendors:    'pmsvs_vendors',
  payments:   'pmsvs_payments',
  bills:      'pmsvs_bills',
  collectors: 'pmsvs_collectors',
  utilities:  'pmsvs_utilities',
  violations: 'pmsvs_violations'
};

// ---- Default seed data ----
const SEED_USERS = [
  { id: 'U-001', name: 'Perez Visor',   email: 'perezvisor',   password: 'perez123',   role: 'supervisor', status: 'Active', createdAt: '2026-01-01' },
  { id: 'U-002', name: 'Jet Collector', email: 'jetcollector', password: 'jet123',     role: 'collector',  status: 'Active', createdAt: '2026-01-01' },
  { id: 'U-003', name: 'Gimang Vendor', email: 'gimangvendor', password: 'gimang123',  role: 'vendor',     status: 'Active', createdAt: '2026-01-01' }
];

const SEED_STALLS = [
  { id: 'STL-001', number: 'A-01', section: 'Wet Section',       dimensions: '3x3m', rate: 150, status: 'Occupied',    vendorId: 'VND-001' },
  { id: 'STL-002', number: 'A-02', section: 'Wet Section',       dimensions: '3x3m', rate: 150, status: 'Occupied',    vendorId: 'VND-002' },
  { id: 'STL-003', number: 'A-03', section: 'Wet Section',       dimensions: '3x3m', rate: 150, status: 'Occupied',    vendorId: 'VND-003' },
  { id: 'STL-004', number: 'B-01', section: 'Dry Section',       dimensions: '3x3m', rate: 120, status: 'Vacant',      vendorId: null },
  { id: 'STL-005', number: 'B-02', section: 'Dry Section',       dimensions: '3x3m', rate: 120, status: 'Occupied',    vendorId: 'VND-004' },
  { id: 'STL-006', number: 'B-03', section: 'Dry Section',       dimensions: '3x3m', rate: 120, status: 'Vacant',      vendorId: null },
  { id: 'STL-007', number: 'C-01', section: 'Cooked Food',       dimensions: '4x3m', rate: 200, status: 'Occupied',    vendorId: 'VND-005' },
  { id: 'STL-008', number: 'C-02', section: 'Cooked Food',       dimensions: '4x3m', rate: 200, status: 'Occupied',    vendorId: 'VND-006' },
  { id: 'STL-009', number: 'D-01', section: 'Vegetable Section', dimensions: '3x3m', rate: 100, status: 'Occupied',    vendorId: 'VND-001' },
  { id: 'STL-010', number: 'D-02', section: 'Vegetable Section', dimensions: '3x3m', rate: 100, status: 'Vacant',      vendorId: null },
  { id: 'STL-011', number: 'E-01', section: 'Dry Section',       dimensions: '3x3m', rate: 120, status: 'Maintenance', vendorId: null },
  { id: 'STL-012', number: 'E-02', section: 'Cooked Food',       dimensions: '4x3m', rate: 200, status: 'Vacant',      vendorId: null }
];

const SEED_VENDORS = [
  { id: 'VND-001', name: 'Genemark Reyes',    contact: '0912-111-2222', email: 'genemark@mail.com', address: 'Cebu City',      stallId: 'STL-001', status: 'Active',   userId: 'U-003', leaseStart: '2026-01-01', leaseEnd: '2026-12-31' },
  { id: 'VND-002', name: 'Uyus Bebe Cruz',    contact: '0923-222-3333', email: 'uyus@mail.com',     address: 'Minglanilla',    stallId: 'STL-002', status: 'Active',   userId: null,    leaseStart: '2026-02-01', leaseEnd: '2026-12-31' },
  { id: 'VND-003', name: 'Nikka Deleon',      contact: '0934-333-4444', email: 'nikka@mail.com',    address: 'Talisay City',   stallId: 'STL-003', status: 'Active',   userId: null,    leaseStart: '2026-01-15', leaseEnd: '2026-12-31' },
  { id: 'VND-004', name: 'Perez Enterprises', contact: '0945-444-5555', email: 'perez@mail.com',    address: 'Naga, Cebu',     stallId: 'STL-005', status: 'Active',   userId: null,    leaseStart: '2026-03-01', leaseEnd: '2026-12-31' },
  { id: 'VND-005', name: 'Haystt Kapoya',     contact: '0956-555-6666', email: 'haystt@mail.com',   address: 'Carcar City',    stallId: 'STL-007', status: 'Active',   userId: null,    leaseStart: '2026-01-01', leaseEnd: '2026-12-31' },
  { id: 'VND-006', name: 'Don Rikko Foods',   contact: '0967-666-7777', email: 'donrikko@mail.com', address: 'Minglanilla',    stallId: 'STL-008', status: 'Inactive', userId: null,    leaseStart: '2026-01-01', leaseEnd: '2026-06-30' }
];

const SEED_BILLS = [
  { id: 'BL-001', vendorId: 'VND-001', stallId: 'STL-001', period: '2026-10', dueDate: '2026-10-15', amount: 150, paid: 150, status: 'Paid',            createdAt: '2026-10-01' },
  { id: 'BL-002', vendorId: 'VND-002', stallId: 'STL-002', period: '2026-10', dueDate: '2026-10-15', amount: 150, paid: 0,   status: 'Unpaid',          createdAt: '2026-10-01' },
  { id: 'BL-003', vendorId: 'VND-003', stallId: 'STL-003', period: '2026-10', dueDate: '2026-10-15', amount: 150, paid: 100, status: 'Partially Paid',  createdAt: '2026-10-01' },
  { id: 'BL-004', vendorId: 'VND-004', stallId: 'STL-005', period: '2026-10', dueDate: '2026-10-15', amount: 120, paid: 120, status: 'Paid',            createdAt: '2026-10-01' },
  { id: 'BL-005', vendorId: 'VND-005', stallId: 'STL-007', period: '2026-10', dueDate: '2026-10-15', amount: 200, paid: 0,   status: 'Unpaid',          createdAt: '2026-10-01' },
  { id: 'BL-006', vendorId: 'VND-001', stallId: 'STL-001', period: '2026-09', dueDate: '2026-09-15', amount: 150, paid: 150, status: 'Paid',            createdAt: '2026-09-01' },
  { id: 'BL-007', vendorId: 'VND-002', stallId: 'STL-002', period: '2026-09', dueDate: '2026-09-15', amount: 150, paid: 150, status: 'Paid',            createdAt: '2026-09-01' }
];

const SEED_PAYMENTS = [
  { id: 'PAY-001', billId: 'BL-001', vendorId: 'VND-001', collectorId: 'CT-001', amount: 150, method: 'Cash', ref: 'REC-001', date: '2026-10-05', time: '7:05 AM', stall: 'A-01' },
  { id: 'PAY-002', billId: 'BL-003', vendorId: 'VND-003', collectorId: 'CT-001', amount: 100, method: 'Cash', ref: 'REC-002', date: '2026-10-05', time: '7:12 AM', stall: 'A-03' },
  { id: 'PAY-003', billId: 'BL-004', vendorId: 'VND-004', collectorId: 'CT-002', amount: 120, method: 'Cash', ref: 'REC-003', date: '2026-10-05', time: '7:20 AM', stall: 'B-02' },
  { id: 'PAY-004', billId: 'BL-006', vendorId: 'VND-001', collectorId: 'CT-001', amount: 150, method: 'Cash', ref: 'REC-004', date: '2026-09-10', time: '8:00 AM', stall: 'A-01' },
  { id: 'PAY-005', billId: 'BL-007', vendorId: 'VND-002', collectorId: 'CT-002', amount: 150, method: 'GCash', ref: 'GC-12345', date: '2026-09-11', time: '9:30 AM', stall: 'A-02' }
];

const SEED_COLLECTORS = [
  { id: 'CT-001', name: 'Roberto Garcia', position: 'Municipal Collector', contact: '0912-345-6789', status: 'Active' },
  { id: 'CT-002', name: 'Ana Reyes',      position: 'Municipal Collector', contact: '0923-456-7890', status: 'Active' }
];

const SEED_UTILITIES = [
  { id:'UTL-001', type:'Water',       vendorId:'VND-001', stallId:'STL-001', period:'2026-10', dueDate:'2026-10-20', usage:12, rate:25, amount:300,  paid:300, status:'Paid',           createdAt:'2026-10-01' },
  { id:'UTL-002', type:'Electricity', vendorId:'VND-001', stallId:'STL-001', period:'2026-10', dueDate:'2026-10-20', usage:45, rate:12, amount:540,  paid:0,   status:'Unpaid',          createdAt:'2026-10-01' },
  { id:'UTL-003', type:'Water',       vendorId:'VND-002', stallId:'STL-002', period:'2026-10', dueDate:'2026-10-20', usage:8,  rate:25, amount:200,  paid:0,   status:'Unpaid',          createdAt:'2026-10-01' },
  { id:'UTL-004', type:'Electricity', vendorId:'VND-003', stallId:'STL-003', period:'2026-10', dueDate:'2026-10-20', usage:60, rate:12, amount:720,  paid:300, status:'Partially Paid',  createdAt:'2026-10-01' },
  { id:'UTL-005', type:'Water',       vendorId:'VND-004', stallId:'STL-005', period:'2026-10', dueDate:'2026-10-20', usage:10, rate:25, amount:250,  paid:250, status:'Paid',            createdAt:'2026-10-01' },
  { id:'UTL-006', type:'Electricity', vendorId:'VND-005', stallId:'STL-007', period:'2026-10', dueDate:'2026-10-20', usage:80, rate:12, amount:960,  paid:0,   status:'Unpaid',          createdAt:'2026-10-01' }
];

const SEED_VIOLATIONS = [
  { id:'VIO-001', vendorId:'VND-002', stallId:'STL-002', type:'Unsanitary Stall',       description:'Stall found with accumulated garbage during inspection.', severity:'Minor',    fine:500,  finePaid:0,   status:'Open',         date:'2026-10-05', recordedBy:'Supervisor Perez', resolveNote:'' },
  { id:'VIO-002', vendorId:'VND-003', stallId:'STL-003', type:'Unauthorized Extension', description:'Vendor extended goods beyond assigned stall boundary.',   severity:'Moderate', fine:1000, finePaid:1000,status:'Resolved',     date:'2026-09-20', recordedBy:'Supervisor Perez', resolveNote:'Vendor removed extension and paid fine.' },
  { id:'VIO-003', vendorId:'VND-005', stallId:'STL-007', type:'Late Payment',           description:'Monthly rental not paid within the grace period.',        severity:'Minor',    fine:200,  finePaid:0,   status:'Open',         date:'2026-10-10', recordedBy:'Supervisor Perez', resolveNote:'' },
  { id:'VIO-004', vendorId:'VND-001', stallId:'STL-001', type:'Noise Violation',        description:'Vendor using amplified speakers during restricted hours.', severity:'Moderate', fine:750,  finePaid:0,   status:'Under Review', date:'2026-10-12', recordedBy:'Supervisor Perez', resolveNote:'' },
  { id:'VIO-005', vendorId:'VND-004', stallId:'STL-005', type:'Expired Permits',        description:'Business permit expired as of Oct 1, 2026.',              severity:'Major',    fine:2000, finePaid:0,   status:'Open',         date:'2026-10-15', recordedBy:'Supervisor Perez', resolveNote:'' }
];

// ================================================
// STORAGE HELPERS
// ================================================
function dbGet(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  const data = seed ? seed.map(function(r){ return Object.assign({}, r); }) : [];
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

function dbSet(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ================================================
// AUTH HELPERS
// ================================================
function getSession() {
  try { return JSON.parse(sessionStorage.getItem(KEYS.session)); } catch(e) { return null; }
}

function setSession(user) {
  sessionStorage.setItem(KEYS.session, JSON.stringify(user));
}

function clearSession() {
  sessionStorage.removeItem(KEYS.session);
}

function requireAuth(allowedRoles) {
  var session = getSession();
  if (!session) { window.location.href = 'login.html'; return null; }
  if (allowedRoles && allowedRoles.indexOf(session.role) === -1) {
    window.location.href = dashboardFor(session.role);
    return null;
  }
  return session;
}

function dashboardFor(role) {
  if (role === 'supervisor') return 'supervisor-dashboard.html';
  if (role === 'collector')  return 'collector-dashboard.html';
  if (role === 'vendor')     return 'vendor-dashboard.html';
  return 'login.html';
}

function logout() {
  clearSession();
  window.location.href = 'login.html';
}

// ================================================
// SHARED UI HELPERS
// ================================================
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function showModal(id)  { var el=document.getElementById(id); if(el) el.style.display='flex'; }
function closeModal(id) { var el=document.getElementById(id); if(el) el.style.display='none'; }

function showToast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast toast-' + (type || 'success') + ' show';
  setTimeout(function(){ t.className = t.className.replace(' show',''); }, 3200);
}

function setDate(id) {
  var el = document.getElementById(id);
  if (el) el.textContent = new Date().toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'});
}

function setUserInfo(session) {
  var el = document.getElementById('userInfo');
  if (el && session) el.textContent = session.name;
}

function nextAutoId(prefix, list, field) {
  field = field || 'id';
  if (!list.length) return prefix + '-001';
  var nums = list.map(function(r){
    var m = r[field].match(/(\d+)$/);
    return m ? parseInt(m[1],10) : 0;
  });
  return prefix + '-' + String(Math.max.apply(null,nums)+1).padStart(3,'0');
}

function setSelect(id, val) {
  var sel = document.getElementById(id);
  if (!sel) return;
  for (var i=0; i<sel.options.length; i++) {
    if (sel.options[i].value === val) { sel.selectedIndex = i; return; }
  }
}

// Close modal on backdrop click
document.addEventListener('click', function(e) {
  var modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(function(m){
    if (e.target === m) m.style.display = 'none';
  });
});

// Set date on load
document.addEventListener('DOMContentLoaded', function(){
  setDate('dateToday');
  var session = getSession();
  setUserInfo(session);
});
