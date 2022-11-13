const Autor = require('../database/models/autor.js')
const Editorial = require('../database/models/editorial.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')


const bookController = {

    getAutores: async function(req, res) {
        const autores = await Autor.findAll({
            attributes: ["nombre"]
        })
        res.json(autores)
    },
    getGeneros: async function(req, res) {
        const generos = await Genero.findAll({
            attributes: ["nombre"]
        })
        res.json(generos)
    },
    geteditoriales: async function(req, res) {
        const editoriales = await Editorial.findAll({
            attributes: ["nombre"]
        })
        res.json(editoriales)
    },
    getIsbns: async function(req, res) {
        const isbns = await Libro.findAll({
            attributes: ["isbn"]
        })
        res.json(isbns)
    },
}

module.exports= bookController; 