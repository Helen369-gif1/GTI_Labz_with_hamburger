
// Safe no-op script + reveal observer (recreated)
const onReady = () => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('show'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
};
document.readyState === 'loading' ?
 /* Рабочее мобильное меню (исправлено) */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hamburgerBtn");
  const panel = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("menuClose");
  const backdrop = document.getElementById("menuBackdrop");

  if (!btn || !panel) return;

  const openMenu = () => {
    panel.dataset.open = "true";
    panel.removeAttribute("aria-hidden");
    btn.setAttribute("aria-expanded", "true");
    backdrop.hidden = false;
    backdrop.dataset.open = "true";
    setTimeout(() => panel.classList.add("visible"), 10);
    document.addEventListener("keydown", onEsc);
  };

  const closeMenu = () => {
    panel.dataset.open = "false";
    btn.setAttribute("aria-expanded", "false");
    panel.classList.remove("visible");
    backdrop.dataset.open = "false";
    setTimeout(() => {
      backdrop.hidden = true;
      panel.setAttribute("aria-hidden", "true");
    }, 200);
    document.removeEventListener("keydown", onEsc);
  };

  const onEsc = (e) => {
    if (e.key === "Escape") closeMenu();
  };

  btn.addEventListener("click", () => {
    const open = panel.dataset.open === "true";
    open ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
});

