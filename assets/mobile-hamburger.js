/* Mobile menu — robust open/close, link navigation preserved */
(function() {
  function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }
  ready(function(){
    var btn = document.getElementById('hamburgerBtn');
    var panel = document.getElementById('mobileMenu');
    var closeBtn = document.getElementById('menuClose');
    var backdrop = document.getElementById('menuBackdrop');

    if(!btn || !panel){ return; }

    function openMenu(){
      panel.dataset.open = 'true';
      panel.removeAttribute('aria-hidden');
      btn.setAttribute('aria-expanded', 'true');
      if(backdrop){
        backdrop.hidden = false;
        backdrop.dataset.open = 'true';
      }
      document.addEventListener('keydown', onEsc);
    }
    function closeMenu(){
      panel.dataset.open = 'false';
      btn.setAttribute('aria-expanded', 'false');
      if(backdrop){ backdrop.dataset.open = 'false'; }
      setTimeout(function(){
        if(backdrop){ backdrop.hidden = true; }
        panel.setAttribute('aria-hidden', 'true');
      }, 250);
      document.removeEventListener('keydown', onEsc);
    }
    function onEsc(e){ if(e.key === 'Escape'){ closeMenu(); } }

    btn.addEventListener('click', function(){
      var open = panel.dataset.open === 'true';
      open ? closeMenu() : openMenu();
    });
    if(closeBtn){ closeBtn.addEventListener('click', closeMenu); }
    if(backdrop){ backdrop.addEventListener('click', closeMenu); }

    // link clicks: close menu, allow navigation naturally
    panel.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if(a && a.href){ closeMenu(); }
    });
  });
})();
