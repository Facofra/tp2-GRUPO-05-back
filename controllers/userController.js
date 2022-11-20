const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Prestamo = require('../database/models/prestamo.js')
const Usuario = require('../database/models/usuario.js')
const Editorial = require('../database/models/editorial.js')
const { Sequelize,Op } = require("sequelize");

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userController = {

    getMisLibros: async function(req, res) {
        let userId = req.usuario.id;
        
        // obtener todos mis libros
        const mis_libros = await Ejemplar.findAll({
            attributes: ["id"],
            include: [
                {
                    model: Libro, required: true, attributes: ["isbn","titulo", "imagen_portada"],
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
                },
                {
                    model: Prestamo, required: false, attributes: ["fecha_inicio"],
                    include: [
                        {
                            model: Usuario, required: true, attributes: ["nombre"],
                        }
                    ],
                },
            ],
            where: {id_usuario : userId},
            order: [
                [Sequelize.col('Libro.Autor.nombre')],
                [Sequelize.col('Libro.titulo')]
            ],
        });
        res.json(mis_libros)
    },

    getPrestamos: async function(req, res) {

        let userId = req.usuario.id;

        // obtener todos los libros que me prestaron
        const libros_prestados = await Prestamo.findAll({
            attributes: ["fecha_inicio"],
            include: [
                {
                    model: Ejemplar, required: true, attributes: ["id","isbn_libro"],
                    include:[
                        { 
                            model: Libro, required: true,  attributes: ["titulo","imagen_portada"],
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
                    ]
                }
            ],
            where: {id_prestatario : userId},
            order: [
                [Sequelize.col('Ejemplar.Libro.Autor.nombre')],
                [Sequelize.col('Ejemplar.Libro.titulo')]
            ],
        });
        
        res.json(libros_prestados)


    },

    login: async function(req, res) {

        let user;

        // validar que haya llegado el body con nombre y contraseña
        if (req.body.nombre && req.body.contrasenia) {
            user = {
                nombre: req.body.nombre,
                contrasenia: req.body.contrasenia
            }
            
        } else{
            return res.status(402).json({error: "se debe enviar nombre y contraseña"})
        }

        
        let usuario = await Usuario.findOne({
            where: {
                nombre: req.body.nombre
            }
        });

        if (! usuario) {
            return res.status(402).json({error:'Usuario y/o contraseña no coinciden'})
        };


        // comparar contraseña ingresada con la guardada en la base de datos
        if(bcryptjs.compareSync(req.body.contrasenia, usuario.contrasenia)){

            // crear y enviar el JWT con el usuario conectado, sin su contraseña
            delete usuario.dataValues.contrasenia

            let token = jwt.sign({ usuario }, process.env.TOKEN_SECRET, {expiresIn: "1h"});

            res.json({token})
        }
        else{
            return res.status(402).json({error:'Usuario y/o contraseña no coinciden'})
        }

        
    },

    crearLibro: async function(req, res) {


        // comprobar que vengan el body completo
        if (!(req.body.isbn && req.body.titulo && req.body.id_autor && req.body.id_genero && req.body.id_editorial && req.body.imagen_portada && req.body.anio)) {
            return res.status(402).json({error: "campos incompletos"})
        }

        let userId = req.usuario.id;

        let libro_existente;
        
        // buscar si ya existe el libro con su isbn
        try {
            libro_existente = await Libro.findOne({where: {isbn:req.body.isbn}})
        } catch (error) {
            return res.status(402).json(error) 
        }

        // crear entidad libro si no existe
        if (!libro_existente) {
            let libro = {
                isbn: req.body.isbn,
                titulo: req.body.titulo,
                id_autor: req.body.id_autor,
                id_genero : req.body.id_genero,
                id_editorial: req.body.id_editorial,
                sinopsis: req.body.sinopsis,
                imagen_portada: req.body.imagen_portada,
                anio: req.body.anio
            }
    
            try {
                let result = await Libro.create(libro);
                console.log("Entidad libro creada: " + result);
            } catch (error) {
               return res.status(402).json(error) 
            }

        }

        //crear entidad ejemplar
        try {
            const ejemplar = await Ejemplar.create(
                {
                    id_usuario: userId,
                    isbn_libro: req.body.isbn
                }
            )
            
            return res.json()
        } catch (error) {
            return res.status(402).json(error) 
        }

        
    },
    
    borrarLibro: async function(req, res) {
        let ejemplarId = req.params.id_ejemplar;
        let id_usuario = req.usuario.id;
        
        const row = await Ejemplar.findOne({
            where: {
                    [Op.and]: [
                        { id : ejemplarId},
                        { id_usuario }
                    ]
                }
        });
    
        if (row) {
            await row.destroy(); // elimina la row
            res.status(200).json("ejemplar " + ejemplarId + " eliminado")
    
        } else {
            res.status(422).json("ejemplar inexistente")
        }
    },
    
    // editar un libro que es mio
    editarLibro: async function(req, res) {
        let isbn_libro = req.params.isbn_libro;
        let id_usuario = req.usuario.id;

        // verifico que el usuario tenga ese libro
        let ejemplar_existente
        try {
                ejemplar_existente = await Ejemplar.findOne({
                where: {
                    [Op.and]: [
                        { isbn_libro : isbn_libro },
                        { id_usuario }
                    ]
                }
            });
        }
        catch (error) {
            return res.status(402).json({error : "isbn debe ser numerico"}) 
        }
        if(!ejemplar_existente) { return res.status(409).json({error : "isbn inexistente"}) }

        // modifico
        const bookUpdated = await Libro.update(
            {
                isbn: isbn_libro,   
                titulo: req.body.titulo,   
                id_autor: req.body.id_autor,
                id_genero: req.body.id_genero,
                id_editorial: req.body.id_editorial,
                sinopsis: req.body.sinopsis,
                imagen_portada: req.body.imagen_portada,
                anio: req.body.anio
            },
            {
                where: { isbn : isbn_libro },
                returning:true
            },
        );
        return res.status(200).json(bookUpdated[1])

    }
}

module.exports= userController;