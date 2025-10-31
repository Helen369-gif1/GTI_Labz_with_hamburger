/* Мобильное меню: исправлена навигация по ссылкам + раскрытие */
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
    if (backdrop) {
      backdrop.hidden = false;
      backdrop.dataset.open = "true";
    }
    document.addEventListener("keydown", onEsc);
  };

  const closeMenu = () => {
    panel.dataset.open = "false";
    btn.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.dataset.open = "false";
    setTimeout(() => {
      if (backdrop) backdrop.hidden = true;
      panel.setAttribute("aria-hidden", "true");
    }, 220);
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

  // ВАЖНО: клики по ссылкам внутри меню — закрываем меню, НО НЕ отменяем переход
  panel.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a && a.href) {
      // Закрываем меню, а переход выполняется браузером по умолчанию
      closeMenu();
    }
  });
});
