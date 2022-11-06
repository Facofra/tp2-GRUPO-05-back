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
    console.log(err, res);
    client.end();
});

