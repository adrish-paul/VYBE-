/**
 * VYBE Theme Controller
 * Handles dark/light theme switching with smooth transitions, system preference fallback,
 * and LocalStorage persistence.
 */

const THEME_STORAGE_KEY = 'vybe_theme_preference';

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  
  // Default to signature yellowish premium light mode
  const initialTheme = savedTheme || 'light';
  applyTheme(initialTheme, false);

  // Bind theme toggle buttons
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

export function applyTheme(theme, persist = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  // Update UI icons / aria-labels instantly
  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
  toggleButtons.forEach(btn => {
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    const iconSun = btn.querySelector('.theme-icon-sun');
    const iconMoon = btn.querySelector('.theme-icon-moon');
    if (iconSun && iconMoon) {
      if (theme === 'dark') {
        iconSun.style.display = 'block';
        iconMoon.style.display = 'none';
      } else {
        iconSun.style.display = 'none';
        iconMoon.style.display = 'block';
      }
    }
  });

  // Dispatch custom event for visual components needing re-render
  window.dispatchEvent(new CustomEvent('vybe:theme-changed', { detail: { theme } }));
}

export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

