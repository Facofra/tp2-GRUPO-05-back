const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Prestamo = require('../database/models/prestamo.js')


const prestamoController = {
    pedir: async function(req, res) {
        let id_ejemplar = req.params.id_ejemplar


        res.json("endpoint prestamo, id ejemplar: " + id_ejemplar)

    },
}

module.exports= prestamoController; 