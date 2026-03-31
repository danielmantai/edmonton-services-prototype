/* =============================================================
   ESN Connect — Shared Application Logic
   ============================================================= */

"use strict";

/* ---- Auth ------------------------------------------------- */

const AUTH_KEY = "esn_logged_in";
const LOGIN_PAGE = "index.html";

function isLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = LOGIN_PAGE;
  }
}

function login(username, password) {
  if (username.trim() && password.trim()) {
    sessionStorage.setItem(AUTH_KEY, "true");
    sessionStorage.setItem("esn_user", username.trim());
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem("esn_user");
  window.location.href = LOGIN_PAGE;
}

function getUsername() {
  return sessionStorage.getItem("esn_user") || "Worker";
}

/* ---- Navigation ------------------------------------------- */

function highlightActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === page) {
      link.classList.add("active");
    }
  });
}

/* ---- Demo Client Data ------------------------------------- */

let DEMO_CLIENTS = null;

async function loadClients() {
  if (DEMO_CLIENTS !== null) return DEMO_CLIENTS;
  try {
    const res = await fetch("data/clients.json");
    DEMO_CLIENTS = await res.json();
  } catch (e) {
    // Fallback for file:// protocol — inline data
    DEMO_CLIENTS = getInlineClients();
  }
  return DEMO_CLIENTS;
}

/* Inline fallback so the site works without a local server */
function getInlineClients() {
  return [
    {
      id: "ESN-2026-0001",
      name: "Jane Doe",
      dob: "1988-03-15",
      photo: "https://placehold.co/150x150/2b6cb0/ffffff?text=JD",
      issued: "2026-01-12",
      issuedAt: "Hope Mission Edmonton",
      notes: "First contact at Hope Mission. Lost ID during encampment clearance. Referred to Bissell Centre for employment support.",
      services: [
        { date: "2026-01-12", org: "Hope Mission Edmonton", service: "Emergency Shelter", notes: "Initial intake. No government ID. ESN card issued." },
        { date: "2026-01-19", org: "Boyle Street Community Services", service: "Mental Health Counselling", notes: "Referred by Hope Mission. First session completed." },
        { date: "2026-01-26", org: "Bissell Centre", service: "Employment Counselling", notes: "Resume workshop attended." },
        { date: "2026-02-03", org: "Mustard Seed Edmonton", service: "Food Bank", notes: "Weekly access registered." },
        { date: "2026-02-18", org: "Homeward Trust Edmonton", service: "Housing Assessment", notes: "Application submitted." }
      ]
    },
    {
      id: "ESN-2026-0002",
      name: "Michael Torres",
      dob: "1974-07-22",
      photo: "https://placehold.co/150x150/123a6d/ffffff?text=MT",
      issued: "2026-01-20",
      issuedAt: "Boyle Street Community Services",
      notes: "Ongoing addiction recovery support. Previous stay at Hope Mission. Interested in Housing First program.",
      services: [
        { date: "2026-01-20", org: "Boyle Street Community Services", service: "Drop-In and Outreach", notes: "Initial intake. ESN card issued." },
        { date: "2026-01-28", org: "Hope Mission Edmonton", service: "Recovery Program", notes: "Enrolled in Bridge Recovery Program." },
        { date: "2026-02-10", org: "Homeward Trust Edmonton", service: "Housing First Assessment", notes: "Added to Housing First waitlist." },
        { date: "2026-02-24", org: "Jasper Place Wellness Centre", service: "Primary Health Care", notes: "Physical exam completed." }
      ]
    },
    {
      id: "ESN-2026-0003",
      name: "Sarah Nguyen",
      dob: "1995-11-08",
      photo: "https://placehold.co/150x150/4a1d8a/ffffff?text=SN",
      issued: "2026-02-01",
      issuedAt: "WIN House Edmonton",
      notes: "Fled domestic violence. Two young children (ages 3 and 6). Priority for family housing.",
      services: [
        { date: "2026-02-01", org: "WIN House Edmonton", service: "Emergency Shelter", notes: "Intake with two children. ESN card issued." },
        { date: "2026-02-08", org: "Catholic Social Services Edmonton", service: "Family Counselling", notes: "First session completed." },
        { date: "2026-02-22", org: "Homeward Trust Edmonton", service: "Family Housing Assessment", notes: "Priority family flag. On waitlist." }
      ]
    },
    {
      id: "ESN-2026-0004",
      name: "David Okafor",
      dob: "1982-05-30",
      photo: "https://placehold.co/150x150/065f46/ffffff?text=DO",
      issued: "2026-02-14",
      issuedAt: "Mustard Seed Edmonton",
      notes: "Recently released from correctional facility. Strong motivation for employment. Working with John Howard Society.",
      services: [
        { date: "2026-02-14", org: "Mustard Seed Edmonton", service: "Emergency Shelter", notes: "Initial intake. ESN card issued." },
        { date: "2026-02-19", org: "Edmonton John Howard Society", service: "Reintegration Support", notes: "Case worker assigned." },
        { date: "2026-02-26", org: "Bissell Centre", service: "Employment Services", notes: "Vocational assessment completed." },
        { date: "2026-03-05", org: "Jasper Place Wellness Centre", service: "Primary Health Care", notes: "First appointment." }
      ]
    }
  ];
}

/* ---- Search ---------------------------------------------- */

function searchClients(clients, query) {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  return clients.filter(c => c.name.toLowerCase().includes(q));
}

/* ---- ID Generation --------------------------------------- */

function generateESNId() {
  const num = String(Math.floor(1000 + Math.random() * 9000));
  return `ESN-2026-${num}`;
}

/* ---- Date Formatting ------------------------------------- */

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m,10)-1]} ${parseInt(d,10)}, ${y}`;
}

/* ---- ID Card HTML ---------------------------------------- */

function buildIDCardHTML({ name, dob, photoSrc, esnId, issued, issuedAt }) {
  return `
    <div class="id-card" id="id-card-el">
      <div class="id-card-header">
        <span class="org-name">Edmonton Shelter Network</span>
        <span class="esn-badge">ESN</span>
      </div>
      <div class="id-card-body">
        <img class="id-card-photo" src="${photoSrc}" alt="Client photo">
        <div class="id-card-fields">
          <div class="id-card-name">${escapeHtml(name)}</div>
          <div class="id-card-field"><strong>DOB:</strong> ${formatDate(dob)}</div>
          <div class="id-card-field"><strong>Issued:</strong> ${formatDate(issued)}</div>
          <div class="id-card-field"><strong>Issued at:</strong> ${escapeHtml(issuedAt)}</div>
        </div>
      </div>
      <div class="id-card-footer">
        <span class="id-card-id">${escapeHtml(esnId)}</span>
        <div class="id-card-qr" title="QR code (decorative)">
          ${qrSVG()}
        </div>
      </div>
    </div>
  `;
}

/* ---- Client Profile HTML --------------------------------- */

function buildClientProfileHTML(client) {
  const serviceRows = client.services.map(s => `
    <tr>
      <td>${formatDate(s.date)}</td>
      <td>${escapeHtml(s.org)}</td>
      <td>${escapeHtml(s.service)}</td>
      <td class="text-muted">${escapeHtml(s.notes)}</td>
    </tr>
  `).join("");

  return `
    <div class="card">
      <div class="client-profile">
        <img class="client-profile-photo" src="${client.photo}" alt="Photo of ${escapeHtml(client.name)}">
        <div class="client-profile-info">
          <div class="client-profile-name">${escapeHtml(client.name)}</div>
          <div class="client-profile-meta">
            <span><strong>ESN ID:</strong> ${escapeHtml(client.id)}</span>
            <span><strong>DOB:</strong> ${formatDate(client.dob)}</span>
            <span><strong>Issued:</strong> ${formatDate(client.issued)}</span>
            <span><strong>Issuing Shelter:</strong> ${escapeHtml(client.issuedAt)}</span>
          </div>
          ${client.notes ? `<p class="text-muted" style="font-size:0.875rem;">${escapeHtml(client.notes)}</p>` : ""}
          <div class="mt-2 d-flex gap-1">
            <button class="btn btn-ghost btn-sm" disabled title="Not implemented in demo">Add Note</button>
            <button class="btn btn-ghost btn-sm" disabled title="Not implemented in demo">Add Referral</button>
            <button class="btn btn-outline btn-sm" onclick="window.print()">Print Record</button>
          </div>
        </div>
      </div>
    </div>
    <div class="section-label">Service History</div>
    <div class="card" style="padding:0; overflow:hidden;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Organization</th>
            <th>Service</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>${serviceRows}</tbody>
      </table>
    </div>
  `;
}

/* ---- Decorative QR SVG ----------------------------------- */

function qrSVG() {
  return `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="display:block;">
    <rect width="40" height="40" fill="white"/>
    <!-- top-left finder -->
    <rect x="2" y="2" width="11" height="11" fill="none" stroke="#333" stroke-width="1.5"/>
    <rect x="4" y="4" width="7" height="7" fill="#333"/>
    <!-- top-right finder -->
    <rect x="27" y="2" width="11" height="11" fill="none" stroke="#333" stroke-width="1.5"/>
    <rect x="29" y="4" width="7" height="7" fill="#333"/>
    <!-- bottom-left finder -->
    <rect x="2" y="27" width="11" height="11" fill="none" stroke="#333" stroke-width="1.5"/>
    <rect x="4" y="29" width="7" height="7" fill="#333"/>
    <!-- data dots -->
    <rect x="16" y="2" width="2" height="2" fill="#333"/>
    <rect x="19" y="2" width="2" height="2" fill="#333"/>
    <rect x="22" y="4" width="2" height="2" fill="#333"/>
    <rect x="16" y="6" width="2" height="2" fill="#333"/>
    <rect x="19" y="8" width="2" height="2" fill="#333"/>
    <rect x="22" y="10" width="2" height="2" fill="#333"/>
    <rect x="16" y="14" width="2" height="2" fill="#333"/>
    <rect x="18" y="16" width="4" height="2" fill="#333"/>
    <rect x="14" y="18" width="2" height="2" fill="#333"/>
    <rect x="22" y="18" width="4" height="2" fill="#333"/>
    <rect x="14" y="22" width="4" height="2" fill="#333"/>
    <rect x="20" y="22" width="2" height="2" fill="#333"/>
    <rect x="24" y="22" width="2" height="2" fill="#333"/>
    <rect x="14" y="26" width="2" height="4" fill="#333"/>
    <rect x="18" y="26" width="2" height="2" fill="#333"/>
    <rect x="22" y="26" width="4" height="2" fill="#333"/>
    <rect x="18" y="30" width="4" height="2" fill="#333"/>
    <rect x="24" y="30" width="2" height="2" fill="#333"/>
    <rect x="18" y="34" width="2" height="4" fill="#333"/>
    <rect x="22" y="36" width="4" height="2" fill="#333"/>
  </svg>`;
}

/* ---- Utility --------------------------------------------- */

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function today() {
  return new Date().toISOString().split("T")[0];
}

/* ---- Nav HTML -------------------------------------------- */

function buildNav(activePage) {
  const user = getUsername();
  const pages = [
    { href: "new-client.html",  label: "New Client" },
    { href: "lookup.html",      label: "Client Lookup" },
    { href: "agencies.html",    label: "Agencies" },
    { href: "funding.html",     label: "Funding Problem" },
  ];

  const links = pages.map(p => {
    const isActive = activePage === p.href ? " active" : "";
    return `<li><a href="${p.href}" class="${isActive.trim()}">${p.label}</a></li>`;
  }).join("");

  return `
    <nav class="site-nav">
      <a href="new-client.html" class="nav-brand">
        ESN<span class="brand-accent">Connect</span>
        <span class="brand-badge">Demo</span>
      </a>
      <ul class="nav-links">
        ${links}
        <li class="nav-logout"><a href="#" onclick="logout(); return false;">Sign Out (${escapeHtml(user)})</a></li>
      </ul>
    </nav>
  `;
}

function injectNav(activePage) {
  const placeholder = document.getElementById("nav-placeholder");
  if (placeholder) {
    placeholder.outerHTML = buildNav(activePage);
  }
}
