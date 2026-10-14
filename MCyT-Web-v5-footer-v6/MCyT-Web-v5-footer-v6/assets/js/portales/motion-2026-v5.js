/* Entradas discretas para los portales: contenido visible si no hay soporte. */
(() => {
  'use strict';
  const start = () => {
    const reduce = {matches:false, addEventListener(){}};
    const blocks = [...document.querySelectorAll('.portal-reveal')];
    if (reduce.matches || !window.IntersectionObserver || !blocks.length) return;
    let observer;
    const showAll = () => {
      observer?.disconnect();
      document.body.removeAttribute('data-portal-motion');
      blocks.forEach(block => block.classList.add('is-visible'));
    };
    try {
      observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');observer.unobserve(entry.target);
        });
      }, {threshold:.12,rootMargin:'0px 0px -24px 0px'});
      document.body.dataset.portalMotion = 'ready';
      blocks.forEach(block => observer.observe(block));
      reduce.addEventListener?.('change', event => {if(event.matches) showAll();});
    } catch (_) {showAll();}
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
