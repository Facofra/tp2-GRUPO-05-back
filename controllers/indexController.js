const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Editorial = require('../database/models/editorial.js')
const { Sequelize,Op } = require("sequelize");
const createFilters = require('../utils/createFilters.js')


const indexController = {
    index: async function(req, res) {

        
        let filters;
        try {
            filters = createFilters(req.query)
        } catch (error) {
            return res.status(400).json({error:error.message})
        }


        const books = await Ejemplar.findAll({
            attributes: ["id"],
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
            where: {
                [Op.and]: filters
            }
        });
        
        res.json(books)

    },
}

module.exports= indexController;