// Theme toggle with system preference + persistence
(function() {
  const storageKey = 'theme-preference';
  const root = document.documentElement;
  const toggleButton = document.getElementById('themeToggle');
  const getPreference = () => localStorage.getItem(storageKey) || 'system';
  const setPreference = (pref) => localStorage.setItem(storageKey, pref);

  function applyTheme(pref) {
    root.classList.remove('light');
    if (pref === 'light') root.classList.add('light');
  }

  function initTheme() {
    const pref = getPreference();
    applyTheme(pref);
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        const current = getPreference();
        const next = current === 'light' ? 'dark' : 'light';
        setPreference(next);
        applyTheme(next);
      });
    }
  }

  // Scroll reveal micro-interaction
  function initReveal() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  // Year in footer
  function setYear() { const y = new Date().getFullYear(); document.querySelectorAll('#year').forEach(n => n.textContent = y); }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initReveal();
    setYear();
  });
})();
