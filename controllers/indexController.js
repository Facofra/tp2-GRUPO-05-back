const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Editorial = require('../database/models/editorial.js')
const { Sequelize,Op } = require("sequelize");


const indexController = {
    index: async function(req, res) {
        let autor = req.query.autor
        let genero = req.query.genero
        let editorial = req.query.editorial
        let titulo = req.query.titulo
        let isbn = req.query.isbn

        let filters =[]

        // HAY QUE VALIDAR QUE ISBN SEA NUMÉRICO, PERO NO NOS SALE PORQUE UNDEFINED, NAN, STRING, VACIO, ES JODIDO 
                        // if ( typeof(isbn) != 'undefined' && isNaN(isbn) ) {
                        //     return res.status(400).json({error: "isbn debe ser numerico"})
                        // } 

                        // isbn = Number(isbn)
        // --------------------------------------------------------------------------------------------------------------

        isbn && filters.push({'$Libro.isbn$': isbn }) 
        autor && filters.push({'$Libro.Autor.nombre$': {[Op.iLike] :`%${autor}%`} })
        genero && filters.push({'$Libro.Genero.nombre$': {[Op.iLike] :`%${genero}%`} }) 
        editorial && filters.push({'$Libro.Editorial.nombre$': {[Op.iLike] :`%${editorial}%`} })
        titulo && filters.push({'$Libro.titulo$': {[Op.iLike] :`%${titulo}%`} })

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