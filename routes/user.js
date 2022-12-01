var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require('path');
const multer = require("multer");


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
          cb(null, path.resolve(__dirname, '../imagenes_portadas'))
    },
    filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
let upload = multer({
    storage: storage,
 
    // Validate image
    fileFilter: (req, file, cb) => {
       
       const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.PNG'];
 
       const ext = path.extname(file.originalname);
 
       if (!acceptedExtensions.includes(ext)){
             req.file = file;
       }
          
       cb(null, acceptedExtensions.includes(ext));
    }
});


router.post('/login', userController.login);
router.get('/mis_libros', authMiddleware,  userController.getMisLibros);
router.get('/mis_prestamos', authMiddleware ,userController.getPrestamos);
router.post('/crear_libro',authMiddleware , upload.single('imageFile'), userController.crearLibro);
router.delete('/borrar_libro/:id_ejemplar',authMiddleware, userController.borrarLibro);
router.put('/editar_libro/:isbn_libro',authMiddleware, upload.single('imageFile'), userController.editarLibro);

module.exports = router;