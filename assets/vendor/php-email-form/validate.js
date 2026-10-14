/* Valida, obtiene protección CSRF y muestra errores como texto. */
(() => {
  'use strict';
  document.querySelectorAll('.php-email-form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const loading = form.querySelector('.loading');
      const error = form.querySelector('.error-message');
      const success = form.querySelector('.sent-message');
      const button = form.querySelector('[type="submit"]');
      if (button.disabled) return;
      const endpoint = form.getAttribute('action');
      error.textContent = '';
      error.classList.remove('d-block');
      success.classList.remove('d-block');
      loading.classList.add('d-block');
      button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      try {
        const tokenUrl = new URL(endpoint, window.location.href);
        tokenUrl.searchParams.set('token', '1');
        const tokenResponse = await fetch(tokenUrl, {credentials:'same-origin',cache:'no-store'});
        if (!tokenResponse.ok) throw new Error('No se pudo iniciar el envío. Intentá más tarde o usá el correo de contacto.');
        const token = await tokenResponse.json();
        if (typeof token.token !== 'string' || !token.token) throw new Error('No se pudo validar el formulario.');
        const data = new FormData(form);
        data.set('csrf_token', token.token);
        const response = await fetch(endpoint, {method:'POST',body:data,credentials:'same-origin',headers:{'X-Requested-With':'XMLHttpRequest'}});
        const message = (await response.text()).trim();
        if (!response.ok || message !== 'OK') throw new Error(message || 'No pudimos enviar tu consulta. Intentá más tarde.');
        form.reset();
        success.classList.add('d-block');
      } catch (failure) {
        const message = failure.name === 'TypeError'
          ? 'No se pudo conectar con el servicio de correo. Intentá más tarde; tu consulta sigue en el formulario.'
          : failure.message;
        error.textContent = message && message.length <= 500 ? message : 'No pudimos confirmar el envío de tu consulta. Intentá más tarde.';
        error.classList.add('d-block');
      } finally {
        loading.classList.remove('d-block');
        button.disabled = false;
        form.removeAttribute('aria-busy');
      }
    });
  });
})();
