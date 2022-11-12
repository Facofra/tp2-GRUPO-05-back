const {DataTypes} = require('sequelize');
const sequelize = require('../database.js')

const Usuario = sequelize.define('Usuario', 
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
            allowNull: false,
            unique: true
        },
        contrasenia: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, 

    // opciones
    {
        tableName: "Usuarios",
        timestamps: false
    }
    
);


module.exports = Usuario