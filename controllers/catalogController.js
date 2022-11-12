const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Prestamo = require('../database/models/prestamo.js')


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
}

module.exports= catalogController; 