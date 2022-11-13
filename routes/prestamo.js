var express = require('express');
var router = express.Router();
const prestamoController = require('../controllers/prestamoController.js')
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/pedir/:id_ejemplar', authMiddleware, prestamoController.pedir);
router.delete('/devolver/:id_ejemplar', authMiddleware, prestamoController.devolver);


module.exports = router;