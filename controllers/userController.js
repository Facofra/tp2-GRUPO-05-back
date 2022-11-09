const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Prestamo = require('../database/models/prestamo.js')


const userController = {
    userHome: async function(req, res) {
        //TODO
        res.send('user home funcionando');
    },

    getPrestamos: async function(req, res) {

        let userId = 1 // obtener id del usuario en sesion, esto es placeholder

        // obtener todos los libros que me prestaron
        const libros_prestados = await Prestamo.findAll({
            attributes: ["fecha_inicio"],
            include: [
                {
                    model: Ejemplar, required: true, attributes: ["isbn_libro"],
                    include:[
                        { 
                            model: Libro, required: true,  attributes: ["titulo","imagen_portada"],
                            include: [
                                {
                                    model:Genero, required: true, attributes: ["nombre"]
                                },
                                {
                                    model:Autor, required: true, attributes: ["nombre"]
                                },
                            ]
                        }
                    ]
                }
            ],
            where: {id_prestatario : userId}
        });
        
        res.json(libros_prestados)


    },

    crearLibro: async function(req, res) {

        // Por ahora esto solo crea entidad LIBRO, pero lo que queremos es crear la entidad ejemplar, y libro solo si no existe de antemano

        if (!(req.body.isbn && req.body.titulo && req.body.id_autor && req.body.id_genero && req.body.id_editorial && req.body.imagen_portada && req.body.anio)) {
            return res.json({error: "campos incompletos"})
        }

        let libro = {
            isbn: req.body.isbn,
            titulo: req.body.titulo,
            id_autor: req.body.id_autor,
            id_genero : req.body.id_genero,
            id_editorial: req.body.id_editorial,
            sinopsis: req.body.sinopsis,
            imagen_portada: req.body.imagen_portada,
            anio: req.body.anio
        }

        try {
            let result = await Libro.create(libro);
            res.json(result)
        } catch (error) {
           return res.json(error) 
        }
        
    },

}

module.exports= userController;