/**
 * VYBE Registration Engine
 * Handles modal form interaction, real-time input validation,
 * LocalStorage ticket persistence, pass generation, and cancellation.
 */

import { getEventById, EVENTS_DATA } from './events.js';

const REG_STORAGE_KEY = 'vybe_user_registrations';

/**
 * Retrieve all registrations from LocalStorage
 */
export function getStoredRegistrations() {
  try {
    const raw = localStorage.getItem(REG_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed reading registrations from LocalStorage', e);
    return [];
  }
}

/**
 * Save registrations list to LocalStorage
 */
export function saveRegistrations(list) {
  try {
    localStorage.setItem(REG_STORAGE_KEY, JSON.stringify(list));
    updateRegistrationCountBadge();
  } catch (e) {
    console.error('Failed writing registrations to LocalStorage', e);
  }
}

/**
 * Generate a unique reference ID e.g. VYBE-2026-X8F4
 */
export function generateReferenceId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VYBE-26-${code}`;
}

/**
 * Validate phone number (10-digit Indian mobile number format)
 */
export function isValidPhone(phone) {
  const clean = phone.replace(/[\s\-+()]/g, '');
  // Handles 10 digits or 91XXXXXXXXXX
  if (clean.length === 10) {
    return /^[6-9]\d{9}$/.test(clean);
  }
  if (clean.length === 12 && clean.startsWith('91')) {
    return /^[6-9]\d{9}$/.test(clean.substring(2));
  }
  return false;
}

/**
 * Validate email address
 */
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate full name
 */
export function isValidName(name) {
  const trimmed = name.trim();
  return trimmed.length >= 3 && /^[a-zA-Z\s.'-]+$/.test(trimmed);
}

/**
 * Initialize Registration Controller
 */
export function initRegistration() {
  const form = document.getElementById('registration-form');
  const modal = document.getElementById('registration-modal');
  const closeBtn = document.getElementById('reg-modal-close');
  const eventSelect = document.getElementById('reg-event-select');
  const cancelRegModal = document.getElementById('cancel-confirm-modal');

  // Populate event dropdown
  if (eventSelect) {
    eventSelect.innerHTML = '<option value="">Select an experience to attend...</option>' +
      EVENTS_DATA.map(e => `<option value="${e.id}">${e.title} (${e.dateFormatted} • ${e.city})</option>`).join('');
  }

  // Real-time input listeners
  const nameInput = document.getElementById('reg-name');
  const emailInput = document.getElementById('reg-email');
  const phoneInput = document.getElementById('reg-phone');

  if (nameInput) {
    nameInput.addEventListener('input', () => validateField('name'));
    nameInput.addEventListener('blur', () => validateField('name'));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => validateField('email'));
    emailInput.addEventListener('blur', () => validateField('email'));
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      // Auto-format phone input
      phoneInput.value = phoneInput.value.replace(/[^\d\s\-]/g, '');
      validateField('phone');
    });
    phoneInput.addEventListener('blur', () => validateField('phone'));
  }
  if (eventSelect) {
    eventSelect.addEventListener('change', () => validateField('event'));
  }

  // Form submit
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Modal backdrop close
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeRegistrationModal();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeRegistrationModal);
  }

  // Global escape key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRegistrationModal();
      closeTicketModal();
      if (cancelRegModal && !cancelRegModal.classList.contains('hidden')) {
        cancelRegModal.classList.add('hidden');
      }
    }
  });

  // Render initial registrations and badges
  renderMyRegistrations();
  updateRegistrationCountBadge();
}

/**
 * Validate an individual field and display inline helper feedback
 */
function validateField(fieldName) {
  let isValid = true;
  let errorMsg = '';

  if (fieldName === 'name') {
    const input = document.getElementById('reg-name');
    const errEl = document.getElementById('reg-name-error');
    if (!input.value.trim()) {
      isValid = false;
      errorMsg = 'Please enter your full name.';
    } else if (!isValidName(input.value)) {
      isValid = false;
      errorMsg = 'Name must be at least 3 letters and contain valid characters.';
    }
    setFieldState(input, errEl, isValid, errorMsg);
  }

  if (fieldName === 'email') {
    const input = document.getElementById('reg-email');
    const errEl = document.getElementById('reg-email-error');
    if (!input.value.trim()) {
      isValid = false;
      errorMsg = 'Email address is required.';
    } else if (!isValidEmail(input.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid email address (e.g., name@example.com).';
    }
    setFieldState(input, errEl, isValid, errorMsg);
  }

  if (fieldName === 'phone') {
    const input = document.getElementById('reg-phone');
    const errEl = document.getElementById('reg-phone-error');
    if (!input.value.trim()) {
      isValid = false;
      errorMsg = 'Phone number is required.';
    } else if (!isValidPhone(input.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid 10-digit mobile number (e.g. 9876543210).';
    }
    setFieldState(input, errEl, isValid, errorMsg);
  }

  if (fieldName === 'event') {
    const input = document.getElementById('reg-event-select');
    const errEl = document.getElementById('reg-event-error');
    if (!input.value) {
      isValid = false;
      errorMsg = 'Please choose an event.';
    }
    setFieldState(input, errEl, isValid, errorMsg);
  }

  return isValid;
}

function setFieldState(input, errEl, isValid, errorMsg) {
  if (!input || !errEl) return;
  const parent = input.closest('.form-group');

  if (isValid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    if (parent) parent.classList.remove('has-error');
    errEl.textContent = '';
    errEl.classList.remove('visible');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    if (parent) parent.classList.add('has-error');
    errEl.textContent = errorMsg;
    errEl.classList.add('visible');
  }
}

let isSubmitting = false;

/**
 * Handle submission of the registration form
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  if (isSubmitting) return;

  const validName = validateField('name');
  const validEmail = validateField('email');
  const validPhone = validateField('phone');
  const validEvent = validateField('event');

  if (!validName || !validEmail || !validPhone || !validEvent) {
    const modalBox = document.querySelector('#registration-modal .modal-card');
    if (modalBox) {
      modalBox.classList.add('shake-animation');
      setTimeout(() => modalBox.classList.remove('shake-animation'), 600);
    }
    return;
  }

  isSubmitting = true;
  const submitBtn = document.getElementById('reg-submit-btn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span class="spinner"></span>
    <span>Generating Your Pass...</span>
  `;

  // Brief realistic generation pause for polish
  await new Promise(r => setTimeout(r, 650));

  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const eventId = document.getElementById('reg-event-select').value;
  const passQty = parseInt(document.getElementById('reg-passes').value || '1', 10);
  const dietary = document.getElementById('reg-dietary')?.value.trim() || 'None specified';

  const eventData = getEventById(eventId);
  if (!eventData) {
    alert('Invalid event selected.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    isSubmitting = false;
    return;
  }

  const newRegistration = {
    id: 'REG-' + Date.now(),
    referenceId: generateReferenceId(),
    createdAt: new Date().toISOString(),
    name,
    email,
    phone,
    passQty,
    dietary,
    eventId: eventData.id,
    eventTitle: eventData.title,
    eventCategory: eventData.categoryLabel,
    eventDate: eventData.dateFormatted,
    eventTime: eventData.time,
    eventVenue: eventData.venue,
    eventCity: eventData.city,
    eventImage: eventData.imageThumb,
    eventPrice: eventData.price,
    status: 'Confirmed'
  };

  const list = getStoredRegistrations();
  list.unshift(newRegistration);
  saveRegistrations(list);

  // Reset form
  document.getElementById('registration-form').reset();
  ['name', 'email', 'phone', 'event'].forEach(f => {
    const input = document.getElementById(`reg-${f === 'event' ? 'event-select' : f}`);
    if (input) {
      input.classList.remove('is-valid', 'is-invalid');
    }
  });

  submitBtn.disabled = false;
  submitBtn.innerHTML = originalBtnText;
  isSubmitting = false;

  // Close form modal, open success ticket modal
  closeRegistrationModal();
  renderMyRegistrations();
  showRegistrationSuccessPass(newRegistration);
}

/**
 * Open registration modal with optional pre-selected event
 */
export function openRegistrationModal(eventId = null) {
  const modal = document.getElementById('registration-modal');
  const eventSelect = document.getElementById('reg-event-select');
  const eventPreview = document.getElementById('reg-event-preview');

  if (eventId && eventSelect) {
    eventSelect.value = eventId;
    validateField('event');
  }

  updateEventPreview(eventId || (eventSelect ? eventSelect.value : null));

  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    
    // Focus first input
    setTimeout(() => {
      const nameInput = document.getElementById('reg-name');
      if (nameInput) nameInput.focus();
    }, 150);
  }
}

export function closeRegistrationModal() {
  const modal = document.getElementById('registration-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}

/**
 * Update the contextual preview card above the form
 */
export function updateEventPreview(eventId) {
  const preview = document.getElementById('reg-event-preview');
  if (!preview) return;

  if (!eventId) {
    preview.style.display = 'none';
    return;
  }

  const ev = getEventById(eventId);
  if (!ev) {
    preview.style.display = 'none';
    return;
  }

  const modal = document.getElementById('registration-modal');
  const color = ev.accentColor || '#E11D62';
  if (modal) {
    modal.style.setProperty('--ev-color', color);
    modal.style.setProperty('--ev-glow', `${color}44`);
    modal.style.setProperty('--ev-tint', `${color}18`);
    modal.style.setProperty('--lumen-glow-color', `${color}35`);
  }

  preview.style.display = 'flex';
  preview.style.setProperty('--ev-color', color);
  preview.style.setProperty('--ev-glow', `${color}44`);
  preview.style.setProperty('--ev-tint', `${color}18`);
  preview.innerHTML = `
    <img src="${ev.imageThumb}" alt="${ev.title}" class="reg-preview-img" loading="lazy" />
    <div class="reg-preview-info">
      <span class="reg-preview-tag">${ev.categoryLabel}</span>
      <h4 class="reg-preview-title">${ev.title}</h4>
      <p class="reg-preview-meta">
        <span>📅 ${ev.dateFormatted}</span>
        <span>📍 ${ev.venue}</span>
      </p>
      <div class="reg-preview-price">${ev.price}</div>
    </div>
  `;
}

/**
 * Trigger animated confetti particle blast
 */
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#B9F45D', '#B7A4FF', '#FFB59D', '#8BC9FF', '#FFFFFF'];
  const particles = [];
  const count = 90;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height / 2 - 100,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 14 - 6,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      gravity: 0.35
    });
  }

  let animationFrame;
  let startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let active = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      if (elapsed > 1200) {
        p.opacity -= 0.02;
      }
      if (p.opacity > 0) {
        active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        ctx.restore();
      }
    });

    if (active && elapsed < 3200) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  animate();
}

/**
 * Display the high-fidelity Digital Pass modal
 */
export function showRegistrationSuccessPass(reg) {
  const modal = document.getElementById('ticket-modal');
  if (!modal) return;

  const content = document.getElementById('ticket-modal-content');
  if (!content) return;

  // Generate SVG QR Code representation
  const qrSvg = generateDynamicQrSvg(reg.referenceId);

  content.innerHTML = `
    <div class="ticket-wrapper">
      <div class="ticket-header">
        <div class="ticket-brand">
          <span class="ticket-logo-mark">⚡</span>
          <span class="ticket-brand-name">VYBE PASS</span>
        </div>
        <div class="ticket-status-pill">
          <span class="status-dot"></span> Confirmed
        </div>
      </div>

      <div class="ticket-hero-row">
        <img src="${reg.eventImage}" alt="${reg.eventTitle}" class="ticket-event-thumb" />
        <div class="ticket-hero-text">
          <span class="ticket-cat-badge">${reg.eventCategory}</span>
          <h3 class="ticket-title">${reg.eventTitle}</h3>
          <p class="ticket-venue">📍 ${reg.eventVenue}, ${reg.eventCity}</p>
        </div>
      </div>

      <div class="ticket-perforated-divider">
        <span class="notch left"></span>
        <span class="dashed-line"></span>
        <span class="notch right"></span>
      </div>

      <div class="ticket-details-grid">
        <div class="ticket-data-item">
          <span class="ticket-label">ATTENDEE</span>
          <strong class="ticket-value">${reg.name}</strong>
        </div>
        <div class="ticket-data-item">
          <span class="ticket-label">PASSES</span>
          <strong class="ticket-value">${reg.passQty} ${reg.passQty > 1 ? 'Admissions' : 'Admission'}</strong>
        </div>
        <div class="ticket-data-item">
          <span class="ticket-label">DATE & TIME</span>
          <strong class="ticket-value">${reg.eventDate}</strong>
          <small class="ticket-sub">${reg.eventTime}</small>
        </div>
        <div class="ticket-data-item">
          <span class="ticket-label">PASS TIER</span>
          <strong class="ticket-value">${reg.eventPrice === 'Free' ? 'General Free Access' : 'Early Bird Tier'}</strong>
        </div>
      </div>

      <div class="ticket-barcode-section">
        <div class="ticket-qr-container" id="ticket-qr-container">
          <div class="qr-laser-scanner" id="qr-laser-scanner"></div>
          ${qrSvg}
        </div>
        <div class="ticket-ref-block">
          <span class="ticket-ref-title">REFERENCE ID</span>
          <span class="ticket-ref-code">${reg.referenceId}</span>
          <div class="ticket-admission-badge" id="ticket-admission-badge">
            <span class="admission-status-dot"></span> Valid Entry Pass
          </div>
          <p class="ticket-demo-disclaimer">
            🔒 Stored locally in your browser (Demonstration Platform).
          </p>
        </div>
      </div>

      <div class="ticket-actions-bar">
        <button type="button" class="btn btn-primary btn-sm" id="btn-scan-pass">
          <i data-lucide="scan"></i> Simulate Check-in
        </button>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-print-pass">
          <i data-lucide="printer"></i> Print / Save
        </button>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-gcal-pass">
          <i data-lucide="calendar"></i> Google Cal
        </button>
        <button type="button" class="btn btn-ghost btn-sm" id="btn-close-pass">
          Close
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  launchConfetti();

  // Attach button events
  const scanBtn = document.getElementById('btn-scan-pass');
  const qrContainer = document.getElementById('ticket-qr-container');
  const laser = document.getElementById('qr-laser-scanner');
  const statusPill = content.querySelector('.ticket-status-pill');
  const admissionBadge = document.getElementById('ticket-admission-badge');

  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      if (laser) laser.classList.add('scanning');
      scanBtn.disabled = true;
      scanBtn.innerHTML = '<span class="spinner"></span> Scanning...';

      setTimeout(() => {
        if (laser) laser.classList.remove('scanning');
        if (statusPill) {
          statusPill.innerHTML = '<span class="status-dot"></span> Admitted • Gate 02';
          statusPill.style.color = '#10B981';
        }
        if (admissionBadge) {
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          admissionBadge.className = 'ticket-admission-badge admitted';
          admissionBadge.innerHTML = `✓ Admitted at Gate 02 (${nowStr})`;
        }
        scanBtn.disabled = false;
        scanBtn.innerHTML = '<i data-lucide="check-circle-2"></i> Admitted';
        scanBtn.classList.remove('btn-primary');
        scanBtn.classList.add('btn-secondary');
        if (window.lucide) window.lucide.createIcons();
      }, 850);
    });
  }

  const printBtn = document.getElementById('btn-print-pass');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const gcalBtn = document.getElementById('btn-gcal-pass');
  if (gcalBtn) {
    gcalBtn.addEventListener('click', () => {
      openGoogleCalendar(reg);
    });
  }

  const closeBtn = document.getElementById('btn-close-pass');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeTicketModal);
  }

  // Refresh lucide icons inside modal
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

export function closeTicketModal() {
  const modal = document.getElementById('ticket-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}

/**
 * Generate a procedural geometric SVG QR Code
 */
function generateDynamicQrSvg(code) {
  // Generate deterministic binary pattern from code string
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (hash << 5) - hash + code.charCodeAt(i);
    hash |= 0;
  }

  let cells = '';
  const size = 11;
  const cellSize = 8;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Corner alignment marks
      const isCornerTL = r < 3 && c < 3;
      const isCornerTR = r < 3 && c > size - 4;
      const isCornerBL = r > size - 4 && c < 3;

      let isFilled = false;
      if (isCornerTL || isCornerTR || isCornerBL) {
        if ((r === 0 || r === 2 || c === 0 || c === 2) && isCornerTL) isFilled = true;
        else if ((r === 0 || r === 2 || c === size - 1 || c === size - 3) && isCornerTR) isFilled = true;
        else if ((r === size - 1 || r === size - 3 || c === 0 || c === 2) && isCornerBL) isFilled = true;
        else if (r === 1 && c === 1) isFilled = true;
        else if (r === 1 && c === size - 2) isFilled = true;
        else if (r === size - 2 && c === 1) isFilled = true;
      } else {
        const seed = Math.sin(hash + r * 13 + c * 37) * 10000;
        isFilled = (seed - Math.floor(seed)) > 0.45;
      }

      if (isFilled) {
        cells += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize - 1}" height="${cellSize - 1}" rx="1.5" fill="currentColor"/>`;
      }
    }
  }

  return `
    <svg class="qr-svg" viewBox="0 0 ${size * cellSize} ${size * cellSize}" width="88" height="88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QR Code: ${code}">
      ${cells}
    </svg>
  `;
}

/**
 * Create downloadable .ics calendar file for the event
 */
function downloadCalendarEvent(reg) {
  const ev = getEventById(reg.eventId);
  const title = reg.eventTitle;
  const desc = `VYBE Event Registration ID: ${reg.referenceId}\\nAttendee: ${reg.name}\\nPasses: ${reg.passQty}\\nVenue: ${reg.eventVenue}, ${reg.eventCity}`;
  const location = `${reg.eventVenue}, ${reg.eventCity}`;
  
  // Create .ics content
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VYBE Events//Event Pass//EN',
    'BEGIN:VEVENT',
    `UID:${reg.referenceId}@vybe.events`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `SUMMARY:${title} [VYBE]`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `VYBE-${reg.referenceId}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Open pre-filled Google Calendar event web link
 */
function openGoogleCalendar(reg) {
  const title = encodeURIComponent(`${reg.eventTitle} [VYBE Pass: ${reg.referenceId}]`);
  const details = encodeURIComponent(`VYBE Pass Holder: ${reg.name}\nReference Code: ${reg.referenceId}\nSpots: ${reg.passQty}\nVenue: ${reg.eventVenue}, ${reg.eventCity}`);
  const location = encodeURIComponent(`${reg.eventVenue}, ${reg.eventCity}`);
  
  // Format date loosely to Google Calendar syntax
  const ev = getEventById(reg.eventId);
  let dateParam = '';
  if (ev && ev.date) {
    const dStr = ev.date.replace(/-/g, '');
    dateParam = `&dates=${dStr}T140000Z/${dStr}T180000Z`;
  }
  
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}${dateParam}`;
  window.open(gcalUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Render the My Registrations list
 */
export function renderMyRegistrations() {
  const container = document.getElementById('registrations-list');
  const emptyState = document.getElementById('registrations-empty');
  if (!container) return;

  const list = getStoredRegistrations();

  if (list.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    container.innerHTML = '';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = list.map(reg => `
    <article class="reg-card clay-card" data-reg-id="${reg.id}">
      <div class="reg-card-img-wrap">
        <img src="${reg.eventImage}" alt="${reg.eventTitle}" class="reg-card-img" loading="lazy" />
        <span class="reg-card-tag">${reg.eventCategory}</span>
      </div>
      <div class="reg-card-content">
        <div class="reg-card-top">
          <div class="reg-card-meta-date">📅 ${reg.eventDate} • ${reg.eventTime}</div>
          <span class="badge badge-success">
            <span class="status-dot"></span> Confirmed
          </span>
        </div>
        <h3 class="reg-card-title">${reg.eventTitle}</h3>
        <p class="reg-card-venue">📍 ${reg.eventVenue}, ${reg.eventCity}</p>
        
        <div class="reg-card-details-strip">
          <div>
            <span class="reg-strip-lbl">PASS HOLDER</span>
            <span class="reg-strip-val">${reg.name}</span>
          </div>
          <div>
            <span class="reg-strip-lbl">PASS REF</span>
            <span class="reg-strip-val code-font">${reg.referenceId}</span>
          </div>
          <div>
            <span class="reg-strip-lbl">SEATS</span>
            <span class="reg-strip-val">${reg.passQty} Spot${reg.passQty > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div class="reg-card-actions">
          <button type="button" class="btn btn-secondary btn-sm view-ticket-btn" data-reg-id="${reg.id}">
            <i data-lucide="ticket"></i> View Pass
          </button>
          <button type="button" class="btn btn-ghost btn-sm text-danger cancel-ticket-btn" data-reg-id="${reg.id}" data-event-title="${reg.eventTitle}">
            <i data-lucide="trash-2"></i> Cancel
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Attach card event listeners
  container.querySelectorAll('.view-ticket-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-reg-id');
      const reg = getStoredRegistrations().find(r => r.id === id);
      if (reg) showRegistrationSuccessPass(reg);
    });
  });

  container.querySelectorAll('.cancel-ticket-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-reg-id');
      const title = btn.getAttribute('data-event-title');
      openCancelConfirmation(id, title);
    });
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Handle pass cancellation with confirmation dialog
 */
let targetCancelId = null;

export function openCancelConfirmation(regId, eventTitle) {
  targetCancelId = regId;
  const modal = document.getElementById('cancel-confirm-modal');
  const titleEl = document.getElementById('cancel-event-name');
  if (titleEl) titleEl.textContent = `"${eventTitle}"`;

  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }

  const confirmBtn = document.getElementById('btn-confirm-cancel');
  const dismissBtn = document.getElementById('btn-abort-cancel');

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      if (targetCancelId) {
        cancelRegistration(targetCancelId);
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        targetCancelId = null;
      }
    };
  }

  if (dismissBtn) {
    dismissBtn.onclick = () => {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      targetCancelId = null;
    };
  }
}

export function cancelRegistration(id) {
  let list = getStoredRegistrations();
  const card = document.querySelector(`.reg-card[data-reg-id="${id}"]`);

  if (card) {
    card.classList.add('card-fade-out');
    setTimeout(() => {
      list = list.filter(r => r.id !== id);
      saveRegistrations(list);
      renderMyRegistrations();
      updateRegistrationCountBadge();
    }, 300);
  } else {
    list = list.filter(r => r.id !== id);
    saveRegistrations(list);
    renderMyRegistrations();
    updateRegistrationCountBadge();
  }
}

/**
 * Update the numeric badge in the navbar and section title
 */
export function updateRegistrationCountBadge() {
  const count = getStoredRegistrations().length;
  const badges = document.querySelectorAll('.reg-count-badge');
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

