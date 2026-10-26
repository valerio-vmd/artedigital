(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    const url = new URL(link.href);
    url.pathname = `/${window.SITE_CONFIG.whatsappNumber}`;
    link.href = url.href;
  });
})();
