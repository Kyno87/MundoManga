// Importación de módulos principales de Node y terceros
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); // Permite usar métodos PUT y DELETE en formularios HTML

// Importación de routers de la app
const routerProducto = require('./routes/productoRouter'); // Rutas de productos (JSON)

const session = require('express-session'); // Middleware para manejo de sesiones

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Permite usar métodos HTTP como PUT y DELETE en formularios
app.use(methodOverride('_method'));

// Carpeta pública para archivos estáticos (CSS, imágenes, JS)
app.use(express.static("public"));

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de sesiones en memoria (NO en MySQL)
app.use(session({
  secret: 'tu_secreto', // Cambia este valor por uno seguro en producción
  resave: false,
  saveUninitialized: false
}));

// Hace que la sesión esté disponible en todas las vistas EJS
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Rutas principales de la aplicación
app.use('/', routerProducto);      // Productos y home

app.get('/mangas', (req, res) => {
  res.render('manga'); // Renderiza la vista de mangas
});

// Levanta el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});