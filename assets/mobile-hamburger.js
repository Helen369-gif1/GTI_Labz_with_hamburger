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
    document.addEventListener("keydown", onEsc);
  };

  const closeMenu = () => {
    panel.dataset.open = "false";
    btn.setAttribute("aria-expanded", "false");
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
