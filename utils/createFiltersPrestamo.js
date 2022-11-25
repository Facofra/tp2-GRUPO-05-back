const { Op } = require("sequelize");


function createFiltersPrestamo(query){
    let autor = query.autor
    let genero = query.genero
    let editorial = query.editorial
    let titulo = query.titulo
    let isbn = query.isbn

    let filters =[]

    // Checkear que isbn sea numero , aunque venga en string
    const regIsNumber = /^\d+$/
    if ( !regIsNumber.test(isbn) && typeof(isbn) != 'undefined' && isbn!="") {
        throw new TypeError('isbn debe ser numérico')
    } 

    isbn = Number(isbn)

    isbn && filters.push({'$Ejemplar.Libro.isbn$': isbn }) 
    autor && filters.push({'$Ejemplar.Libro.Autor.nombre$': {[Op.iLike] :`%${autor}%`} })
    genero && filters.push({'$Ejemplar.Libro.Genero.nombre$': {[Op.iLike] :`%${genero}%`} }) 
    editorial && filters.push({'$Ejemplar.Libro.Editorial.nombre$': {[Op.iLike] :`%${editorial}%`} })
    titulo && filters.push({'$Ejemplar.Libro.titulo$': {[Op.iLike] :`%${titulo}%`} })

    return filters

}

module.exports = createFiltersPrestamo;