var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/login', userController.login);
router.get('/mis_libros', authMiddleware,  userController.getMisLibros);
router.get('/mis_prestamos', authMiddleware ,userController.getPrestamos);
router.post('/crear_libro',authMiddleware ,userController.crearLibro);
router.delete('/borrar_libro/:id_ejemplar',authMiddleware, userController.borrarLibro);
router.put('/editar_libro/:isbn_libro',authMiddleware, userController.editarLibro);

module.exports = router;