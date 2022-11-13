require('dotenv').config()
    
const {Client} = require('pg')
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB,
});
  
client.connect();


client.query(`CREATE DATABASE "${process.env.DB_NAME}"`, (err, res) => {
    console.log("\nCreando base de datos, por favor espere...\n");
    if (err) {
        console.log(err.message);
    }else{
        console.log(`DATABASE ${process.env.DB_NAME} creada con exito`);
    }
    client.end();
});

