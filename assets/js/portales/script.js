/* Los diálogos usan :target; el scroll no debe cancelar su navegación. */
(() => {
  'use strict';
  const reducedMotion = () => false;
  let opener = null;
  const currentOverlay = () => {
    const target = document.getElementById(window.location.hash.slice(1));
    return target?.classList.contains('overlay') ? target : null;
  };
  const synchronize = () => {
    const active = currentOverlay();
    document.body.classList.toggle('overlay-open', Boolean(active));
    document.querySelectorAll('.overlay').forEach((overlay) => {
      overlay.setAttribute('aria-hidden', String(overlay !== active));
    });
    if (active) active.querySelector('.close')?.focus({preventScroll:true});
  };
  const close = () => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    synchronize();
    opener?.focus({preventScroll:true});
  };
  document.querySelectorAll('.overlay').forEach((overlay) => {
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    const title = overlay.querySelector('h1, h2, h3');
    if (title) {
      title.id ||= overlay.id + '-titulo';
      overlay.setAttribute('aria-labelledby', title.id);
    }
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close();
    });
    overlay.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab' || overlay !== currentOverlay()) return;
      const focusable = [...overlay.querySelectorAll('a[href], button, input, textarea, select, [tabindex="0"]')]
        .filter((el) => !el.disabled);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (link.classList.contains('close') && link.closest('.overlay')) {
        event.preventDefault(); close(); return;
      }
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const destination = document.getElementById(id);
      if (!destination) return;
      if (destination.classList.contains('overlay')) {
        opener = link;
        return;
      }
      event.preventDefault();
      destination.scrollIntoView({behavior:reducedMotion() ? 'auto' : 'smooth'});
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && currentOverlay()) close();
  });
  window.addEventListener('hashchange', synchronize);
  synchronize();
})();
