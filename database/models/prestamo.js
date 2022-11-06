const {DataTypes} = require('sequelize');
const sequelize = require('../database.js')
const Ejemplar = require('./ejemplar.js')
const Usuario = require('./usuario.js')

const Prestamo = sequelize.define('Prestamo', 
    // columnas
    {
        id_ejemplar: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_prestatario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, 

    // opciones
    {
        tableName: "Prestamos",
        timestamps: false
    }
    
);

Ejemplar.hasOne(Prestamo,{
    foreignKey: 'id_ejemplar',
    sourceKey: 'id'
});

Usuario.hasMany(Prestamo,{
    foreignKey: 'id_prestatario',
    sourceKey: 'id'
});

Prestamo.belongsTo(Ejemplar,{
    foreignKey: 'id_ejemplar',
    targetKey: 'id'
});

Prestamo.belongsTo(Usuario,{
    foreignKey: 'id_prestatario',
    targetKey: 'id'
});




module.exports = Prestamo