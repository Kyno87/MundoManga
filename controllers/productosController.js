const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON de productos
const productosFilePath = path.join(__dirname, '../data/productos.json');
let productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productosController = {
    // Listar productos (home)
    perfil: (req, res) => {
        res.render('usuarios/perfil');
    },
    list: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = 12;
        const q = req.query.q ? req.query.q.trim().toLowerCase() : '';

        // Filtrado por búsqueda
        let productosFiltrados = productos;
        if (q) {
            productosFiltrados = productos.filter(p =>
                p.titulo.toLowerCase().includes(q) ||
                p.editorial.toLowerCase().includes(q)
            );
        }

        const total = productosFiltrados.length;
        const totalPages = Math.ceil(total / perPage);
        const productosPagina = productosFiltrados.slice((page - 1) * perPage, page * perPage);

        res.render('home', {
            productos: productosPagina,
            page,
            totalPages,
            q
        });
    },

    // Formulario de creación
    create: (req, res) => {
        res.render('productos/creacionProd');
    },

    // Guardar nuevo producto
    stock: (req, res) => {
        const { titulo, editorial, precio, stock } = req.body;
        const imagen = req.file ? req.file.filename : null;
        const maxId = productos.length > 0 ? Math.max(...productos.map(p => Number(p.id))) : 0;
        const nuevoProduct = {
            id: maxId + 1,
            titulo,
            editorial,
            precio,
            imagen,
            stock: stock ? Number(stock) : 0
        };
        try {
            productos.push(nuevoProduct);
            fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
            res.redirect("/");
        } catch (err) {
            console.log("Error al guardar el producto");
            console.error(err);
            res.status(500).send("Error de servidor");
        }
    },

    // Sumar stock a un producto existente
    sumarStock: (req, res) => {
        const id = req.params.id;
        const producto = productos.find(prod => prod.id == id);
        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }
        if (req.method === 'POST') {
            const cantidad = Number(req.body.cantidad) || 0;
            producto.stock = (producto.stock || 0) + cantidad;
            try {
                fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
                res.redirect("/");
            } catch (err) {
                console.log("Error al actualizar el stock");
                console.error(err);
                res.status(500).send("Error de servidor");
            }
        } else {
            res.render('productos/sumarStock', { producto });
        }
    },

    // Formulario de edición
    edit: (req, res) => {
        const id = req.params.id;
        const producto = productos.find(prod => prod.id == id);
        res.render('productos/editarProd', { producto });
    },

    // Actualizar producto
    update: (req, res) => {
        console.log('BODY:', req.body);
        console.log('FILE:', req.file);
        const id = req.params.id;
        const { titulo, editorial, precio, stock, imagenActual } = req.body;
        // Si hay archivo nuevo, usarlo; si no, usar la imagen anterior
        const imagen = req.file ? req.file.filename : imagenActual;
        const productoIndex = productos.findIndex(prod => prod.id == id);

        if (productoIndex !== -1) {
            productos[productoIndex] = {
                id: Number(id),
                titulo,
                editorial,
                precio,
                imagen,
                stock: stock ? Number(stock) : 0
            };
            try {
                fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
                res.redirect("/");
            } catch (err) {
                console.log("Error al editar el producto");
                console.error(err);
                res.status(500).send("Error de servidor");
            }
        } else {
            res.status(400).send("Producto no encontrado");
        }
    },

    // Formulario de eliminar producto
    delete: (req, res) => {
        const id = req.params.id;
        const producto = productos.find(prod => prod.id == id);
        res.render('productos/eliminarProd', { producto });
    },

    // Eliminar producto
    destroy: (req, res) => {
        const id = req.params.id;
        const productoIndex = productos.findIndex(prod => prod.id == id);
        if (productoIndex !== -1) {
            productos.splice(productoIndex, 1);
            try {
                fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, 2));
                res.redirect("/");
            } catch (err) {
                console.log("Error al eliminar el producto");
                console.error(err);
                res.status(500).send("Error al eliminar el producto");
            }
        } else {
            res.status(404).send("Producto no encontrado");
        }
    }
};

module.exports = productosController;

