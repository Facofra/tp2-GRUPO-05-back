const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')


const indexController = {
    index: async function(req, res) {

        const books = await Ejemplar.findAll({
            attributes: [],
            include: [
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
        });
        
        res.json(books)

    },
}

module.exports= indexController;