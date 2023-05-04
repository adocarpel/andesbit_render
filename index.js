
//CÓDIGO MÍNIMO PARA POSIBLES POST, PLANTILLAS EJS Y ARCHIVO DE CONTANTES DOTENV:

const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000
const app = express()
require('dotenv').config()

//settings
app.use(express.static(__dirname + "/public"));  //PARA CSS
app.use(bodyParser.urlencoded({extended:false})) //NECESARIOOOO
app.use(bodyParser.json());    

app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')

//BASDAT
const { Pool, Client } = require('pg');
const pg = require('pg');



const getClient = async () => {
  const client = new Client({
    host: 'postgres://andes_dat_user:2VeIhbQRFt5yLDG44ylpQX1rsgwpyBfs@dpg-ch9tk9m4dad8g1jfej0g-a.oregon-postgres.render.com/andes_dat',
    user: 'andes_dat_user',
    database: 'andes_dat',
    password: '2VeIhbQRFt5yLDG44ylpQX1rsgwpyBfs',
    port: 5432
  });
  await client.connect();
  return client;
};
const PG_HOST = process.env.PG_HOST
const PG_USER = process.env.PG_USER
const PG_DATABASE = process.env.PG_DATABASE
const PG_PASS = process.env.PG_PASS
const PG_PORT= process.env.PG_PORT

const config_db = {
    host: PG_HOST,
    user: PG_USER,
    database: PG_DATABASE,
    password: PG_PASS,
    port:PG_PORT
};

//routes
app.get('/',(req,res)=>res.render('main',{title:'Andesbit'}))

app.get('/add_table',async(req,res)=>{
    console.log("asdf");

  const client = await getClient();
  let createTableQuery = `
    CREATE TABLE IF NOT EXISTS main_table(
      id BIGSERIAL PRIMARY KEY NOT NULL ,
      title TEXT NOT NULL, 
      class TEXT, 
      content TEXT, 
      date TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
  `;
  const result = await client.query(createTableQuery);
  console.log(`Created table.`);
  await client.end();
/*
    const pool = new pg.Pool(config_db)
    const client = new pg.Client(connect);
    // connection using created pool

    pool.connect(function(err, client, done) {
        //client.query('SELECT * FROM example_table')
        //res.render('index')
        client.query('CREATE TABLE data(id INT PRIMARY, title TEXT NOT NULL, class TEXT, content TEXT, date DATE);')

        done()
    })
    pool.end()
*/
    /*
    "CREATE TABLE COMPANY(
       ID INT PRIMARY KEY     NOT NULL,
       NAME           TEXT    NOT NULL,
       AGE            INT     NOT NULL,
       ADDRESS        CHAR(50),
       SALARY         REAL
    );"
    */
}
)

//starting server
app.listen(port, () => {  
    console.log(`Servidor en la url http://127.0.0.1:${port}/`)
})
