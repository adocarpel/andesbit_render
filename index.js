
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

//routes
app.get('/',(req,res)=>res.render('main',{title:'Andesbit'}))

//starting server
app.listen(port, () => {  
    console.log(`Servidor en la url http://127.0.0.1:${port}/`)
})
