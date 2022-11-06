const sequelize = require('./database/database.js')
const Autor = require('./database/models/autor');
const Editorial = require('./database/models/editorial');
const Ejemplar = require('./database/models/ejemplar');
const Genero = require('./database/models/genero');
const Libro = require('./database/models/libro');
const Prestamo = require('./database/models/prestamo');
const Usuario = require('./database/models/usuario');
const bcryptjs = require('bcryptjs');







async function create_tables(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await sequelize.sync({force:true});
        console.log('Tables have been crated successfully.');
        
        
        const tables = await sequelize.getQueryInterface().showAllTables()
        console.log("tables: ")
        console.log(tables)

        await Usuario.bulkCreate([
            {nombre: "lala", contrasenia: bcryptjs.hashSync("lala",10) },
            {nombre: "lele", contrasenia: bcryptjs.hashSync("lele",10) },
            {nombre: "lolo", contrasenia: bcryptjs.hashSync("lolo",10) },
            {nombre: "lili", contrasenia: bcryptjs.hashSync("lili",10) },
            {nombre: "lulu", contrasenia: bcryptjs.hashSync("lulu",10) }
        ])

        await Autor.bulkCreate([
            {nombre: "berges"},
            {nombre: "cortesar"},
            {nombre: "sabado"},
            {nombre: "aire"},
            {nombre: "vihoy"},
        ]);

        await Genero.bulkCreate([
            {nombre: "comedia"},
            {nombre: "terror"},
            {nombre: "romance"},
            {nombre: "crimen"},
            {nombre: "sci-fi"},
        ]);

        await Editorial.bulkCreate([
            {nombre: "alfa"},
            {nombre: "beta"},
            {nombre: "gama"},
            {nombre: "epsilon"},
            {nombre: "omega"},
        ]);

        await Libro.bulkCreate( 
            [{
                isbn: 1,
                titulo: "All the Vermeers in New York",
                id_autor: 4,
                id_genero: 5,
                id_editorial: 3,
                sinopsis: "in quis justo maecenas rhoncus aliquam lacus morbi",
                imagen_portada: "sodales",
                anio: 1992
              }, {
                isbn: 2,
                titulo: "Beijing Taxi",
                id_autor: 3,
                id_genero: 1,
                id_editorial: 2,
                sinopsis: "condimentum id luctus nec molestie sed justo",
                imagen_portada: "urna",
                anio: 1990
              }, {
                isbn: 3,
                titulo: "American Gun",
                id_autor: 4,
                id_genero: 1,
                id_editorial: 3,
                sinopsis: null,
                imagen_portada: "aliquam",
                anio: 2003
              }, {
                isbn: 4,
                titulo: "Bastards, The (Los bastardos)",
                id_autor: 3,
                id_genero: 4,
                id_editorial: 5,
                sinopsis: "magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum",
                imagen_portada: "ut",
                anio: 2009
              }, {
                isbn: 5,
                titulo: "Electrick Children",
                id_autor: 1,
                id_genero: 3,
                id_editorial: 3,
                sinopsis: "lacinia nisi venenatis tristique",
                imagen_portada: "vestibulum",
                anio: 1998
              }, {
                isbn: 6,
                titulo: "Beowulf",
                id_autor: 4,
                id_genero: 4,
                id_editorial: 4,
                sinopsis: "odio cras mi pede malesuada in imperdiet et commodo",
                imagen_portada: "diam",
                anio: 1994
              }, {
                isbn: 7,
                titulo: "Time of the Gypsies (Dom za vesanje)",
                id_autor: 5,
                id_genero: 1,
                id_editorial: 1,
                sinopsis: "semper rutrum nulla nunc purus phasellus in felis",
                imagen_portada: "odio",
                anio: 2003
              }, {
                isbn: 8,
                titulo: "360",
                id_autor: 5,
                id_genero: 3,
                id_editorial: 3,
                sinopsis: "donec ut dolor morbi vel lectus in quam fringilla rhoncus",
                imagen_portada: "porta",
                anio: 1985
              }, {
                isbn: 9,
                titulo: "Billy the Kid vs. Dracula",
                id_autor: 4,
                id_genero: 1,
                id_editorial: 5,
                sinopsis: "vitae nisi nam ultrices",
                imagen_portada: "congue",
                anio: 2010
              }, {
                isbn: 10,
                titulo: "Love Loves Coincidences",
                id_autor: 5,
                id_genero: 1,
                id_editorial: 2,
                sinopsis: "diam neque vestibulum eget vulputate ut ultrices vel augue",
                imagen_portada: "sapien",
                anio: 1995
              }, {
                isbn: 11,
                titulo: "Lord Jim",
                id_autor: 5,
                id_genero: 1,
                id_editorial: 2,
                sinopsis: "viverra dapibus nulla suscipit ligula",
                imagen_portada: "ut",
                anio: 2005
              }, {
                isbn: 12,
                titulo: "Haider",
                id_autor: 4,
                id_genero: 4,
                id_editorial: 3,
                sinopsis: "congue elementum in hac habitasse",
                imagen_portada: "ut",
                anio: 1996
              }, {
                isbn: 13,
                titulo: "Severance",
                id_autor: 5,
                id_genero: 2,
                id_editorial: 4,
                sinopsis: null,
                imagen_portada: "duis",
                anio: 2000
              }, {
                isbn: 14,
                titulo: "Long Ride Home, The",
                id_autor: 1,
                id_genero: 5,
                id_editorial: 1,
                sinopsis: "scelerisque quam turpis adipiscing lorem",
                imagen_portada: "rhoncus",
                anio: 1991
              }, {
                isbn: 15,
                titulo: "Hard Corps, The",
                id_autor: 4,
                id_genero: 5,
                id_editorial: 5,
                sinopsis: "magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet",
                imagen_portada: "sit",
                anio: 1991
              }, {
                isbn: 16,
                titulo: "Hot Rock, The",
                id_autor: 2,
                id_genero: 2,
                id_editorial: 2,
                sinopsis: "venenatis non sodales sed tincidunt eu felis fusce",
                imagen_portada: "cras",
                anio: 1985
              }, {
                isbn: 17,
                titulo: "Cleopatra",
                id_autor: 5,
                id_genero: 2,
                id_editorial: 1,
                sinopsis: "blandit lacinia erat vestibulum sed magna at nunc commodo",
                imagen_portada: "in",
                anio: 1992
              }, {
                isbn: 18,
                titulo: "Howards of Virginia, The",
                id_autor: 5,
                id_genero: 5,
                id_editorial: 1,
                sinopsis: "id sapien in",
                imagen_portada: "sapien",
                anio: 1995
              }, {
                isbn: 19,
                titulo: "Oil, the Baby and the Transylvanians, The (Pruncul, petrolul si Ardelenii)",
                id_autor: 3,
                id_genero: 2,
                id_editorial: 1,
                sinopsis: "potenti in eleifend quam a odio in hac habitasse platea",
                imagen_portada: "orci",
                anio: 2008
              }, {
                isbn: 20,
                titulo: "Pride and the Passion, The",
                id_autor: 2,
                id_genero: 5,
                id_editorial: 4,
                sinopsis: null,
                imagen_portada: "ipsum",
                anio: 1995
              }, {
                isbn: 21,
                titulo: "Midnight (Primeiro Dia, O)",
                id_autor: 4,
                id_genero: 2,
                id_editorial: 3,
                sinopsis: "habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla",
                imagen_portada: "vel",
                anio: 1994
              }, {
                isbn: 22,
                titulo: "Sonatine (Sonachine)",
                id_autor: 3,
                id_genero: 2,
                id_editorial: 3,
                sinopsis: "nulla ut erat id mauris vulputate elementum nullam varius nulla",
                imagen_portada: "ultrices",
                anio: 1997
              }, {
                isbn: 23,
                titulo: "Green Street Hooligans (a.k.a. Hooligans)",
                id_autor: 2,
                id_genero: 5,
                id_editorial: 4,
                sinopsis: "donec dapibus duis at velit eu est",
                imagen_portada: "nunc",
                anio: 2013
              }, {
                isbn: 24,
                titulo: "Madonna's Pig",
                id_autor: 5,
                id_genero: 4,
                id_editorial: 1,
                sinopsis: "fusce posuere felis sed lacus morbi sem",
                imagen_portada: "adipiscing",
                anio: 2010
              }, {
                isbn: 25,
                titulo: "Formula 51",
                id_autor: 5,
                id_genero: 3,
                id_editorial: 1,
                sinopsis: "porttitor lacus at",
                imagen_portada: "orci",
                anio: 1992
              }]
        );

        
        await Ejemplar.bulkCreate([
            {id_usuario: 1, isbn_libro: 1},
            {id_usuario: 1, isbn_libro: 2},
            {id_usuario: 1, isbn_libro: 3},
            {id_usuario: 1, isbn_libro: 4},
            {id_usuario: 1, isbn_libro: 5},

            {id_usuario: 2, isbn_libro: 1},
            {id_usuario: 2, isbn_libro: 7},
            {id_usuario: 2, isbn_libro: 8},
            {id_usuario: 2, isbn_libro: 9},
            {id_usuario: 2, isbn_libro: 10},

            {id_usuario: 3, isbn_libro: 1},
            {id_usuario: 3, isbn_libro: 2},
            {id_usuario: 3, isbn_libro: 13},
            {id_usuario: 3, isbn_libro: 14},
            {id_usuario: 3, isbn_libro: 15},

            {id_usuario: 4, isbn_libro: 16},
            {id_usuario: 4, isbn_libro: 17},
            {id_usuario: 4, isbn_libro: 18},
            {id_usuario: 4, isbn_libro: 19},
            {id_usuario: 4, isbn_libro: 20},

            {id_usuario: 5, isbn_libro: 21},
            {id_usuario: 5, isbn_libro: 22},
            {id_usuario: 5, isbn_libro: 23},
            {id_usuario: 5, isbn_libro: 23},
            {id_usuario: 5, isbn_libro: 23},
        ]);
        
        await Prestamo.bulkCreate(
            [{
                id_ejemplar: 1,
                id_prestatario: 1,
                fecha_inicio: "2022-05-06 20:54:50",
                devuelto: false
              }, {
                id_ejemplar: 2,
                id_prestatario: 4,
                fecha_inicio: "2021-08-31 00:16:26",
                devuelto: false
              }, {
                id_ejemplar: 3,
                id_prestatario: 4,
                fecha_inicio: "2021-02-04 16:28:25",
                devuelto: true
              }, {
                id_ejemplar: 4,
                id_prestatario: 2,
                fecha_inicio: "2021-11-18 07:45:54",
                devuelto: false
              }, {
                id_ejemplar: 5,
                id_prestatario: 3,
                fecha_inicio: "2021-07-16 15:37:20",
                devuelto: false
              }, {
                id_ejemplar: 6,
                id_prestatario: 3,
                fecha_inicio: "2022-03-12 13:10:58",
                devuelto: true
              }, {
                id_ejemplar: 7,
                id_prestatario: 4,
                fecha_inicio: "2021-04-06 16:55:03",
                devuelto: true
              }, {
                id_ejemplar: 8,
                id_prestatario: 3,
                fecha_inicio: "2022-01-17 13:10:49",
                devuelto: false
              }, {
                id_ejemplar: 9,
                id_prestatario: 1,
                fecha_inicio: "2021-02-21 01:55:55",
                devuelto: false
              }, {
                id_ejemplar: 10,
                id_prestatario: 4,
                fecha_inicio: "2021-02-19 08:25:33",
                devuelto: false
              }, {
                id_ejemplar: 11,
                id_prestatario: 5,
                fecha_inicio: "2022-03-31 02:35:36",
                devuelto: false
              }, {
                id_ejemplar: 12,
                id_prestatario: 3,
                fecha_inicio: "2021-08-27 06:21:16",
                devuelto: true
              }, {
                id_ejemplar: 13,
                id_prestatario: 4,
                fecha_inicio: "2021-07-16 03:21:43",
                devuelto: true
              }, {
                id_ejemplar: 14,
                id_prestatario: 4,
                fecha_inicio: "2021-09-24 11:03:08",
                devuelto: false
              }, {
                id_ejemplar: 15,
                id_prestatario: 3,
                fecha_inicio: "2021-08-11 00:04:29",
                devuelto: true
              }]
        );


        console.log("--- Fin exitosamente ---")
        
    } catch (error) {
        console.error('Error:', error);
    }
}

create_tables();

