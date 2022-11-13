var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController.js')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/autores', authMiddleware, bookController.getAutores);
router.get('/generos', authMiddleware, bookController.getGeneros);
router.get('/editoriales', authMiddleware, bookController.geteditoriales);
router.get('/isbns', authMiddleware, bookController.getIsbns);


module.exports = router;