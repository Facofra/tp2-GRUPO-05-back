const {DataTypes} = require('sequelize');
const sequelize = require('../database.js');
const Libro = require('./libro.js');


const Editorial = sequelize.define('Editorial', 
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
        tableName: "Editoriales",
        timestamps: false
    }
    
);

Editorial.hasMany(Libro,{
    foreignKey: 'id_editorial',
    sourceKey: 'id'
});

Libro.belongsTo(Editorial,{
    foreignKey: 'id_editorial',
    targetKey: 'id'
});

module.exports = Editorial