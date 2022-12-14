const Prestamo = require('../database/models/prestamo.js');
const { Op } = require("sequelize");

const MaximosPrestamos = 10; // un usuario no puede tener más de 10 libros pedidos

const prestamoController = {
    pedir: async function(req, res) {
        let id_ejemplar = req.params.id_ejemplar;
        let id_usuario = req.usuario.id;

        const prestamos = await Prestamo.findAll({where: {id_prestatario: id_usuario}})
        
        if (prestamos.length >= MaximosPrestamos) {
            return res.status(409).json({error: "Usuario tiene demasiados libros pedidos: " + MaximosPrestamos})
        }
        let libro_prestado
        try {
            libro_prestado = await Prestamo.findOne({where: {id_ejemplar}})
        } catch (error) {
            return res.status(400).json({error: "el id_ejemplar debe ser numerico"})
        }
        
        if (libro_prestado) {
            return res.status(409).json({error: "El libro ya está prestado"})
        }


        await Prestamo.create({
            id_ejemplar,
            id_prestatario: id_usuario,
            fecha_inicio: Date()
        })


        res.json("Prestamo realizado con éxito")

    },

    devolver: async function(req, res) {
        let id_ejemplar = req.params.id_ejemplar;
        let id_usuario = req.usuario.id;
        let libro_prestado
        try {

            libro_prestado = await Prestamo.findOne(
                {
                where: {
                    [Op.and]: [
                        { id_ejemplar},
                        { id_prestatario: id_usuario }
                    ]
                }
            })

        } catch (error) {
            return res.status(400).json({error: "el id debe ser numerico"})
        }
        
        if (! libro_prestado) {
            return res.status(409).json({error: "El libro no fue encontrado"})
        }

        await libro_prestado.destroy();



        res.json("Libro devuelto con éxito")

    },
}

module.exports= prestamoController; 