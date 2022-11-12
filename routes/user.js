var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', userController.userHome);
router.get('/mis_prestamos', authMiddleware ,userController.getPrestamos);
router.post('/crear_libro',authMiddleware ,userController.crearLibro);
router.post('/login', userController.login);

module.exports = router;