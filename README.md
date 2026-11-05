# VYBE — Premium Event Discovery & Management Platform
> **Find Your People. Feel The Moment.**

[![Platform](https://img.shields.io/badge/Platform-Web%20Desktop%20%26%20Mobile-B9F45D?style=for-the-badge)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-B7A4FF?style=for-the-badge)](LICENSE)
[![Architecture](https://img.shields.io/badge/Architecture-Vanilla%20ES6%2B%20%2F%20Zero--Backend-FFB59D?style=for-the-badge)](https://github.com)

---

## 1. Overview

**VYBE** is a commercial-grade, responsive, and visually immersive event discovery and management web platform. Designed at the intersection of a modern cultural discovery platform and a high-end digital lifestyle magazine, VYBE connects urban enthusiasts with curated concerts, technology conferences, artisan workshops, athletic jams, and contemporary cultural exhibitions.

Built without heavy frameworks (pure semantic HTML5, modern CSS3, and modular ES6+ JavaScript), VYBE is designed for lightning-fast performance, buttery 60fps animations, zero-backend deployment, and client-side data persistence.

---

## 2. Key Features

### ✨ Visual Design & Kinetic Gaming Experience
- **Tactile Claymorphism & Strategic Glassmorphism**: Cards, badges, buttons, and dialogs feature multi-layer diffused inner and drop shadows (`--shadow-clay`, `--shadow-clay-pill`, `--shadow-clay-pressed`) paired with frosted glass backdrops (`backdrop-filter: blur(20px)`).
- **Game-Website Moving Scroll Animations**:
  - **Top Luminescent Scroll Progress Bar**: An ultra-sleek, neon-lime/lavender progress bar spanning the top edge with an animated leading spark bead providing real-time scroll depth feedback.
  - **Velocity-Reactive Kinetic Marquee Ticker**: Continuous infinite marquee ribbon with tech HUD glyphs (`[ + ]`, `◈`, `✦`) that accelerates dynamically when scrolling and returns smoothly to baseline velocity.
  - **3D Parallax & Stage Tilting**: Differential vertical parallax and subtle 3D perspective shifts on the hero card stage (`rotateX` / `translateY`) as the user scrolls.
  - **Dynamic Ambient Canvas Warping**: Background harmonic orbs warp along the Y-axis based on scroll velocity, creating a hyperspace / high-speed gaming HUD sensation.
  - **Animated Stat Counters (Odometer Effect)**: Participant counters (`14,200+`, `85+`) smoothly increment from 0 to target values using cubic ease-out curves upon scrolling into view.
- **Realistic Luminescence System**: Interactive cursor-tracking spotlights (`--mouse-x`, `--mouse-y`) that cast specular halos and phosphorescent ambient glows onto cards and interactive controls.
- **Animated Mesh Background & Living Canvas**: A slow organic multi-point mesh gradient drift combined with an HTML5 Canvas of harmonic breathing pastel orbs that subtly respond to cursor movement.
- **Micro-Texture Grain**: Subtle SVG procedural film grain overlay to provide tangible tactile depth.
- **Lag-Free 60fps Theme Switching**: Instantaneous dual-mode color adaptation with zero framerate stutter.
- **Editorial Typography**: Pairing **Space Grotesk** for modern bold headings, **Inter** for crisp legibility, and **Playfair Display** italic for editorial touches.

### 📱 Mobile-First Hardening & Bug Fixes
- **Zero Horizontal Overflow**: Elimination of `width: 100vw` hazards on fixed overlays (`#ambient-canvas`, `.grain-overlay`, `.modal-overlay`, `#confetti-canvas`, `.mobile-nav-drawer`) in favor of `inset: 0; width: 100%; height: 100%`, guaranteeing 0px horizontal spill on narrow devices (360px–480px).
- **iOS Safari Auto-Zoom Guard**: Form inputs and search fields locked to `16px` on mobile viewports to prevent disorienting automatic viewport zooming on tap.
- **Touch-Momentum Scrolling**: Native momentum scrolling (`-webkit-overflow-scrolling: touch`) and scroll-snap alignment on horizontal category and city chip bars.
- **Mobile Bottom-Sheet Modals**: Event details drawer seamlessly transforms into an ergonomic native mobile bottom sheet with sticky booking actions.
- **Safe Dialog Centering**: Confirmation dialogs have explicit safe margins and corner radii on small screens.

### 🧪 Comprehensive Cross-Screen QA Test Suite
- **Interactive Visual Test Suite (`tests/test_suite.html`)**:
  - Dedicated QA dashboard with live viewport frames for **iPhone SE (375x667)**, **iPhone 14/15 (390x844)**, **iPad Mini (768x1024)**, and **Desktop (1200x800)**.
  - Automated runner executing 17 live browser assertions with pass/fail indicators, execution timings, and interactive console logs.
- **Automated CLI Test Suite (`tests/test_all_scenarios.py`)**:
  - Headless test suite testing 24 cross-screen scenarios across mobile layout integrity, PC engines, data models, and motion accessibility. Runs anytime with `python tests/test_all_scenarios.py` with 100% pass rate.

### 🎟️ Client-Side Digital Pass & Registration Engine
- **Strict JavaScript Validation**:
  - Full Name validation (minimum length, alphabetic characters).
  - RFC-compliant email pattern validation.
  - 10-digit mobile number format validation.
  - Event selection verification and pass quantity options (1 to 4 admissions).
  - Prevention of duplicate or rapid-fire double submissions.
- **Procedural Pass Generation**:
  - Automatically generates a unique Pass Reference Code (e.g., `VYBE-26-8K2A`).
  - Generates a dynamic, procedural geometric SVG QR Code pattern tailored to the ticket.
  - Perforated ticket styling with semi-circular cutouts and dashed separator.
- **Interactive Gate Check-in Scanner Simulation**:
  - Attendees and event staff can simulate gate check-in with a glowing neon laser scanner sweeping across the QR code.
  - Generates a verified entrance stamp (`Admitted at Gate 02`) with timestamp upon successful scan.
- **Direct Google Calendar & .ICS Integration**:
  - One-click Google Calendar web export directly pre-filling date, time, venue, and description.
  - Instant `.ics` calendar invitation generation and download.
- **Attendee Utility Actions**:
  - Download or print the digital pass.
  - Canvas confetti particle blast on successful reservation.

### 💼 "My Registrations" Pass Wallet
- Dedicated pass wallet showing all confirmed passes stored in the user's browser.
- Interactive "View Pass" modal to re-inspect digital tickets anytime.
- "Cancel Registration" flow with a protective confirmation dialog and animated card departure.
- Live registration counter badge dynamically synchronizing across the navigation bar and wallet header.

### 🌗 Dark & Light Theme System
- Dual-mode palette designed from the ground up (not simple color inversion):
  - **Light Mode**: Warm off-white (`#F6F5F1`), stone secondary (`#ECEBE6`), and deep ink text (`#171717`).
  - **Dark Mode**: Deep charcoal (`#101114`), slate secondary (`#18191E`), and luminous accents (`#B9F45D` Electric Lime).
- Automatically defaults to the user's system preference (`prefers-color-scheme`).
- Persists user override in `LocalStorage`.
- Smooth 350ms theme transition across all interface components.

### 💬 Social Proof & Testimonials Carousel
- Horizontal testimonial slider featuring real community quotes and authentic participant profiles.
- Automatic cycling with pause-on-hover and touch swipe support for mobile devices.
- Fully accessible with pagination dots and navigation buttons.

### 📱 Responsive & Accessible
- Seamlessly scales from 360px mobile screens up to 1440px+ ultra-wide monitors.
- Full respect for `prefers-reduced-motion` settings.
- Accessible ARIA dialog semantics, labeled form inputs, and high contrast ratios.

---

## 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Markup** | HTML5 (Semantic elements: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`) |
| **Styling** | Modern CSS3 (Custom properties, CSS Grid, Flexbox, Claymorphism, Glassmorphism, Clamped typography) |
| **Logic** | Vanilla JavaScript (ES6+ Modules: `import` / `export`, Async/Await, Canvas API) |
| **Typography** | Google Fonts: Space Grotesk, Inter, Playfair Display, JetBrains Mono |
| **Iconography** | Lucide Icons |
| **Storage** | Client-Side Web Storage API (`localStorage`) |

---

## 4. Project Structure

```
VYBE/
│
├── index.html                   # Main semantic entry point
├── README.md                    # Comprehensive documentation
│
├── css/
│   ├── style.css                # Design tokens, variables, typography, layouts, components
│   ├── animations.css           # Keyframes, transitions, reveals, reduced-motion handlers
│   └── responsive.css           # Mobile-first and breakpoint adaptations (360px to 1440px+)
│
├── js/
│   ├── main.js                  # Application orchestrator, search/filters, details drawer, toast
│   ├── events.js                # Curated dataset of 12 events, categories, and query utilities
│   ├── registration.js          # Form validation, LocalStorage pass persistence, QR generator
│   ├── theme.js                 # Dark/light theme controller and system preference listener
│   └── animations.js            # Ambient canvas, 3D tilt, scroll observer, testimonial carousel
│
└── assets/
    ├── images/                  # Static image assets
    └── icons/                   # Static icon assets
```

---

## 5. LocalStorage Implementation Details

All user data is stored strictly in the client's web browser using standard `window.localStorage` keys:

1. **`vybe_user_registrations`**:
   - Stores an array of JSON objects representing confirmed passes.
   - Schema:
     ```json
     {
       "id": "REG-1730814600000",
       "referenceId": "VYBE-26-8K2A",
       "createdAt": "2026-11-05T13:50:00.000Z",
       "name": "Maya Ramanathan",
       "email": "maya@example.com",
       "phone": "9876543210",
       "passQty": 2,
       "dietary": "None",
       "eventId": "vybe-ev-01",
       "eventTitle": "Neon Horizon: Ambient & Modular Synth Showcase",
       "eventCategory": "Music",
       "eventDate": "Sat, Nov 14, 2026",
       "eventTime": "7:30 PM – 11:30 PM",
       "eventVenue": "Warehouse 44, Indiranagar Arts Quarter",
       "eventCity": "Bengaluru",
       "eventImage": "...",
       "eventPrice": "₹899",
       "status": "Confirmed"
     }
     ```
2. **`vybe_saved_event_ids`**:
   - Stores an array of event IDs bookmarked by the user (`["vybe-ev-01", "vybe-ev-03"]`).
3. **`vybe_theme_preference`**:
   - Stores the active theme string: `"light"` or `"dark"`.

> **Note on Data Retention**: This is a pure frontend demonstration platform. Registration passes and user bookmarks are kept in local browser memory and are not sent to any external server or actual event organizer.

---

## 6. Installation & Local Development

No package installation, compilation, or bundler setup is required.

### Option A: Direct Browser Opening
Because the project uses standard ES6 modules (`type="module"`), files must be served over HTTP/HTTPS rather than `file://` to adhere to browser CORS standards for local script imports.

### Option B: Local Python Web Server (Recommended)
If you have Python installed, launch a local development server with one command from the project directory:

```bash
# Python 3
python -m http.server 8000
```

Open your browser and navigate to:
```
http://localhost:8000
```

### Option C: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Click **"Go Live"** on the bottom status bar or right-click `index.html` → **Open with Live Server**.

---

## 7. Deployment Instructions

This repository is completely static and ready for instant deployment:

### Deploy to GitHub Pages
1. Push the code to a GitHub repository.
2. Go to repository **Settings** → **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder, then click **Save**.
5. Your platform will be live within seconds at `https://<username>.github.io/<repo>/`.

### Deploy to Vercel
```bash
# Using Vercel CLI
npx vercel deploy
```
Or import the GitHub repository into the Vercel dashboard with default settings (Framework preset: "Other").

### Deploy to Netlify
- Drag and drop the project folder directly onto the Netlify drop zone, or link your GitHub repo with publish directory set to `/`.

---

## 8. Known Limitations & Demonstration Scope

1. **Demonstration Ticketing**: Registrations are stored in client-side `LocalStorage`. Clearing browser cache or switching devices will reset saved tickets.
2. **Payment Processing**: Prices are formatted for realistic demonstration purposes; checkout generates confirmed entry passes without charging real currency.
3. **Calendar Integration**: Calendar additions generate standard RFC-compliant `.ics` files that open with Apple Calendar, Google Calendar, Outlook, and mobile calendar apps.

---

## 9. Brand & Design Credits

- **Platform Name**: VYBE
- **Tagline**: *"Find Your People. Feel The Moment."*
- **Aesthetic**: Contemporary Lifestyle Magazine meets Tactile Event Discovery
- **Photography**: High-resolution curated imagery sourced from the Unsplash creative collective.

