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
const createFilters = require('../utils/createFilters.js')
const createFiltersPrestamo = require('../utils/createFiltersPrestamo.js')



const userController = {

    getMisLibros: async function(req, res) {
        let userId = req.usuario.id;

        let filters;
        try {
            filters = createFilters(req.query)
        } catch (error) {
            return res.status(400).json({error:error.message})
        }
        filters.push({id_usuario : userId})
        
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
            where: {[Op.and]: filters},
            order: [
                [Sequelize.col('Libro.Autor.nombre')],
                [Sequelize.col('Libro.titulo')]
            ],
        });
        res.json(mis_libros)
    },

    getPrestamos: async function(req, res) {

        let userId = req.usuario.id;

        let filters;
        try {
            filters = createFiltersPrestamo(req.query)
        } catch (error) {
            return res.status(400).json({error:error.message})
        }
        filters.push({id_prestatario : userId})
        // filters.unshift({id_prestatario : userId})

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
            where: {[Op.and]: filters},
            // where: {id_prestatario : userId},
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
            return res.status(400).json({error: "se debe enviar nombre y contraseña"})
        }

        
        let usuario = await Usuario.findOne({
            where: {
                nombre: req.body.nombre
            }
        });

        if (! usuario) {
            return res.status(400).json({error:'Usuario y/o contraseña no coinciden'})
        };


        // comparar contraseña ingresada con la guardada en la base de datos
        if(bcryptjs.compareSync(req.body.contrasenia, usuario.contrasenia)){

            // crear y enviar el JWT con el usuario conectado, sin su contraseña
            delete usuario.dataValues.contrasenia

            let token = jwt.sign({ usuario }, process.env.TOKEN_SECRET, {expiresIn: "10h"});

            res.json({token})
        }
        else{
            return res.status(400).json({error:'Usuario y/o contraseña no coinciden'})
        }

        
    },

    crearLibro: async function(req, res) {

        // comprobar que vengan el body completo
        if (!(req.body.isbn && req.body.titulo && req.body.autor && req.body.genero && req.body.editorial && req.body.anio && req.file)) {
            return res.status(400).json({error: "campos incompletos"})
        }

        let userId = req.usuario.id;

        let libro_existente;
        
        // buscar si ya existe el libro con su isbn
        try {
            libro_existente = await Libro.findOne({where: {isbn:req.body.isbn}})
        } catch (error) {
            return res.status(409).json(error) 
        }
        

        // crear entidad libro si no existe
        if (!libro_existente) {
            //-------------- buscar si autor existe ------------------------------------------
            let autor_existente;
            try {
                autor_existente = await Autor.findOne({where: {nombre:req.body.autor}})
            } catch (error) {
                return res.status(409).json(error) 
            }

            if (!autor_existente) {
                let autor = {
                    nombre:req.body.autor
                }

                try {
                    autor_existente = await Autor.create(autor);
                    console.log("Entidad autor creada: " + autor_existente);
                } catch (error) {
                return res.status(409).json(error) 
                }
            }
            // --------------------- fin buscar autor ------------------------------------------

            //-------------- buscar si genero existe ------------------------------------------
            let genero_existente;
            try {
                genero_existente = await Genero.findOne({where: {nombre:req.body.genero}})
            } catch (error) {
                return res.status(409).json(error) 
            }

            if (!genero_existente) {
                return res.status(409).json({error:"genero no existe"})  
            }
            // --------------------- fin buscar genero ------------------------------------------

            //-------------- buscar si editorial existe ------------------------------------------
            let editorial_existente;
            try {
                editorial_existente = await Editorial.findOne({where: {nombre:req.body.editorial}})
            } catch (error) {
                return res.status(409).json(error) 
            }

            if (!editorial_existente) {
                let editorial = {
                    nombre:req.body.editorial
                }

                try {
                    editorial_existente = await Editorial.create(editorial);
                    console.log("Entidad editorial creada: " + editorial_existente);
                } catch (error) {
                return res.status(409).json(error) 
                }
            }
            // --------------------- fin buscar editorial ------------------------------------------





            let libro = {
                isbn: req.body.isbn,
                titulo: req.body.titulo,
                id_autor: autor_existente.id,
                id_genero : genero_existente.id,
                id_editorial: editorial_existente.id,
                sinopsis: req.body.sinopsis,
                imagen_portada: req.file ? req.file.filename : null,
                anio: req.body.anio
            }
    
            try {
                let result = await Libro.create(libro);
                console.log("Entidad libro creada: " + result);
            } catch (error) {
               return res.status(409).json(error) 
            }

        }












        //crear entidad ejemplar
        let ejemplar
        try {
            ejemplar = await Ejemplar.create(
                {
                    id_usuario: userId,
                    isbn_libro: req.body.isbn
                }
            )
            
            return res.json()
        } catch (error) {
            return res.status(409).json(error) 
        }

        
    },
    
    borrarLibro: async function(req, res) {
        let ejemplarId = req.params.id_ejemplar;
        let id_usuario = req.usuario.id;
        
        let row
        try {
            row = await Ejemplar.findOne({
                where: {
                        [Op.and]: [
                            { id : ejemplarId},
                            { id_usuario }
                        ]
                }
            });
        } catch (error) {
            return res.status(400).json({error: "el id_ejemplar debe ser numerico"})
        }
    
        if (row) {
            await row.destroy(); // elimina la row
            res.status(200).json("ejemplar " + ejemplarId + " eliminado")
    
        } else {
            res.status(422).json("ejemplar inexistente")
        }
    },
    
    editarLibro: async function(req, res) {

        // comprobar que vengan el body completo
        if (!(req.body.isbn && req.body.titulo && req.body.autor && req.body.genero && req.body.editorial && req.body.anio)) {
            return res.status(400).json({error: "campos incompletos"})
        }

        let libro_existente;
        try {
            libro_existente = await Libro.findByPk(req.params.isbn_libro);
        } catch (error) {
            return res.status(409).json("isbn no es numerico") 
        }
        
        if (!libro_existente) {
            return res.status(409).json("Libro no existe") 
        }
        
        
        //-------------- buscar si autor existe ------------------------------------------
        let autor_existente;
        try {
            autor_existente = await Autor.findOne({where: {nombre:req.body.autor}})
        } catch (error) {
            return res.status(409).json(error) 
        }

        if (!autor_existente) {
            let autor = {
                nombre:req.body.autor
            }

            try {
                autor_existente = await Autor.create(autor);
                console.log("Entidad autor creada: " + autor_existente);
            } catch (error) {
            return res.status(409).json(error) 
            }
        }
        // --------------------- fin buscar autor ------------------------------------------

        //-------------- buscar si genero existe ------------------------------------------
        let genero_existente;
        try {
            genero_existente = await Genero.findOne({where: {nombre:req.body.genero}})
        } catch (error) {
            return res.status(409).json(error) 
        }

        if (!genero_existente) {
            return res.status(409).json({error:"genero no existe"})  
        }
        // --------------------- fin buscar genero ------------------------------------------

        //-------------- buscar si editorial existe ------------------------------------------
        let editorial_existente;
        try {
            editorial_existente = await Editorial.findOne({where: {nombre:req.body.editorial}})
        } catch (error) {
            return res.status(409).json(error) 
        }

        if (!editorial_existente) {
            let editorial = {
                nombre:req.body.editorial
            }

            try {
                editorial_existente = await Editorial.create(editorial);
                console.log("Entidad editorial creada: " + editorial_existente);
            } catch (error) {
            return res.status(409).json(error) 
            }
        }
        // --------------------- fin buscar editorial ------------------------------------------


        
        // modifico
        const bookUpdated = await Libro.update(
            {
                isbn: req.body.isbn,
                titulo: req.body.titulo,
                id_autor: autor_existente.id,
                id_genero : genero_existente.id,
                id_editorial: editorial_existente.id,
                sinopsis: req.body.sinopsis,
                imagen_portada: req.file ? req.file.filename : libro_existente.imagen_portada,
                anio: req.body.anio
            },
            {
                where: { isbn : req.body.isbn },
                returning:true
            },
        );
        return res.status(200).json(bookUpdated[1])


    

        





        
    },
    
}

module.exports= userController;