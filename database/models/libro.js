const {DataTypes} = require('sequelize');
const sequelize = require('../database.js')

const Libro = sequelize.define('Libro', 
    // columnas
    {
        isbn:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_autor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_genero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_editorial: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sinopsis: {
            type: DataTypes.STRING
        },
        imagen_portada: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anio: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, 

    // opciones
    {
        tableName: "Libros",
        timestamps: false
    }
    
);




module.exports = Libro