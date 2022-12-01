const Autor = require('../database/models/autor.js')
const Editorial = require('../database/models/editorial.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const path = require('path')


const bookController = {

    // enviar datos de todos los autores para poder filtrar y elegir al momento de crear libro
    getAutores: async function(req, res) {
        const autores = await Autor.findAll({
            attributes: ["nombre"]
        })
        res.json(autores)
    },

    // enviar datos de todos los generos para poder filtrar y elegir al momento de crear libro
    getGeneros: async function(req, res) {
        const generos = await Genero.findAll({
            attributes: ["nombre"]
        })
        res.json(generos)
    },

    // enviar datos de todas los editoriales para poder filtrar y elegir al momento de crear libro
    geteditoriales: async function(req, res) {
        const editoriales = await Editorial.findAll({
            attributes: ["nombre"]
        })
        res.json(editoriales)
    },

    // enviar datos de todos los isbns para poder filtrar y elegir al momento de crear libro
    getIsbns: async function(req, res) {
        const isbns = await Libro.findAll({
            attributes: ["isbn"]
        })
        res.json(isbns)
    },

    getImagen: async function(req, res) {
        const isbn = req.params.isbn
        res.sendFile(isbn+ ".jpg" , {root:path.join(__dirname, '../imagenes_portadas/')})
        
        

    },
}

module.exports= bookController; 