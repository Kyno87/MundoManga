
//IMAGEN DE CREAR NUEVO PRODUCTO:

const inputImagen = document.getElementById('imagen');
const contenedorPrevia = document.getElementById('imagenPreviaCrear');

inputImagen.addEventListener('change', function () {
    const archivo = this.files[0]; // obtiene el primer archivo seleccionado
    
    if (archivo) {
        const reader = new FileReader();
        
        reader.addEventListener('load', function () {
contenedorPrevia.innerHTML = `<img src="${reader.result}" class="imagen-previa-visualizada" alt="Vista previa" style="max-width: 100%; max-height: 200px;">`;
        });
        
        reader.readAsDataURL(archivo); // convierte el archivo en base64
    } else {
        contenedorPrevia.innerHTML = ''; // limpia la vista previa si no hay archivo
    }
});