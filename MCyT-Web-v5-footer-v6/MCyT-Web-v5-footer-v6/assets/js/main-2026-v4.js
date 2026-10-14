/* Navegación, galerías y filtros del sitio institucional. */
(() => {
  'use strict';
  const select = (selector, all = false) => {
    if (typeof selector !== 'string' || !selector.trim()) return all ? [] : null;
    try { return all ? [...document.querySelectorAll(selector)] : document.querySelector(selector); }
    catch (_) { return all ? [] : null; }
  };
  const navbar = select('#navbar');
  const toggle = select('.mobile-nav-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const closeMenu = () => {
    navbar?.classList.remove('navbar-mobile');
    toggle?.classList.remove('bi-x');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Abrir menú');
    select('.navbar .dropdown > a', true).forEach((link) => {
      link.setAttribute('aria-expanded', 'false');
      link.nextElementSibling?.classList.remove('dropdown-active');
    });
  };
  toggle?.addEventListener('click', () => {
    const open = navbar.classList.toggle('navbar-mobile');
    toggle.classList.toggle('bi-x', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbar?.classList.contains('navbar-mobile')) {
      closeMenu(); toggle?.focus();
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 991) closeMenu(); });
  select('.navbar .dropdown > a', true).forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!navbar?.classList.contains('navbar-mobile')) return;
      const submenu = link.nextElementSibling;
      if (!submenu) return;
      event.preventDefault();
      const expanded = submenu.classList.toggle('dropdown-active');
      link.setAttribute('aria-expanded', String(expanded));
    });
  });
  select('.scrollto', true).forEach((link) => {
    link.addEventListener('click', (event) => {
      const destination = new URL(link.href, window.location.href);
      if (destination.pathname !== window.location.pathname || !destination.hash) return;
      const section = select(destination.hash);
      if (!section) return;
      event.preventDefault();
      closeMenu();
      section.scrollIntoView({behavior:reducedMotion.matches ? 'auto' : 'smooth'});
    });
  });
  const back = select('.back-to-top');
  back?.setAttribute('aria-label', 'Volver al inicio de la página');
  back?.addEventListener('click', (event) => {
    event.preventDefault();
    closeMenu();
    window.scrollTo({top:0, behavior:reducedMotion.matches ? 'auto' : 'smooth'});
  });
  const header = select('#header');
  const updateScroll = () => {
    back?.classList.toggle('active', window.scrollY > 100);
    header?.classList.toggle('header-scrolled', window.scrollY > 100);
    document.documentElement.style.setProperty('--header-offset', `${(header?.offsetHeight || 0) + 24}px`);
  };
  window.addEventListener('scroll', updateScroll, {passive:true});
  window.addEventListener('resize', updateScroll);

  // La entrada debe verse después del cargador, no reproducirse detrás de él.
  let motionInitialized = false;
  const initializeMotion = () => {
    if (motionInitialized) return;
    motionInitialized = true;
    if (window.AOS) {
      window.AOS.init({duration:1000,easing:'ease-in-out',once:true,mirror:false,disable:reducedMotion.matches});
    } else {
      select('[data-aos]', true).forEach((el) => { el.style.opacity='1'; el.style.transform='none'; });
    }
  };

  // Conservar el cargador original sin esperar indefinidamente a mapas o iframes.
  const preloader = select('#preloader');
  let loaderStarted = Date.now();
  let loaderEnding = false;
  let loaderTimeout;
  let loaderFinishTimeout;
  let loaderCycle = 0;
  const hideLoader = () => {
    preloader.classList.remove('is-active');
    preloader.classList.add('is-leaving');
    // También funciona si el navegador conserva el CSS de la entrega anterior.
    preloader.style.transition = reducedMotion.matches ? 'none' : 'opacity .22s ease, visibility 0s .22s';
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    preloader.style.pointerEvents = 'none';
    window.setTimeout(initializeMotion, reducedMotion.matches ? 0 : 220);
  };
  const finishLoader = () => {
    if (!preloader || loaderEnding) return;
    loaderEnding = true;
    const remaining = reducedMotion.matches ? 0 : Math.max(0, 400 - (Date.now() - loaderStarted));
    loaderFinishTimeout = window.setTimeout(() => {
      hideLoader();
      window.clearTimeout(loaderTimeout);
    }, remaining);
  };
  const showLoader = () => {
    if (!preloader) return;
    if (reducedMotion.matches) { hideLoader(); return; }
    loaderStarted = Date.now();
    loaderEnding = false;
    loaderCycle++;
    preloader.classList.remove('is-leaving');
    preloader.classList.add('is-active');
    preloader.style.transition = 'none';
    preloader.style.opacity = '1';
    preloader.style.visibility = 'visible';
    preloader.style.pointerEvents = 'auto';
    window.clearTimeout(loaderTimeout);
    window.clearTimeout(loaderFinishTimeout);
    loaderTimeout = window.setTimeout(finishLoader, 2500);
  };
  showLoader();
  const initialLoaderCycle = loaderCycle;
  const finishInitialLoader = () => { if (loaderCycle === initialLoaderCycle) finishLoader(); };
  const pageReady = () => {
    const resources = select('img[data-critical-image]', true).map((img) => new Promise((resolve) => {
      if (img.complete) { resolve(); return; }
      img.addEventListener('load', resolve, {once:true});
      img.addEventListener('error', resolve, {once:true});
    }));
    if (document.fonts?.ready) resources.push(document.fonts.ready.catch(() => {}));
    Promise.all(resources).then(finishInitialLoader, finishInitialLoader);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pageReady, {once:true});
  else pageReady();
  window.addEventListener('load', finishInitialLoader, {once:true});
  window.addEventListener('pageshow', (event) => {
    if (event.persisted && preloader) {
      window.clearTimeout(loaderTimeout);
      window.clearTimeout(loaderFinishTimeout);
      hideLoader();
    }
  });
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
        (typeof event.button === 'number' && event.button !== 0)) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin ||
        (destination.pathname === window.location.pathname && destination.search === window.location.search)) return;
    if (!destination.pathname.endsWith('.html') && !destination.pathname.endsWith('/')) return;
    showLoader();
  });
  const initializePage = () => {
    updateScroll();
    if (!preloader || reducedMotion.matches) initializeMotion();
    const container = select('.portfolio-container');
    if (container && window.Isotope) {
      const isotope = new window.Isotope(container, {itemSelector:'.portfolio-item',layoutMode:'fitRows'});
      window.addEventListener('load', () => isotope.layout?.(), {once:true});
      const selected = {};
      select('[data-filter-group]', true).forEach((group) => {
        const name = group.dataset.filterGroup;
        selected[name] = '*';
        group.querySelectorAll('[data-filter]').forEach((button) => {
          const activate = (event) => {
            event.preventDefault();
            selected[name] = button.dataset.filter;
            group.querySelectorAll('[data-filter]').forEach((other) => {
              const active = other === button;
              other.classList.toggle('filter-active', active);
              other.setAttribute('aria-pressed', String(active));
            });
            const filter = Object.values(selected).filter((value) => value !== '*').join('') || '*';
            isotope.arrange({filter});
            const empty = select('#portfolio-empty');
            if (empty) empty.hidden = container.querySelectorAll(filter === '*' ? '.portfolio-item' : `.portfolio-item${filter}`).length > 0;
            window.AOS?.refresh();
          };
          button.addEventListener('click', activate);
          button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') activate(event);
          });
        });
      });
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage, {once:true});
  } else {
    initializePage();
  }
  if (window.GLightbox) window.GLightbox({selector:'.gallery-lightbox, .glightbox, .portfolio-lightbox'});
  if (window.Swiper) {
    select('.testimonials-slider, .portfolio-details-slider', true).forEach((slider) => {
      const count = slider.querySelectorAll('.swiper-slide').length;
      if (!count) return;
      new window.Swiper(slider, {
        speed:400, loop:count>1, slidesPerView:'auto',
        autoplay:reducedMotion.matches ? false : {delay:5000,disableOnInteraction:false},
        pagination:{el:slider.querySelector('.swiper-pagination'),clickable:true},
        ...(slider.classList.contains('testimonials-slider') ? {
          breakpoints:{320:{slidesPerView:1,spaceBetween:20},1200:{slidesPerView:3,spaceBetween:20}}
        } : {})
      });
    });
  }
  if (window.PureCounter) new window.PureCounter();
})();
