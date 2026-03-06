/* ================================================================
   NEXUS DIGITAL -- i18n Toggle Engine
   Hebrew default (RTL), English secondary (LTR).
   Reads/writes localStorage('nexus-lang').
   ================================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'nexus-lang';
  var DEFAULT_LANG = 'he';

  // ------------------------------------------------------------------
  // Helper: safe localStorage access (avoids errors in private mode / file://)
  // ------------------------------------------------------------------
  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* silent */ }
  }

  // ------------------------------------------------------------------
  // 1. Immediately set dir + lang from storage (before first paint)
  // ------------------------------------------------------------------
  var saved = storageGet(STORAGE_KEY) || DEFAULT_LANG;
  var root = document.documentElement;
  root.lang = saved;
  root.dir  = saved === 'he' ? 'rtl' : 'ltr';

  // ------------------------------------------------------------------
  // 2. Page detection for meta tags
  // ------------------------------------------------------------------
  function detectPage() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var file = path.split('/').pop() || 'index.html';
    if (file === '' || file === 'index.html') return 'index';
    if (file === 'about.html')               return 'about';
    if (file === 'blog.html')                return 'blog';
    if (file === 'post-template.html')       return 'post';
    if (file === 'contact.html')             return 'contact';
    return 'index';
  }

  // ------------------------------------------------------------------
  // 3. Apply translations for a given language
  // ------------------------------------------------------------------
  function applyTranslations(lang) {
    var T = window.TRANSLATIONS;
    if (!T) {
      console.warn('[i18n] TRANSLATIONS not loaded — check translations.js');
      return;
    }

    // Plain text
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (T[key] && T[key][lang] != null) el.textContent = T[key][lang];
    });

    // Inner HTML (elements with <br>, <strong>, etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (T[key] && T[key][lang] != null) el.innerHTML = T[key][lang];
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (T[key] && T[key][lang] != null) el.placeholder = T[key][lang];
    });

    // Aria labels
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (T[key] && T[key][lang] != null) el.setAttribute('aria-label', T[key][lang]);
    });

    // Title + meta description
    var page = detectPage();
    var titleKey = 'meta.' + page + '.title';
    var descKey  = 'meta.' + page + '.desc';
    if (T[titleKey] && T[titleKey][lang]) document.title = T[titleKey][lang];
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && T[descKey] && T[descKey][lang]) metaDesc.setAttribute('content', T[descKey][lang]);

    // Direction
    root.lang = lang;
    root.dir  = lang === 'he' ? 'rtl' : 'ltr';

    // Toggle button active state
    document.querySelectorAll('.lang-toggle__btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });

    // Persist
    storageSet(STORAGE_KEY, lang);
  }

  // ------------------------------------------------------------------
  // 4. Expose global toggle function
  // ------------------------------------------------------------------
  window.toggleLanguage = function (lang) {
    applyTranslations(lang);
  };

  // ------------------------------------------------------------------
  // 5. On DOMContentLoaded: apply if saved lang differs from default
  // ------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    if (saved !== DEFAULT_LANG) {
      applyTranslations(saved);
    }
    // Always sync toggle button active state
    document.querySelectorAll('.lang-toggle__btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === saved);
    });
  });

})();
