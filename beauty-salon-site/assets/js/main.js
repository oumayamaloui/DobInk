// Basic interactivity for the VIP theme
(function(){
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const bookingForm = document.querySelector('#bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form).entries());
      const required = ['name','phone','service','date','time'];
      const missing = required.filter(k => !data[k] || String(data[k]).trim()==='');
      if (missing.length) {
        alert('Merci de remplir tous les champs requis.');
        return;
      }
      localStorage.setItem('lastBooking', JSON.stringify(data));
      form.reset();
      alert('Votre demande de rendez-vous a été envoyée. Nous vous contacterons très bientôt.');
    });
  }
})();
