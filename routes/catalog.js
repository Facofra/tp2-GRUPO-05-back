var express = require('express');
var router = express.Router();
const catalogController = require('../controllers/catalogController.js')
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', authMiddleware, catalogController.catalog);
router.get('/detalles_libro/:id_ejemplar',authMiddleware, catalogController.getDetallesLibro);

module.exports = router;