
// Este script permite copiar un enlace al portapapeles para compartir un producto específico.
 
 function copiarLink(id) {
    const url = window.location.origin + '/#producto-' + id;
    navigator.clipboard.writeText(url);
    alert('¡Enlace copiado al portapapeles!');
  }
