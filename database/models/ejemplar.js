const {DataTypes} = require('sequelize');
const sequelize = require('../database.js');
const Libro = require('./libro.js');
const Usuario = require('./usuario.js');


const Ejemplar = sequelize.define('Ejemplar', 
    // columnas
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isbn_libro: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, 

    // opciones
    {
        tableName: "Ejemplares",
        timestamps: false
    }
    
);

Usuario.hasMany(Ejemplar,{
    foreignKey: 'id_usuario',
    sourceKey: 'id'
});

Libro.hasMany(Ejemplar,{
    foreignKey: 'isbn_libro'
});

Ejemplar.belongsTo(Usuario,{
    foreignKey: 'id_usuario',
    targetKey: 'id'
});

Ejemplar.belongsTo(Libro,{
    foreignKey: 'isbn_libro'
});




module.exports = Ejemplar