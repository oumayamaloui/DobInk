// Simple modal for reservations confirmation
(() => {
  const form = document.getElementById('reservation-form');
  const modalEl = document.getElementById('reservationSuccessModal');
  if (!form || !modalEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name') || 'Client(e) VIP';

    const message = modalEl.querySelector('.modal-body .message');
    if (message) message.textContent = `Merci ${name}, votre demande a été reçue. Nous vous contacterons très vite.`;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
    form.reset();
  });
})();
