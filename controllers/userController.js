const Autor = require('../database/models/autor.js')
const Ejemplar = require('../database/models/ejemplar.js')
const Genero = require('../database/models/genero.js')
const Libro = require('../database/models/libro.js')
const Prestamo = require('../database/models/prestamo.js')
const Usuario = require('../database/models/usuario.js')

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userController = {
    userHome: async function(req, res) {
        //TODO
        res.send('user home funcionando');
    },

    getPrestamos: async function(req, res) {

        let userId = req.usuario.id;

        // obtener todos los libros que me prestaron
        const libros_prestados = await Prestamo.findAll({
            attributes: ["fecha_inicio"],
            include: [
                {
                    model: Ejemplar, required: true, attributes: ["isbn_libro"],
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
                            ]
                        }
                    ]
                }
            ],
            where: {id_prestatario : userId}
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
            return res.json({error: "se debe enviar nombre y contraseña"})
        }

        
        let usuario = await Usuario.findOne({
            where: {
                nombre: req.body.nombre
            }
        });

        if (! usuario) {
            return res.json({error:'Usuario y/o contraseña no coinciden'})
        };


        // comparar contraseña ingresada con la guardada en la base de datos
        if(bcryptjs.compareSync(req.body.contrasenia, usuario.contrasenia)){

            // crear y enviar el JWT con el usuario conectado, sin su contraseña
            delete usuario.dataValues.contrasenia

            let token = jwt.sign({ usuario }, process.env.TOKEN_SECRET, {expiresIn: "1h"});

            res.json({token})
        }
        else{
            return res.json({error:'Usuario y/o contraseña no coinciden'})
        }

        
    },

}

module.exports= userController;