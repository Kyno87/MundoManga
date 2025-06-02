document.addEventListener('DOMContentLoaded', function() {
  const mailLinks = document.querySelectorAll('.abrir-modal-contacto');
  mailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = new bootstrap.Modal(document.getElementById('contactoModal'));
      modal.show();
    });
  });

  // Mostrar mensaje de enviado
  const form = document.querySelector('#contactoModal form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.querySelectorAll('.modal-body, .modal-footer').forEach(el => el.style.display = 'none');
      document.getElementById('mensaje-enviado').style.display = 'block';
      // Ya no hay setTimeout, el modal se cierra solo si el usuario hace click fuera o en la X
    });
  }

  const contactoModal = document.getElementById('contactoModal');
  contactoModal.addEventListener('hidden.bs.modal', function () {
    form.reset();
    form.querySelectorAll('.modal-body, .modal-footer').forEach(el => el.style.display = '');
    document.getElementById('mensaje-enviado').style.display = 'none';
  });
});