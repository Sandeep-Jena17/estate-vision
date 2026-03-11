/**
 * Global styles for EstateVision application
 * Design system with CSS variables and responsive utilities
 */

export const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --cream:    #faf8f4;
  --white:    #ffffff;
  --slate:    #1a1f2e;
  --slate2:   #2d3348;
  --gold:     #b8860b;
  --gold2:    #d4a017;
  --gold-lt:  #f5e6c0;
  --muted:    #6b7280;
  --border:   #e8e0d4;
  --border2:  #d4c9b8;
  --green:    #059669;
  --red:      #dc2626;
  --blue:     #2563eb;
  --shadow-sm: 0 1px 3px rgba(0,0,0,.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,.1);
  --shadow-lg: 0 12px 40px rgba(0,0,0,.14);
  --shadow-xl: 0 24px 60px rgba(0,0,0,.18);
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Outfit', system-ui, sans-serif;
  --transition: 0.22s cubic-bezier(0.4,0,0.2,1);
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background: var(--cream);
  color: var(--slate);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  display: block;
}

button {
  font-family: var(--font-body);
  cursor: pointer;
}

input, select, textarea {
  font-family: var(--font-body);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--cream);
}

::-webkit-scrollbar-thumb {
  background: var(--border2);
  border-radius: 3px;
}

/* Typography */
.t-display { font-family: var(--font-display); }
.t-xs   { font-size: 11px; }
.t-sm   { font-size: 13px; }
.t-base { font-size: 15px; }
.t-lg   { font-size: 18px; }
.t-xl   { font-size: 22px; }
.t-2xl  { font-size: 28px; }
.t-3xl  { font-size: 36px; }
.t-4xl  { font-size: 48px; }
.t-muted { color: var(--muted); }
.t-gold  { color: var(--gold); }
.t-white { color: white; }
.t-slate { color: var(--slate); }
.fw-3 { font-weight: 300; }
.fw-4 { font-weight: 400; }
.fw-5 { font-weight: 500; }
.fw-6 { font-weight: 600; }
.fw-7 { font-weight: 700; }
.ls-wide { letter-spacing: 0.08em; }
.ls-wider { letter-spacing: 0.12em; }
.uppercase { text-transform: uppercase; }

/* Layout */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.container-sm {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}

.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-4  { gap: 4px; }
.gap-8  { gap: 8px; }
.gap-12 { gap: 12px; }
.gap-16 { gap: 16px; }
.gap-24 { gap: 24px; }
.gap-32 { gap: 32px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 14px;
  transition: all var(--transition);
  white-space: nowrap;
  padding: 10px 20px;
}

.btn-primary { background: var(--slate); color: white; }
.btn-primary:hover { background: var(--slate2); box-shadow: var(--shadow-md); transform: translateY(-1px); }

.btn-gold { background: var(--gold); color: white; }
.btn-gold:hover { background: var(--gold2); box-shadow: 0 4px 20px rgba(184,134,11,.35); transform: translateY(-1px); }

.btn-outline { background: white; color: var(--slate); border: 1.5px solid var(--border2); }
.btn-outline:hover { border-color: var(--slate); background: var(--slate); color: white; }

.btn-ghost { background: transparent; color: var(--slate); }
.btn-ghost:hover { background: var(--border); }

.btn-sm { padding: 7px 14px; font-size: 12px; }
.btn-lg { padding: 14px 28px; font-size: 15px; border-radius: var(--radius-md); }
.btn-xl { padding: 16px 36px; font-size: 16px; border-radius: var(--radius-md); }
.btn-full { width: 100%; }
.btn-icon { padding: 9px; border-radius: 50%; }
.btn:disabled { opacity: .5; cursor: not-allowed; transform: none !important; }

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .03em;
}

.badge-premium { background: linear-gradient(135deg,#b8860b,#d4a017); color: white; }
.badge-new     { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
.badge-hot     { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.badge-verified{ background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }
.badge-sold    { background: #f3f4f6; color: var(--muted); }
.badge-rera    { background: var(--gold-lt); color: var(--gold); border: 1px solid #e8c97a; }

/* Cards */
.card { background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--border); overflow: hidden; }
.card:hover { box-shadow: var(--shadow-lg); }
.panel { background: white; border-radius: var(--radius-md); border: 1px solid var(--border); padding: 24px; }

/* Forms */
.field { display: flex; flex-direction: column; gap: 6px; }
.label { font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }

.input {
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: white;
  color: var(--slate);
  font-size: 14px;
  outline: none;
  transition: border-color var(--transition);
}

.input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(184,134,11,.1); }

.textarea {
  padding: 12px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: white;
  color: var(--slate);
  font-size: 14px;
  outline: none;
  resize: vertical;
  transition: border-color var(--transition);
}

.textarea:focus { border-color: var(--gold); }

.select {
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: white;
  color: var(--slate);
  font-size: 14px;
  outline: none;
  appearance: none;
}

.select:focus { border-color: var(--gold); }

/* Page Layout */
main {
  margin-top: 68px;
  flex: 1;
}

/* Animations */
@keyframes fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(16px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
@keyframes pinBounce { 0%,100%{transform:rotate(-45deg) translateY(0)} 50%{transform:rotate(-45deg) translateY(-6px)} }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

.skeleton { background: linear-gradient(90deg, var(--border) 25%, var(--cream) 50%, var(--border) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 4px; }

/* Navigation */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(255,255,255,.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--slate);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 0;
}

.nav-logo .dot {
  width: 8px; height: 8px;
  background: var(--gold);
  border-radius: 50%;
  flex-shrink: 0;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  background: none;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all var(--transition);
  cursor: pointer;
  margin: 0 4px;
}

.nav-link:hover { color: var(--slate); background: var(--cream); }
.nav-link.active { color: var(--gold); }

/* Property Card */
.prop-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all var(--transition);
  cursor: pointer;
}

.prop-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--border2);
}

.prop-card-img {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.prop-card-img img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .6s ease;
  display: block;
}

.prop-card:hover .prop-card-img img { transform: scale(1.05); }

.prop-card-body { padding: 20px; }

.prop-card-price {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--slate);
}

.prop-card-price span { font-size: 13px; font-weight: 400; color: var(--muted); margin-left: 4px; }
.prop-card-title { font-size: 15px; font-weight: 600; color: var(--slate); margin: 6px 0 4px; line-height: 1.4; }
.prop-card-loc { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 4px; }

.prop-card-specs {
  display: flex; gap: 16px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.prop-spec { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--muted); }
.prop-spec strong { color: var(--slate); font-weight: 600; }

/* Footer */
.footer {
  background: var(--slate);
  color: rgba(255,255,255,.7);
  padding: 48px 0 24px;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 24px;
  color: white;
  margin-bottom: 8px;
}

.footer-link {
  font-size: 13px;
  color: rgba(255,255,255,.6);
  background: none;
  border: none;
  padding: 4px 0;
  display: block;
  text-align: left;
  transition: color var(--transition);
  cursor: pointer;
}

.footer-link:hover { color: var(--gold2); }

.footer-bottom {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

/* Gallery */
.gallery-main {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 16/9;
}

.gallery-main img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}

.gallery-thumbs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.gallery-thumb {
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4/3;
  border: 2px solid transparent;
  transition: all var(--transition);
}

.gallery-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gallery-thumb.active { border-color: var(--gold); }
.gallery-thumb:hover { border-color: var(--border2); }

.gallery-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,.9);
  border: none;
  width: 44px; height: 44px;
  border-radius: 50%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition);
  z-index: 5;
  cursor: pointer;
}

.gallery-btn:hover { background: white; box-shadow: var(--shadow-lg); }
.gallery-btn-prev { left: 16px; }
.gallery-btn-next { right: 16px; }

.gallery-counter {
  position: absolute;
  bottom: 16px; right: 16px;
  background: rgba(0,0,0,.6);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.gallery-view-all {
  position: absolute;
  bottom: 16px; left: 16px;
  background: rgba(255,255,255,.9);
  border: none;
  font-size: 13px;
  font-weight: 600;
  color: var(--slate);
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
}

/* Booking Panel */
.booking-panel {
  position: sticky;
  top: 88px;
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.booking-header {
  padding: 24px;
  background: var(--slate);
  color: white;
}

.booking-price {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: white;
}

.booking-price span {
  font-size: 14px;
  font-weight: 400;
  opacity: .7;
}

.booking-body { padding: 24px; }

.booking-option {
  padding: 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);
  text-align: center;
}

.booking-option:hover { border-color: var(--gold); }
.booking-option.selected { border-color: var(--gold); background: var(--gold-lt); }
.booking-option .opt-icon { font-size: 20px; margin-bottom: 4px; }
.booking-option .opt-title { font-size: 12px; font-weight: 600; color: var(--slate); }
.booking-option .opt-sub { font-size: 11px; color: var(--muted); }

.booking-footer {
  padding: 16px 24px;
  background: var(--cream);
  border-top: 1px solid var(--border);
}

.booking-trust {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.55);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  backdrop-filter: blur(4px);
  animation: fadeIn .2s ease;
}

.modal {
  background: white;
  border-radius: var(--radius-xl);
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  animation: slideUp .3s ease;
}

.modal-header {
  padding: 28px 28px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body { padding: 28px; }

.modal-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--cream);
  border: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  cursor: pointer;
}

.modal-close:hover { background: var(--border); color: var(--slate); }

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--slate);
  color: white;
  padding: 12px 24px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 500;
  z-index: 3000;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 8px;
  animation: toastIn .3s ease;
  white-space: nowrap;
}

/* Responsive Design - Mobile First */
@media (max-width:1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .nav { padding: 0 16px; }
}

@media (max-width:768px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-2 { grid-template-columns: 1fr; }
  .container { padding: 0 16px; }
  .nav { height: 60px; padding: 0 12px; }
  .nav-logo { font-size: 18px; }
  .nav-link { margin: 0 2px; padding: 4px 8px; font-size: 13px; }
  .gallery-thumbs { grid-template-columns: repeat(3, 1fr); }
  .booking-panel { position: relative; top: 0; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
  main { margin-top: 60px; }
}

@media (max-width:480px) {
  .grid-3 { grid-template-columns: 1fr; }
  .grid-4 { grid-template-columns: 1fr; }
  .grid-2 { grid-template-columns: 1fr; }
  .container { padding: 0 12px; }
  main { margin-top: 56px; }
  .nav { height: 56px; padding: 0 8px; }
  .nav-logo { font-size: 16px; gap: 4px; }
  .nav-link { display: none; }
  
  .btn-lg { padding: 12px 20px; font-size: 14px; }
  .btn-xl { padding: 14px 28px; font-size: 15px; }
  
  .prop-card-body { padding: 16px; }
  .prop-card-price { font-size: 18px; }
  .prop-card-specs { gap: 12px; }
  
  .gallery-main { aspect-ratio: 1; }
  .gallery-thumbs { grid-template-columns: repeat(2, 1fr); gap: 6px; }
  .gallery-btn { width: 36px; height: 36px; font-size: 16px; }
  
  .booking-panel { margin: 0 -12px; border-radius: 0; }
  .booking-header { padding: 16px; }
  .booking-body { padding: 16px; }
  .booking-footer { padding: 12px 16px; }
  
  .modal { margin: 16px; max-width: none; }
  .modal-header { padding: 20px 20px 0; }
  .modal-body { padding: 20px; }
  
  .footer { padding: 32px 0 16px; }
  .footer-logo { font-size: 20px; }
}
`;
