const { where } = require('sequelize')
const Autor = require('../database/models/autor.js')
const Editorial = require('../database/models/editorial.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Prestamo = require('../database/models/prestamo.js')
const Usuario = require('../database/models/usuario.js')


const userController = {
    userHome: async function(req, res) {
        //TODO
        res.send('user home funcionando');
    },

    getMisLibros: async function(req, res) {
        let userId = 1 // obtener id del usuario en sesion, esto es placeholder
        
        // obtener todos mis libros
        const mis_libros = await Ejemplar.findAll({
            attributes: [],
            include: [
                {
                    model: Libro, required: true, attributes: ["titulo"],
                },
                {
                    model: Prestamo, required: false, attributes: ["fecha_inicio"],
                    include: [
                        {
                            model: Usuario, required: true, attributes: ["nombre"],
                        }
                    ],
                },
            ],
            where: {id_usuario : userId}
        });
        res.json(mis_libros)
    },

    getDetallesLibro: async function(req, res) {

        let ejemplarId = 1 // obtener id del ejemplar en sesion, esto es placeholder

        // mostrar detalles de libro y poder devolverlo o pedirlo 
        const detalles_libro = await Ejemplar.findAll({
            attributes: [],
             include: [
                {
                    model: Libro, required: true, attributes: ["titulo", "sinopsis", "imagen_portada", "anio"],
                    include: [
                        {
                            model: Autor, required: true, attributes: ["nombre"],
                        },
                        {
                            model: Genero, required: true, attributes: ["nombre"],
                        },
                        {
                            model: Editorial, required: true, attributes: ["nombre"],
                        },
                    ]
                }
            ], 
            where: {id : ejemplarId}
        });

        res.json(detalles_libro)
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

}

module.exports= userController;