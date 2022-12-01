var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController.js')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/autores', bookController.getAutores);
router.get('/generos', bookController.getGeneros);
router.get('/editoriales', bookController.geteditoriales);
router.get('/isbns', bookController.getIsbns);
router.get('/imagen/:isbn', bookController.getImagen);


module.exports = router;