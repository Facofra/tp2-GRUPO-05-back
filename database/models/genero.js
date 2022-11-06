const {DataTypes} = require('sequelize');
const sequelize = require('../database.js');
const Libro = require('./libro.js');


const Genero = sequelize.define('Genero', 
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
        tableName: "Generos",
        timestamps: false
    }
    
);

Genero.hasMany(Libro,{
    foreignKey: 'id_genero',
    sourceKey: 'id'
});

Libro.belongsTo(Genero,{
    foreignKey: 'id_genero',
    targetKey: 'id'
});

module.exports = Genero