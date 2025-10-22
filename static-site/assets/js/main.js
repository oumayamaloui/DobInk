document.addEventListener('DOMContentLoaded', function () {
  // Highlight active nav item by file name
  var path = window.location.pathname;
  var current = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  document.querySelectorAll('.navbar a.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    }
  });

  // Bootstrap validation styling
  var forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Booking form handler
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      if (!bookingForm.checkValidity()) return; // let validation run
      e.preventDefault();
      var success = document.getElementById('formSuccess');
      if (success) {
        success.classList.remove('d-none');
        success.focus();
      } else {
        alert('Votre demande de réservation a bien été envoyée.');
      }
      bookingForm.reset();
      bookingForm.classList.remove('was-validated');
    });
  }
});
