const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Editorial = require('../database/models/editorial.js')
const { Sequelize } = require("sequelize");


const indexController = {
    index: async function(req, res) {

        const books = await Ejemplar.findAll({
            attributes: [],
            include: [
                {
                    model: Libro, as:"Libro" , required: true,  attributes: ["isbn", "titulo","imagen_portada"],
                    include: [
                        {
                            model:Genero, required: true, attributes: ["nombre"]
                        },
                        {
                            model:Autor, required: true, attributes: ["nombre"]
                        },
                        {
                            model:Editorial, required: true, attributes: ["nombre"]
                        },
                    ]
                }
            ],
            order: [
                [Sequelize.col('Libro.Autor.nombre')],
                [Sequelize.col('Libro.titulo')]
            ],
        });
        
        res.json(books)

    },
}

module.exports= indexController;