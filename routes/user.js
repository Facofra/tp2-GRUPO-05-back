var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js')


router.get('/', userController.userHome);
router.get('/mis_prestamos', userController.getPrestamos);
router.post('/login', userController.login);

module.exports = router;