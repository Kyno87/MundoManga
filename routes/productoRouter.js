const express = require('express');
const router = express.Router();
const multer = require('multer');//Requerir Multer

const productosController = require('../controllers/productosController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// router.get('/', (req, res) => {
//     res.render('inicio');
// });

router.get('/', productosController.list);

router.get("/create", productosController.create);
router.post("/create", upload.single('imagen'), productosController.stock);

router.get("/edit/:id", productosController.edit);
router.put("/edit/:id", upload.single('imagen'), productosController.update);

router.get("/delete/:id", productosController.delete);
router.post("/delete/:id", upload.single('imagen'), productosController.destroy);

// Sumar stock a un producto
router.get('/sumar-stock/:id', productosController.sumarStock);
router.post('/sumar-stock/:id', productosController.sumarStock);

module.exports = router;
