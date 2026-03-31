# SPEC.md: Edmonton Shelter Network Connect (ESN Connect)

**Project:** Website prototype for RSCH3000 Applied Research (Week 10-11)
**Student:** Daniel Mantai
**Date:** March 30, 2026
**Hosted:** GitHub Pages (static, no backend required)

---

## Project Overview

**ESN Connect** is a prototype for a digital service coordination platform tied to the Edmonton Shelter Network (ESN) ID card system. The prototype demonstrates what a functional shelter worker portal would look like if the ESN ID card were adopted at scale.

**Who it is for:** Shelter staff and frontline social service workers. This is a worker-facing tool. Unhoused people do not interact with this system directly. Workers use it to create client records, look up existing files, and coordinate referrals across participating organizations.

**What problem it solves:** When someone experiencing homelessness arrives at a shelter without government-issued ID, workers cannot open a file, make referrals, or document service delivery in a way that satisfies government funding requirements. The ESN card breaks this cycle by creating a shelter-issued ID backed by a shared digital record. Workers at any participating organization can look up a client's history, add to their record, and make referrals, without requiring the client to re-prove their identity each time.

---

## The Funding Problem

This is the critical context that must be prominent on the site.

The real barrier is NOT that shelters refuse to cooperate or that workers don't want to help. The barrier is structural: **government funding requires documented proof of service delivery tied to ID verification.** Shelters can only receive funding for people they can demonstrably prove they helped, and that proof requires a verifiable identity.

Without ID:
- The person cannot be entered into a funding-reportable case file.
- Services provided are "off the books" for funding purposes.
- The organization absorbs the cost with no reimbursement.
- Referrals to other funded organizations cannot be officially logged.

This traps unhoused people without ID entirely outside the formal service system. Shelters and frontline workers want to help everyone. Their hands are tied by funding accountability requirements that assume everyone has government-issued ID.

**Daniel's position:** The funding model needs to change to allow shelter staff to vouch for unhoused people to access services even without government-issued ID. The ESN card is one mechanism for this: a network-issued credential that serves as proof of identity and service engagement within the shelter system. For this to work at scale, provincial funders and Service Alberta would need to accept the ESN record as a valid basis for funding claims.

---

## Proposed Name and Branding

**Name:** ESN Connect
**Full name:** Edmonton Shelter Network Connect
**Tagline:** Coordinating services. Preserving dignity.

**Color scheme (civic services portal):**
- Primary blue: `#1a4f8a` (deep government/civic blue)
- Accent amber: `#e8a020` (warm, welcoming, City of Edmonton gold)
- Background: `#f5f7fa` (light cool grey)
- Card white: `#ffffff`
- Body text: `#2c3e50`
- Muted text: `#6c7a8d`
- Border: `#d1d9e6`
- Success green: `#27ae60`
- Alert red: `#e74c3c`

**Typography:** System font stack (no CDN). Professional, fast-loading.

**Design language:** Clean cards, subtle shadows, left-aligned nav, top navigation bar with logo left and links right. Government portal feel without being cold.

---

## Pages

### 1. `index.html` - Login / Landing

Explains what the system is and who it is for. Includes a login form (username + password). Any non-empty credentials are accepted. On success, sets a sessionStorage flag and redirects to `new-client.html`.

Content on the page (visible before login):
- Site name and tagline
- One-paragraph plain-language description of what ESN Connect is
- Brief explanation of who can access the system (registered shelter staff only)
- Login form

### 2. `new-client.html` - New Client

Form to create a new client record. On submit, generates a styled ID card display below the form.

Fields:
- Full Name (required)
- Date of Birth (required)
- Photo (file upload, required; previews on page)
- Issuing Shelter (dropdown: Hope Mission, Boyle Street, Bissell Centre, Mustard Seed, WIN House, Other)
- Notes (textarea, optional)

On submit:
- Validates that name, DOB, and photo are filled in
- Generates a unique ESN ID number (format: ESN-2026-XXXX, randomly generated for demo)
- Displays a styled ID card: photo, name, DOB, ID number, issue date, issuing shelter
- Shows a "Record Created" confirmation message
- ID card has a QR code placeholder (decorative SVG, not linked)
- "Print Card" button (opens browser print dialog focused on the card element)

### 3. `lookup.html` - Client Lookup

Search the static demo database. Finds clients by name (partial match, case-insensitive).

Displays:
- Search bar at top
- On result: client card with photo, name, ID number, issue date, issuing shelter
- Expandable "Service History" table
- Expandable "Notes" section
- "Add Referral" (non-functional placeholder button)
- "No results" message if nothing matches

### 4. `agencies.html` - Edmonton Agency Directory

Real Edmonton organizations and agencies that support unhoused people. Each agency card shows:
- Organization name
- Category tags (e.g., Shelter, Food, Health, Housing, Employment, ID Services)
- Brief description (2-3 sentences)
- Website link
- "Add Referral" button (non-functional placeholder)

Target: 8-12 real agencies.

### 5. `funding.html` - The Funding Problem

A standalone explainer page. Breaks the fourth wall explicitly: this is a prototype, here is the gap between this and something real.

Sections:
1. What is the funding problem?
2. How the current system works (and fails)
3. What would need to change (policy, organizational, technical)
4. Daniel's position: shelters should be able to vouch for people without government ID
5. What this prototype demonstrates
6. What this prototype does NOT do (honestly scoped)
7. What would need to happen next for this to become real

---

## File Structure

```
edmonton-services-prototype/
├── SPEC.md
├── index.html           (login/landing)
├── new-client.html      (new client form + ID card generator)
├── lookup.html          (client search)
├── agencies.html        (agency directory)
├── funding.html         (funding problem explainer)
├── style.css            (shared stylesheet)
├── app.js               (shared JS: auth guard, nav, utilities)
└── data/
    └── clients.json     (static demo database, 4 sample clients)
```

---

## MVP vs Nice-to-Have

### MVP (this build)

- [x] Working navigation across all 5 pages
- [x] Fake login (validates non-empty, sets sessionStorage, redirects)
- [x] Auth guard on all non-login pages (redirects to index.html if not logged in)
- [x] Static JSON demo database (4 sample clients)
- [x] Client search (partial name match, case-insensitive, against static JSON)
- [x] New client form with photo upload and preview
- [x] ID card display (photo, name, DOB, ID number, issue date, issuing shelter)
- [x] Agency directory (8-12 real Edmonton agencies)
- [x] Funding problem explainer page
- [x] Consistent branding and stylesheet across all pages
- [x] No broken images (placehold.co for demo client photos)
- [x] Print-ready basic layout

### Nice-to-Have (not in this build)

- [ ] Downloadable/printable ID card as PNG (canvas-rendered)
- [ ] QR code on ID card (functional, links to client record)
- [ ] Service referral checklist on client profile
- [ ] "Add to service history" form on the lookup profile view
- [ ] Print-friendly card layout (separate print CSS)
- [ ] Mobile-responsive layout (currently desktop-first)
- [ ] Logo/icon (SVG shield or network icon)
- [ ] Keyboard accessibility improvements

---

## Technical Notes

- Pure HTML/CSS/JS. No frameworks. No build tools.
- CDN libraries: none used in MVP. Nice-to-have QR code would use qrcodejs via CDN.
- Runs on GitHub Pages with no backend.
- Auth is sessionStorage only (demo purposes). Not secure. Not intended to be.
- Photo upload is client-side only. Photos are not transmitted or stored anywhere.
- All data is hardcoded in `clients.json` and `app.js`. No persistence between sessions for new clients (demo limitation).

---

## Demo Data

Four sample clients in `data/clients.json`:

| ESN ID | Name | Issuing Shelter |
|---|---|---|
| ESN-2026-0001 | Jane Doe | Hope Mission Edmonton |
| ESN-2026-0002 | Michael Torres | Boyle Street Community Services |
| ESN-2026-0003 | Sarah Nguyen | WIN House Edmonton |
| ESN-2026-0004 | David Okafor | Mustard Seed Edmonton |

Photos: `https://placehold.co/150x150?text=JD` (initials) format. Replace with real photos before live demo.

---

## How to Preview

Open `index.html` in any browser. No server needed for basic functionality. For file: protocol limitations with JSON fetch (client lookup), use a local server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

**Login credentials:** Any non-empty username and password. Try `admin` / `demo`.
