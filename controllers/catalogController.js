const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Prestamo = require('../database/models/prestamo.js')
const Editorial = require('../database/models/editorial.js')


const catalogController = {
    catalog: async function(req, res) {

        // seleccionar solo los libros disponibles, que prestamo sea null
        const books = await Ejemplar.findAll({
            attributes: [],
            include: [
                {
                    model: Prestamo, attributes: []
                },
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
            ],
            where: {"$Prestamo.id_ejemplar$":null}
        });

        res.json(books)

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
}

module.exports= catalogController; 