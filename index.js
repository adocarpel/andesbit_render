
//CÓDIGO MÍNIMO PARA POSIBLES POST, PLANTILLAS EJS Y ARCHIVO DE CONTANTES DOTENV:

const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000
const app = express()
require('dotenv').config()
//DATABSE
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

//settings
app.use(express.static(__dirname + "/public"));  //PARA CSS
app.use(bodyParser.urlencoded({extended:false})) //NECESARIOOOO
app.use(bodyParser.json());    

app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')

//BASDAT
////const {connectDB}=require('./db')
const {User} = require('./models/User')


app.get('/',(req,res)=>res.render('main',{title:'Andesbit'}))
///app.get('/table',index)
///*
app.get('/table',async(req,res)=>{
    const u = await User.find()  
    
    res.render('table',{data:u})
/*
    const article = new User({
      name: 'Awesome Post!'      
    });

    // Insert the article in our MongoDB database
    await article.save();
*/
})
//*/
//starting server
app.listen(port, () => {  
    console.log(`Servidor en la url http://127.0.0.1:${port}/`)
})
