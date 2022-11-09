var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js')


router.get('/', userController.userHome);
router.get('/mis_prestamos', userController.getPrestamos);
router.get('/mis_libros', userController.getMisLibros);
//router.get('/detalles_libro', userController.getDetallesLibro);



module.exports = router;