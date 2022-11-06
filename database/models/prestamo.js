const {DataTypes} = require('sequelize');
const sequelize = require('../database.js')
const Ejemplar = require('./ejemplar.js')
const Usuario = require('./usuario.js')

const Prestamo = sequelize.define('Prestamo', 
    // columnas
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_ejemplar: {
            type: DataTypes.INTEGER,
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
        devuelto: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, 

    // opciones
    {
        tableName: "Prestamos",
        timestamps: false
    }
    
);

Ejemplar.hasMany(Prestamo,{
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