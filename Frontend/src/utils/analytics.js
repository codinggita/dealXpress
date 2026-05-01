/**
 * Google Analytics 4 (GA4) Utility
 * Uses gtag.js loaded in index.html
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-K39QDCK6C3';

/**
 * Track a page view (called on every route change)
 * @param {string} path - current URL path
 * @param {string} title - page title
 */
export const trackPageView = (path, title) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
};

/**
 * Track a custom event (button clicks, form submits, etc.)
 * @param {string} action - e.g. 'click_negotiate', 'submit_offer'
 * @param {string} category - e.g. 'Negotiation', 'Auth', 'Marketplace'
 * @param {string} [label] - optional label for more detail
 * @param {number} [value] - optional numeric value
 */
export const trackEvent = (action, category, label = '', value = 0) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
