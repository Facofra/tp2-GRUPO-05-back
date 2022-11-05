const {DataTypes} = require('sequelize');
const sequelize = require('../database.js')
const Libro = require('../models/libro.js')

const Autor = sequelize.define('Autor', 
    // columnas
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, 

    // opciones
    {
        tableName: "Autores",
        timestamps: false
    }
    
);

Autor.hasMany(Libro,{
    foreignKey: 'id_autor',
    sourceKey: 'id'
});

Libro.belongsTo(Autor,{
    foreignKey: 'id_autor',
    targetKey: 'id'
});


module.exports = Autor