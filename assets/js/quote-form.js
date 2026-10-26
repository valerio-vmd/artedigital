(() => {
  'use strict';
  const form = document.getElementById('calcForm');
  const count = document.getElementById('selectedCount');
  const selected = () => Array.from(form.querySelectorAll('.option-check:checked'));

  function updateCount() {
    const total = selected().length;
    count.textContent = `${total} ${total === 1 ? 'serviço' : 'serviços'}`;
  }

  form.addEventListener('change', updateCount);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const services = selected();
    if (!services.length) {
      alert('Por favor, selecione pelo menos um serviço para solicitar o orçamento.');
      form.querySelector('.option-check').focus();
      return;
    }
    const deadline = form.querySelector('input[name="deadline"]:checked').value;
    const message = [
      '*Solicitação de Orçamento - Via Instagram/Site*', '',
      '*Serviços Selecionados:*',
      ...services.map(service => `• ${service.value}`), '',
      `*Prazo Desejado:* ${deadline}`, '',
      'Gostaria de saber mais informações e valores para dar andamento!'
    ].join('\n');
    const url = new URL(`https://wa.me/${window.SITE_CONFIG.whatsappNumber}`);
    url.searchParams.set('text', message);
    window.location.assign(url.href);
  });
  updateCount();
})();
