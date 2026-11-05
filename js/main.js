/**
 * VYBE - Main Application Controller
 * Orchestrates event exploration, filtering, searching, details drawer,
 * bookmarks, newsletter, and mobile navigation.
 */

import { EVENTS_DATA, CATEGORIES, CITIES, filterEvents, getEventById, TESTIMONIALS_DATA } from './events.js';
import { initTheme } from './theme.js';
import { initRegistration, openRegistrationModal, closeRegistrationModal } from './registration.js';
import { initAnimations } from './animations.js';

// State
let currentCategory = 'all';
let currentCity = 'all';
let currentView = 'grid'; // 'grid' | 'timeline'
let savedOnlyFilter = false;
let searchQuery = '';
let currentSort = 'upcoming';
let freeOnlyFilter = false;
let savedEventIds = new Set();

const SAVED_STORAGE_KEY = 'vybe_saved_event_ids';

// Instant background warmup for all event thumbnails
if (typeof window !== 'undefined') {
  try {
    EVENTS_DATA.forEach(ev => {
      const img = new Image();
      img.decoding = 'async';
      img.src = ev.imageThumb;
    });
  } catch (e) {
    // Non-blocking
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Load bookmarks
  loadSavedEvents();

  // Initialize modular controllers
  initTheme();
  initRegistration();
  
  // Render core views
  renderFeaturedEvents();
  renderCategoryPills();
  renderCityPills();
  renderEvents();
  renderTestimonials();
  initHeroCountdown();
  updateSavedCounterUI();

  // Attach search and filter events
  initSearchAndFilterControls();

  // Attach mobile navigation
  initMobileNav();

  // Attach newsletter
  initNewsletter();

  // Initialize motion & animations & luminescence
  initAnimations();
  initLuminescenceSpotlights();

  // Global icon refresh
  refreshIcons();
});

window.addEventListener('load', () => {
  refreshIcons();
});

export function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/**
 * Load Bookmarked Events from LocalStorage
 */
function loadSavedEvents() {
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    if (raw) {
      savedEventIds = new Set(JSON.parse(raw));
    }
  } catch (e) {
    savedEventIds = new Set();
  }
}

function updateSavedCounterUI() {
  const el = document.getElementById('saved-filter-count');
  if (el) {
    el.textContent = savedEventIds.size;
  }
}

function toggleSaveEvent(eventId) {
  if (savedEventIds.has(eventId)) {
    savedEventIds.delete(eventId);
    showToast('Removed from saved experiences');
  } else {
    savedEventIds.add(eventId);
    showToast('Saved to your experiences');
  }

  try {
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(Array.from(savedEventIds)));
  } catch (e) {
    console.error(e);
  }

  updateSavedCounterUI();

  // Update heart icons across cards
  document.querySelectorAll(`.btn-save-event[data-event-id="${eventId}"]`).forEach(btn => {
    const isSaved = savedEventIds.has(eventId);
    btn.classList.toggle('active', isSaved);
    btn.setAttribute('aria-label', isSaved ? 'Remove bookmark' : 'Bookmark event');
  });

  if (savedOnlyFilter) {
    renderEvents();
  }
}

/**
 * Hero Live Countdown Timer
 */
function initHeroCountdown() {
  const cdDays = document.getElementById('hero-cd-days');
  const cdHours = document.getElementById('hero-cd-hours');
  const cdMins = document.getElementById('hero-cd-mins');

  if (!cdDays || !cdHours || !cdMins) return;

  // Target event: Neon Horizon on Nov 14, 2026, 7:30 PM
  const targetDate = new Date('2026-11-14T19:30:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = Math.max(0, targetDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent = String(mins).padStart(2, '0');
  }

  update();
  setInterval(update, 60000);
}

/**
 * Render Featured Events (Section 7)
 * 1 large editorial card + 2 complementary cards
 */
function renderFeaturedEvents() {
  const container = document.getElementById('featured-events-grid');
  if (!container) return;

  const featured = EVENTS_DATA.filter(e => e.isFeatured);
  if (!featured.length) return;

  const mainEvent = featured[0];
  const sideEvents = featured.slice(1, 3);

  container.innerHTML = `
    <!-- Main Large Featured Card -->
    <article class="featured-card featured-main-card clay-card lumen-glow-surface" data-event-id="${mainEvent.id}" style="--ev-color: ${mainEvent.accentColor || '#E11D62'}; --ev-glow: ${mainEvent.accentColor || '#E11D62'}44; --ev-tint: ${mainEvent.accentColor || '#E11D62'}18; --lumen-glow-color: ${mainEvent.accentColor || '#E11D62'}35;">
      <div class="featured-img-wrap">
        <img src="${mainEvent.image}" alt="${mainEvent.title}" class="featured-img event-card-img" loading="lazy" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')" />
        <div class="img-shimmer-placeholder shimmer-effect"></div>
        <div class="featured-overlay"></div>
        <div class="featured-top-pills">
          <span class="badge badge-accent">${mainEvent.badge}</span>
          <span class="badge badge-glass">${mainEvent.categoryLabel}</span>
        </div>
        <button type="button" class="btn-save-event ${savedEventIds.has(mainEvent.id) ? 'active' : ''}" data-event-id="${mainEvent.id}" aria-label="Bookmark event">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        </button>
      </div>

      <div class="featured-body">
        <div class="featured-meta-row">
          <span class="event-meta-item">
            <i data-lucide="calendar"></i> ${mainEvent.dateFormatted}
          </span>
          <span class="event-meta-item">
            <i data-lucide="clock"></i> ${mainEvent.time}
          </span>
        </div>

        <h3 class="featured-title">${mainEvent.title}</h3>
        <p class="featured-desc">${mainEvent.shortDescription}</p>

        <div class="featured-footer">
          <div class="featured-venue-price">
            <span class="venue-line"><i data-lucide="map-pin"></i> ${mainEvent.venue}, ${mainEvent.city}</span>
            <span class="price-line">${mainEvent.price}</span>
          </div>

          <div class="featured-actions">
            <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-event-id="${mainEvent.id}">
              View Details
            </button>
            <button type="button" class="btn btn-primary btn-sm quick-register-btn" data-event-id="${mainEvent.id}">
              Register Now <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </article>

    <!-- Side Stack of Two Featured Events -->
    <div class="featured-side-stack">
      ${sideEvents.map(ev => `
        <article class="featured-card featured-side-card clay-card lumen-glow-surface" data-event-id="${ev.id}" style="--ev-color: ${ev.accentColor || '#E11D62'}; --ev-glow: ${ev.accentColor || '#E11D62'}44; --ev-tint: ${ev.accentColor || '#E11D62'}18; --lumen-glow-color: ${ev.accentColor || '#E11D62'}35;">
          <div class="featured-side-img-wrap" style="position: relative; overflow: hidden;">
            <img src="${ev.imageThumb}" alt="${ev.title}" class="featured-img event-card-img" loading="lazy" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')" />
            <div class="img-shimmer-placeholder shimmer-effect"></div>
            <div class="featured-top-pills">
              <span class="badge badge-accent">${ev.badge}</span>
              <span class="badge badge-glass">${ev.categoryLabel}</span>
            </div>
            <button type="button" class="btn-save-event ${savedEventIds.has(ev.id) ? 'active' : ''}" data-event-id="${ev.id}" aria-label="Bookmark event">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            </button>
          </div>

          <div class="featured-side-body">
            <div class="featured-meta-row">
              <span class="event-meta-item"><i data-lucide="calendar"></i> ${ev.dateFormatted}</span>
              <span class="price-line">${ev.price}</span>
            </div>
            <h4 class="featured-side-title">${ev.title}</h4>
            <p class="featured-side-venue"><i data-lucide="map-pin"></i> ${ev.venue}, ${ev.city}</p>

            <div class="featured-side-actions">
              <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-event-id="${ev.id}">
                Details
              </button>
              <button type="button" class="btn btn-primary btn-sm quick-register-btn" data-event-id="${ev.id}">
                Register
              </button>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;

  bindEventCardButtons(container);
}

/**
 * Render Category Filter Chips (Section 8)
 */
function renderCategoryPills() {
  const pillsContainer = document.getElementById('category-filter-pills');
  if (!pillsContainer) return;

  pillsContainer.innerHTML = CATEGORIES.map(cat => {
    const count = cat.id === 'all'
      ? EVENTS_DATA.length
      : EVENTS_DATA.filter(e => e.category === cat.id).length;

    return `
      <button type="button" class="category-chip ${cat.id === currentCategory ? 'active' : ''}" data-cat-id="${cat.id}">
        <span class="chip-label">${cat.label}</span>
        <span class="chip-count">${count}</span>
      </button>
    `;
  }).join('');

  pillsContainer.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      currentCategory = chip.getAttribute('data-cat-id');
      pillsContainer.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderEvents();
    });
  });
}

/**
 * Render City / Region Filter Chips
 */
function renderCityPills() {
  const container = document.getElementById('city-filter-pills');
  if (!container) return;

  container.innerHTML = CITIES.map(c => `
    <button type="button" class="city-chip ${c.id === currentCity ? 'active' : ''}" data-city-id="${c.id}">
      ${c.label}
    </button>
  `).join('');

  container.querySelectorAll('.city-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCity = btn.getAttribute('data-city-id');
      container.querySelectorAll('.city-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEvents();
    });
  });
}

/**
 * Main Events Renderer (Orchestrates Grid vs Timeline Views)
 */
export function renderEvents() {
  const grid = document.getElementById('events-grid');
  const timeline = document.getElementById('events-timeline');
  const emptyState = document.getElementById('events-empty-state');
  const resultsCount = document.getElementById('results-count-text');
  const cityIndicator = document.getElementById('active-city-indicator');
  const skeleton = document.getElementById('events-loading-skeleton');
  const loaderStatus = document.getElementById('events-loader-status');

  // Instant dismissal: No artificial wait, render events synchronously
  if (skeleton) skeleton.style.display = 'none';
  if (loaderStatus) loaderStatus.style.display = 'none';

  const events = filterEvents({
    category: currentCategory,
    city: currentCity,
    query: searchQuery,
    sort: currentSort,
    freeOnly: freeOnlyFilter,
    savedOnly: savedOnlyFilter,
    savedIds: Array.from(savedEventIds)
  });

  if (resultsCount) {
    resultsCount.textContent = `Showing ${events.length} curated experience${events.length === 1 ? '' : 's'}`;
  }

  if (cityIndicator) {
    cityIndicator.textContent = currentCity === 'all' ? 'Across All Cities' : `In ${currentCity}`;
  }

  if (events.length === 0) {
    if (grid) grid.innerHTML = '';
    if (timeline) timeline.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  if (currentView === 'grid') {
    if (grid) {
      grid.style.display = 'grid';
      grid.classList.add('revealed');
    }
    if (timeline) timeline.style.display = 'none';
    renderEventGrid(events);
  } else {
    if (grid) grid.style.display = 'none';
    if (timeline) {
      timeline.style.display = 'flex';
      timeline.classList.add('revealed');
    }
    renderTimelineView(events);
  }

  initLuminescenceSpotlights();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Render Event Exploration Grid
 */
function renderEventGrid(events) {
  const grid = document.getElementById('events-grid');
  if (!grid) return;

  grid.innerHTML = events.map((ev, idx) => {
    const parts = ev.date ? ev.date.split('-') : ['2026', '11', '14'];
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthName = monthNames[parseInt(parts[1], 10) - 1] || 'NOV';
    const dayNum = parts[2] || '14';
    const spotsLeft = ev.capacity - ev.registeredCount;
    const color = ev.accentColor || '#E11D62';
    const isEager = idx < 6;

    return `
    <article class="event-card clay-card lumen-glow-surface" data-event-id="${ev.id}" style="animation-delay: ${idx * 20}ms; --ev-color: ${color}; --ev-glow: ${color}44; --ev-tint: ${color}18; --lumen-glow-color: ${color}35;">
      <div class="event-card-img-wrap">
        <img src="${ev.imageThumb}" alt="${ev.title}" class="event-card-img" ${isEager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')" />
        <div class="img-shimmer-placeholder shimmer-effect"></div>
        <div class="card-sheen-sweep"></div>
        
        <!-- Editorial Date Block Badge -->
        <div class="card-date-badge">
          <span class="card-date-month">${monthName}</span>
          <span class="card-date-day">${dayNum}</span>
        </div>

        <div class="event-card-badges">
          <span class="badge badge-glass">${ev.categoryLabel}</span>
          ${spotsLeft <= 25 ? `<span class="badge badge-accent badge-pulse">⚡ ${spotsLeft} left</span>` : (ev.badge ? `<span class="badge badge-glass">${ev.badge}</span>` : '')}
        </div>

        <button type="button" class="btn-save-event ${savedEventIds.has(ev.id) ? 'active' : ''}" data-event-id="${ev.id}" aria-label="Bookmark event">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        </button>
      </div>

      <div class="event-card-content">
        <div class="event-card-meta">
          <span class="event-meta-time"><i data-lucide="clock"></i> ${ev.time.split('–')[0].trim()}</span>
          <span class="event-price-pill ${ev.isFree ? 'is-free' : ''}">${ev.price}</span>
        </div>

        <h3 class="event-card-title">${ev.title}</h3>
        <p class="event-card-desc">${ev.shortDescription}</p>

        <div class="event-card-venue">
          <i data-lucide="map-pin"></i>
          <span>${ev.venue}, <strong>${ev.city}</strong></span>
        </div>

        <div class="event-card-footer">
          <div class="event-organizer-mini">
            <img src="${ev.organizer.avatar}" alt="${ev.organizer.name}" class="org-avatar-mini" loading="lazy" decoding="async" />
            <span class="org-name-mini">${ev.organizer.name}</span>
          </div>

          <div class="event-card-btn-group">
            <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-event-id="${ev.id}">
              Details
            </button>
            <button type="button" class="btn btn-primary btn-sm quick-register-btn" data-event-id="${ev.id}">
              Join <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </article>
    `;
  }).join('');

  bindEventCardButtons(grid);
}

/**
 * Render Chronological Timeline View
 */
function renderTimelineView(events) {
  const container = document.getElementById('events-timeline');
  if (!container) return;

  container.innerHTML = events.map((ev, idx) => {
    const color = ev.accentColor || '#E11D62';
    const isEager = idx < 6;
    return `
    <article class="timeline-row clay-card lumen-glow-surface" data-event-id="${ev.id}" style="animation-delay: ${idx * 20}ms; --ev-color: ${color}; --ev-glow: ${color}44; --ev-tint: ${color}18; --lumen-glow-color: ${color}35;">
      <div class="timeline-date-col">
        <span class="timeline-day-chip">${ev.dateFormatted.split(',')[0]}</span>
        <strong class="timeline-full-date">${ev.dateFormatted.split(',')[1] || ev.dateFormatted}</strong>
        <span class="timeline-time"><i data-lucide="clock"></i> ${ev.time}</span>
      </div>

      <div class="timeline-img-col" style="position: relative; overflow: hidden; border-radius: var(--radius-sm);">
        <img src="${ev.imageThumb}" alt="${ev.title}" class="timeline-thumb event-card-img" ${isEager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" onload="this.classList.add('loaded')" onerror="this.classList.add('loaded')" />
        <div class="img-shimmer-placeholder shimmer-effect"></div>
      </div>

      <div class="timeline-info-col">
        <div class="timeline-badge-strip">
          <span class="badge badge-glass">${ev.categoryLabel}</span>
          <span class="badge badge-accent">${ev.city}</span>
          ${ev.badge ? `<span class="badge badge-glass">${ev.badge}</span>` : ''}
        </div>
        <h3 class="timeline-title">${ev.title}</h3>
        <p class="timeline-venue"><i data-lucide="map-pin"></i> ${ev.venue}</p>
        <p class="timeline-desc">${ev.shortDescription}</p>
      </div>

      <div class="timeline-cta-col">
        <div class="timeline-price-tag">${ev.price}</div>
        <button type="button" class="btn btn-primary btn-sm quick-register-btn" data-event-id="${ev.id}">
          Reserve Spot <i data-lucide="arrow-right"></i>
        </button>
        <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-event-id="${ev.id}">
          Details
        </button>
      </div>
    </article>
    `;
  }).join('');

  bindEventCardButtons(container);
}

/**
 * Dynamic Luminescence Spotlight Tracker
 * Tracks pointer movement on cards to illuminate translucent specular borders and halos
 */
export function initLuminescenceSpotlights() {
  const elements = document.querySelectorAll('.clay-card, .event-card, .featured-card, .timeline-row, .modal-card, .lumen-glow-surface');
  elements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Bind Click Events to Event Cards (Details & Register)
 */
function bindEventCardButtons(container) {
  // Bookmark button
  container.querySelectorAll('.btn-save-event').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-event-id');
      toggleSaveEvent(id);
    });
  });

  // View details
  container.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-event-id');
      openEventDetails(id);
    });
  });

  // Entire card click opens details if not clicking button
  container.querySelectorAll('.event-card, .featured-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const id = card.getAttribute('data-event-id');
      if (id) openEventDetails(id);
    });
  });

  // Quick Register
  container.querySelectorAll('.quick-register-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-event-id');
      openRegistrationModal(id);
    });
  });
}

/**
 * Event Details Experience (Section 9)
 * Full-featured magazine style modal drawer
 */
export function openEventDetails(eventId) {
  const ev = getEventById(eventId);
  if (!ev) return;

  const modal = document.getElementById('event-details-modal');
  const content = document.getElementById('event-details-content');
  if (!modal || !content) return;

  const color = ev.accentColor || '#E11D62';
  modal.style.setProperty('--ev-color', color);
  modal.style.setProperty('--ev-glow', `${color}44`);
  modal.style.setProperty('--ev-tint', `${color}18`);
  modal.style.setProperty('--lumen-glow-color', `${color}35`);

  const isSaved = savedEventIds.has(ev.id);
  const remainingSpots = ev.capacity - ev.registeredCount;

  content.innerHTML = `
    <div class="details-magazine-wrap" style="--ev-color: ${color}; --ev-glow: ${color}44; --ev-tint: ${color}18;">
      <div class="details-hero">
        <img src="${ev.image}" alt="${ev.title}" class="details-hero-img" />
        <div class="details-hero-overlay"></div>

        <button type="button" class="details-close-btn" id="details-close-btn" aria-label="Close details">
          <i data-lucide="x"></i>
        </button>

        <div class="details-hero-badges">
          <span class="badge badge-accent">${ev.badge || 'Curated'}</span>
          <span class="badge badge-glass">${ev.categoryLabel}</span>
        </div>

        <div class="details-hero-actions">
          <button type="button" class="btn-round-glass btn-share-event" data-event-id="${ev.id}" aria-label="Share experience">
            <i data-lucide="share-2"></i>
          </button>
          <button type="button" class="btn-round-glass btn-detail-save ${isSaved ? 'active' : ''}" data-event-id="${ev.id}" aria-label="Save event">
            <i data-lucide="bookmark"></i>
          </button>
        </div>

        <div class="details-hero-content">
          <div class="details-meta-pill">
            <span>📅 ${ev.dateFormatted}</span>
            <span>⏰ ${ev.time}</span>
          </div>
          <h2 class="details-title">${ev.title}</h2>
          <p class="details-venue-row">
            <i data-lucide="map-pin"></i> ${ev.venue}, ${ev.city}
          </p>
        </div>
      </div>

      <div class="details-body-layout">
        <div class="details-main-column">
          <section class="details-section">
            <h3 class="details-sec-heading">About The Experience</h3>
            <p class="details-text">${ev.fullDescription}</p>
          </section>

          <section class="details-section">
            <h3 class="details-sec-heading">What To Expect</h3>
            <ul class="details-highlights-list">
              ${ev.highlights.map(h => `
                <li>
                  <span class="highlight-check"><i data-lucide="check"></i></span>
                  <span>${h}</span>
                </li>
              `).join('')}
            </ul>
          </section>

          <section class="details-section">
            <h3 class="details-sec-heading">Presented By</h3>
            <div class="details-organizer-card clay-card">
              <img src="${ev.organizer.avatar}" alt="${ev.organizer.name}" class="org-avatar-lg" />
              <div class="org-info-lg">
                <div class="org-name-verified">
                  <strong>${ev.organizer.name}</strong>
                  <span class="verified-badge" title="Verified Curator">✓ Verified</span>
                </div>
                <p class="org-role">${ev.organizer.role}</p>
                <small class="org-desc">Vetted community partner adhering to VYBE experiential quality standards.</small>
              </div>
            </div>
          </section>
        </div>

        <aside class="details-sidebar-column">
          <div class="details-booking-card clay-card">
            <div class="booking-price-header">
              <span class="booking-lbl">ADMISSION</span>
              <span class="booking-price">${ev.price}</span>
            </div>

            <div class="spots-capacity-bar">
              <div class="spots-info-row">
                <span>Registration Status</span>
                <strong>${remainingSpots} spots remaining</strong>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${Math.min(100, (ev.registeredCount / ev.capacity) * 100)}%;"></div>
              </div>
            </div>

            <div class="booking-features-list">
              <div class="b-feature"><i data-lucide="shield-check"></i> Instant digital pass issued</div>
              <div class="b-feature"><i data-lucide="smartphone"></i> Contactless entry on device</div>
              <div class="b-feature"><i data-lucide="clock"></i> Free cancellation anytime</div>
            </div>

            <button type="button" class="btn btn-primary btn-block details-reg-cta" id="details-cta-register" data-event-id="${ev.id}">
              Reserve Your Spot <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </aside>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Close handlers
  const closeBtn = document.getElementById('details-close-btn');
  if (closeBtn) closeBtn.onclick = closeEventDetails;

  modal.onclick = (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeEventDetails();
    }
  };

  // Register CTA inside details
  const registerCta = document.getElementById('details-cta-register');
  if (registerCta) {
    registerCta.onclick = () => {
      closeEventDetails();
      openRegistrationModal(ev.id);
    };
  }

  // Share action
  const shareBtn = content.querySelector('.btn-share-event');
  if (shareBtn) {
    shareBtn.onclick = () => {
      if (navigator.share) {
        navigator.share({
          title: ev.title,
          text: `Check out ${ev.title} on VYBE!`,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Experience link copied to clipboard!');
      }
    };
  }

  // Bookmark action in details
  const detailSaveBtn = content.querySelector('.btn-detail-save');
  if (detailSaveBtn) {
    detailSaveBtn.onclick = () => {
      toggleSaveEvent(ev.id);
      const isNowSaved = savedEventIds.has(ev.id);
      detailSaveBtn.classList.toggle('active', isNowSaved);
    };
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

export function closeEventDetails() {
  const modal = document.getElementById('event-details-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}

/**
 * Search and Filter Controls Initialization
 */
function initSearchAndFilterControls() {
  const searchInput = document.getElementById('event-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const sortSelect = document.getElementById('sort-select');
  const freeToggle = document.getElementById('filter-free-only');
  const savedOnlyBtn = document.getElementById('filter-saved-only');
  const viewGridBtn = document.getElementById('view-mode-grid');
  const viewTimelineBtn = document.getElementById('view-mode-timeline');
  const resetFiltersBtn = document.getElementById('btn-reset-filters');

  let debounceTimer;

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.trim();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = searchQuery ? 'inline-flex' : 'none';
        }
        renderEvents();
      }, 200);
    });

    // Keyboard shortcut '/' to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && !document.body.classList.contains('modal-open')) {
        e.preventDefault();
        searchInput.focus();
        showToast('Search focused');
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderEvents();
      if (searchInput) searchInput.focus();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderEvents();
    });
  }

  if (freeToggle) {
    freeToggle.addEventListener('change', (e) => {
      freeOnlyFilter = e.target.checked;
      renderEvents();
    });
  }

  if (savedOnlyBtn) {
    savedOnlyBtn.addEventListener('click', () => {
      savedOnlyFilter = !savedOnlyFilter;
      savedOnlyBtn.classList.toggle('active', savedOnlyFilter);
      savedOnlyBtn.setAttribute('aria-pressed', String(savedOnlyFilter));
      renderEvents();
      showToast(savedOnlyFilter ? 'Filtering bookmarked experiences' : 'Showing all experiences');
    });
  }

  if (viewGridBtn && viewTimelineBtn) {
    viewGridBtn.addEventListener('click', () => {
      if (currentView === 'grid') return;
      currentView = 'grid';
      viewGridBtn.classList.add('active');
      viewTimelineBtn.classList.remove('active');
      renderEvents();
    });

    viewTimelineBtn.addEventListener('click', () => {
      if (currentView === 'timeline') return;
      currentView = 'timeline';
      viewTimelineBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      renderEvents();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentCity = 'all';
      searchQuery = '';
      currentSort = 'upcoming';
      freeOnlyFilter = false;
      savedOnlyFilter = false;

      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      if (sortSelect) sortSelect.value = 'upcoming';
      if (freeToggle) freeToggle.checked = false;

      if (savedOnlyBtn) {
        savedOnlyBtn.classList.remove('active');
        savedOnlyBtn.setAttribute('aria-pressed', 'false');
      }

      const pillsContainer = document.getElementById('category-filter-pills');
      if (pillsContainer) {
        pillsContainer.querySelectorAll('.category-chip').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-cat-id') === 'all');
        });
      }

      const cityPillsContainer = document.getElementById('city-filter-pills');
      if (cityPillsContainer) {
        cityPillsContainer.querySelectorAll('.city-chip').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-city-id') === 'all');
        });
      }

      renderEvents();
    });
  }

  // Header explore CTA buttons
  document.querySelectorAll('[data-action="open-explore"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const section = document.getElementById('explore-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Global register modal trigger
  document.querySelectorAll('[data-action="open-register-modal"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openRegistrationModal();
    });
  });
}

/**
 * Render Testimonials Carousel Items
 */
function renderTestimonials() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;

  track.innerHTML = TESTIMONIALS_DATA.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-card clay-card">
        <div class="test-quote-mark">“</div>
        <p class="test-quote-text">${t.quote}</p>
        <div class="test-user-row">
          <img src="${t.avatar}" alt="${t.name}" class="test-avatar" loading="lazy" />
          <div class="test-user-meta">
            <h4 class="test-user-name">${t.name}</h4>
            <span class="test-event-attended">Attended <strong>${t.event}</strong></span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-nav-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileNav) return;

  const toggle = (open) => {
    const isOpen = open !== undefined ? open : !mobileNav.classList.contains('active');
    mobileNav.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('modal-open', isOpen);
  };

  menuToggle.addEventListener('click', () => toggle());
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) toggle(false);
  });
}

/**
 * Footer Newsletter
 */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const msg = document.getElementById('newsletter-feedback');

  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (msg) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'newsletter-feedback error';
      }
      return;
    }

    if (msg) {
      msg.textContent = '✓ Welcome to the inner circle! Curated drops will arrive weekly.';
      msg.className = 'newsletter-feedback success';
    }
    input.value = '';
    showToast('Subscribed to VYBE Weekly!');
  });
}

/**
 * Minimalist modern toast alert
 */
export function showToast(message) {
  let toast = document.getElementById('vybe-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'vybe-toast';
    toast.className = 'vybe-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('visible');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2600);
}
