/* Mobile Hamburger Menu logic */
(function() {
  const btn = document.getElementById('hamburgerBtn');
  const panel = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('menuClose');
  const backdrop = document.getElementById('menuBackdrop');

  if (!btn || !panel) return;

  function openMenu() {
    panel.dataset.open = 'true';
    panel.removeAttribute('aria-hidden');
    btn.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
    backdrop.dataset.open = 'true';
    // focus the first link for accessibility
    const firstLink = panel.querySelector('a');
    if (firstLink) firstLink.focus();
    document.addEventListener('keydown', onEsc);
  }

  function closeMenu() {
    panel.dataset.open = 'false';
    panel.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    backdrop.dataset.open = 'false';
    // allow CSS transition to finish before hiding
    setTimeout(() => { backdrop.hidden = true; }, 200);
    btn.focus();
    document.removeEventListener('keydown', onEsc);
  }

  function onEsc(e) {
    if (e.key === 'Escape') closeMenu();
  }

  btn.addEventListener('click', () => {
    const isOpen = panel.dataset.open === 'true';
    isOpen ? closeMenu() : openMenu();
  });
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  backdrop && backdrop.addEventListener('click', closeMenu);
})();
