// ================================================
// COLLECTOR MANAGEMENT - JavaScript
// Public Market Stall Vendor System
// ================================================

// --- Default seed data (used only when localStorage is empty) ---
const DEFAULT_COLLECTORS = [
  { id: 'CT-001', name: 'Roberto Garcia', position: 'Municipal Collector', contact: '0912-345-6789', status: 'Active' },
  { id: 'CT-002', name: 'Ana Reyes',      position: 'Municipal Collector', contact: '0923-456-7890', status: 'Active' }
];

const STORAGE_KEY = 'pmsvs_collectors';

// --- Persistence helpers ---
function loadCollectors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore parse errors */ }
  // Return a fresh copy of the defaults
  return DEFAULT_COLLECTORS.map(function(c) { return Object.assign({}, c); });
}

function saveCollectors() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collectors));
}

// In-memory array — single source of truth while the page is open
let collectors = loadCollectors();

// Tracks which collector is currently being edited
let currentEditId = null;

// Tracks which collector is pending deletion
let pendingDeleteId = null;

// ================================================
// RENDER TABLE
// ================================================
function renderTable(list) {
  const tbody = document.getElementById('collectorTableBody');
  tbody.innerHTML = '';

  list.forEach(function(c) {
    const tr = document.createElement('tr');
    tr.dataset.id = c.id;
    tr.innerHTML =
      '<td>' + escHtml(c.id) + '</td>' +
      '<td>' + escHtml(c.name) + '</td>' +
      '<td>' + escHtml(c.position) + '</td>' +
      '<td>' + escHtml(c.contact) + '</td>' +
      '<td><span class="badge badge-' + c.status.toLowerCase() + '">' + escHtml(c.status) + '</span></td>' +
      '<td class="action-cell">' +
        '<button class="btn-view"   onclick="viewCollector(\''   + escHtml(c.id) + '\')">View</button>'   +
        '<button class="btn-edit"   onclick="editCollector(\''   + escHtml(c.id) + '\')">Edit</button>'   +
        '<button class="btn-delete" onclick="deleteCollector(\'' + escHtml(c.id) + '\')">Delete</button>' +
      '</td>';
    tbody.appendChild(tr);
  });

  updateCount(list.length);
}

function updateCount(n) {
  const el = document.getElementById('collectorCount');
  if (el) el.textContent = 'Showing ' + n + ' record' + (n !== 1 ? 's' : '');
}

// ================================================
// SEARCH / FILTER
// ================================================
function filterCollector() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const filtered = collectors.filter(function(c) {
    return (c.id + ' ' + c.name + ' ' + c.position + ' ' + c.contact + ' ' + c.status)
      .toLowerCase()
      .includes(q);
  });
  renderTable(filtered);
}

// ================================================
// MODAL HELPERS
// ================================================
function showModal(id)  { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// Close modal when clicking outside (on the dark backdrop)
document.addEventListener('click', function(e) {
  ['viewModal', 'editModal', 'addModal', 'confirmModal'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el && e.target === el) closeModal(id);
  });
});

// ================================================
// VIEW COLLECTOR
// ================================================
function viewCollector(id) {
  const c = collectors.find(function(x) { return x.id === id; });
  if (!c) return;

  document.getElementById('viewModalBody').innerHTML =
    detailRow('Collector ID', c.id) +
    detailRow('Full Name',    c.name) +
    detailRow('Position',     c.position) +
    detailRow('Contact',      c.contact) +
    detailRowBadge('Status',  c.status);

  showModal('viewModal');
}

function detailRow(label, val) {
  return '<div class="staff-detail-row">' +
    '<span class="staff-detail-label">' + escHtml(label) + '</span>' +
    '<span class="staff-detail-value">'  + escHtml(val)   + '</span>' +
  '</div>';
}

function detailRowBadge(label, val) {
  return '<div class="staff-detail-row">' +
    '<span class="staff-detail-label">' + escHtml(label) + '</span>' +
    '<span class="staff-detail-value">' +
      '<span class="badge badge-' + val.toLowerCase() + '">' + escHtml(val) + '</span>' +
    '</span>' +
  '</div>';
}

// ================================================
// EDIT COLLECTOR
// ================================================
function editCollector(id) {
  const c = collectors.find(function(x) { return x.id === id; });
  if (!c) return;

  currentEditId = id;
  document.getElementById('editId').value      = c.id;
  document.getElementById('editName').value    = c.name;
  document.getElementById('editContact').value = c.contact;
  setSelect('editPosition', c.position);
  setSelect('editStatus',   c.status);
  document.getElementById('editError').textContent = '';

  showModal('editModal');
}

function saveEdit() {
  const name    = document.getElementById('editName').value.trim();
  const contact = document.getElementById('editContact').value.trim();
  const errEl   = document.getElementById('editError');

  if (!name) {
    errEl.textContent = 'Full Name is required.';
    return;
  }
  if (!contact) {
    errEl.textContent = 'Contact Number is required.';
    return;
  }

  const c = collectors.find(function(x) { return x.id === currentEditId; });
  if (!c) return;

  c.name     = name;
  c.position = document.getElementById('editPosition').value;
  c.contact  = contact;
  c.status   = document.getElementById('editStatus').value;

  saveCollectors();
  renderTable(collectors);
  closeModal('editModal');
  showToast('Collector updated successfully.', 'success');
  currentEditId = null;
}

// ================================================
// ADD COLLECTOR
// ================================================
function showAddModal() {
  document.getElementById('addId').value                = nextId();
  document.getElementById('addName').value              = '';
  document.getElementById('addContact').value           = '';
  document.getElementById('addPosition').selectedIndex  = 0;
  document.getElementById('addStatus').selectedIndex    = 0;
  document.getElementById('addError').textContent       = '';
  showModal('addModal');
}

function saveCollector() {
  const newId      = document.getElementById('addId').value.trim();
  const newName    = document.getElementById('addName').value.trim();
  const newPos     = document.getElementById('addPosition').value;
  const newContact = document.getElementById('addContact').value.trim();
  const newStatus  = document.getElementById('addStatus').value;
  const errEl      = document.getElementById('addError');

  // Validation
  if (!newId) {
    errEl.textContent = 'Collector ID is required.';
    return;
  }
  if (!newName) {
    errEl.textContent = 'Full Name is required.';
    return;
  }
  if (!newContact) {
    errEl.textContent = 'Contact Number is required.';
    return;
  }
  if (collectors.find(function(c) { return c.id === newId; })) {
    errEl.textContent = 'Collector ID "' + newId + '" already exists. Use a different ID.';
    return;
  }

  collectors.push({
    id:       newId,
    name:     newName,
    position: newPos,
    contact:  newContact,
    status:   newStatus
  });

  saveCollectors();
  renderTable(collectors);
  closeModal('addModal');
  showToast('Collector "' + newName + '" added successfully.', 'success');
}

// ================================================
// DELETE COLLECTOR
// ================================================
function deleteCollector(id) {
  pendingDeleteId = id;
  const c = collectors.find(function(x) { return x.id === id; });
  const label = c ? '"' + c.name + '" (' + c.id + ')' : id;
  document.getElementById('confirmMsg').textContent =
    'Are you sure you want to delete collector ' + label + '? This action cannot be undone.';
  showModal('confirmModal');
}

function confirmDelete() {
  collectors = collectors.filter(function(c) { return c.id !== pendingDeleteId; });
  saveCollectors();
  renderTable(collectors);
  closeModal('confirmModal');
  showToast('Collector deleted.', 'error');
  pendingDeleteId = null;
}

// ================================================
// UTILITIES
// ================================================

/** Auto-generate the next CT-XXX ID based on existing records */
function nextId() {
  if (!collectors.length) return 'CT-001';
  const nums = collectors.map(function(c) {
    const m = c.id.match(/(\d+)$/);
    return m ? parseInt(m[1], 10) : 0;
  });
  const next = Math.max.apply(null, nums) + 1;
  return 'CT-' + String(next).padStart(3, '0');
}

/** Set a <select> element to the option matching val */
function setSelect(selectId, val) {
  const sel = document.getElementById(selectId);
  for (let i = 0; i < sel.options.length; i++) {
    if (sel.options[i].value === val) {
      sel.selectedIndex = i;
      return;
    }
  }
}

/** Escape HTML special characters to prevent XSS */
function escHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

// ================================================
// TOAST NOTIFICATIONS
// ================================================
function showToast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast toast-' + (type || 'success') + ' show';
  setTimeout(function() {
    t.className = t.className.replace(' show', '');
  }, 3000);
}

// ================================================
// INIT — runs when the DOM is ready
// ================================================
document.addEventListener('DOMContentLoaded', function() {
  // Render the table from localStorage (or defaults)
  renderTable(collectors);

  // Set today's date in the topbar
  const dateEl = document.getElementById('dateToday');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-PH', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
});
