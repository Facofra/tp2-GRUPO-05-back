const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Prestamo = require('../database/models/prestamo.js')
const Editorial = require('../database/models/editorial.js')
const { Sequelize,Op } = require('sequelize');
const createFilters = require('../utils/createFilters.js')
const Usuario = require('../database/models/usuario.js')



const catalogController = {
    catalog: async function(req, res) {

        let filters;
        try {
            filters = createFilters(req.query)
        } catch (error) {
            return res.status(400).json({error:error.message})
        }

        filters.push({"$Prestamo.id_ejemplar$":null})


        // seleccionar solo los libros disponibles, que prestamo sea null
        const books = await Ejemplar.findAll({
            attributes: ["id"],
            include: [
                {
                    model: Prestamo, attributes: []
                },
                {
                    model: Libro, required: true,  attributes: ["isbn", "titulo","imagen_portada"],
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
            where: {[Op.and]: filters},
            order: [
                [Sequelize.col('Libro.Autor.nombre')],
                [Sequelize.col('Libro.titulo')]
            ],
        });

        res.json(books)

    }, 
    
    getDetallesLibro: async function(req, res) {

        let ejemplarId = req.params.id_ejemplar;

        // mostrar detalles de ejemplar y poder devolverlo o pedirlo 
        let detalles_libro
        try {
            detalles_libro = await Ejemplar.findOne({
                attributes: ["id"],
                include: [
                    {
                        model: Libro, required: true, attributes: ["isbn", "titulo", "sinopsis", "imagen_portada", "anio"],
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
                    },
                    {
                        // si viene con fecha de inicio es porque esta prestado
                        model: Prestamo, required: false, attributes: ["fecha_inicio"], 
                    },
                    {
                        model: Usuario, required: true, attributes: ["nombre"],
                    }
                ], 
                where: {id : ejemplarId}
            });
        } catch (error) {
            return res.status(400).json({error: "el id debe ser numerico"})
        }
        if (!detalles_libro) {
            return res.status(409).json({error: "id " + ejemplarId + " inexistente"})
        }

        res.json(detalles_libro)
    },
}

module.exports= catalogController; 