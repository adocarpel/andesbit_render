  
  const { constants } = require("./constants")
  const errorHandler = require("./middleware/errorHandler")
  const express = require('express')
  const p = require('path')
  const logger = require('morgan')
  const cookieParser = require("cookie-parser")
  const bodyParser = require("body-parser")
  require('dotenv').config()
  const fs = require('fs')
  const {dataUserAuthenticated} = require('./middleware/auth')
  
  const listRoutes = require("./routes/listRoutes")
  const usersRoutes = require("./routes/userRoutes")
  const publicsRoutes = require("./routes/publicsRoutes")

  const { isAuthenticated } = require("./middleware/auth")

////////////////////////7777
const publications = require('./models/publications')
const path = require("path");
////////////////////////7777

  const app = express()
  app.set('view engine','ejs')
  app.set("views", __dirname + "/views")  
  app.use(cookieParser());
  app.use(express.static(p.join(__dirname, 'public')))
  app.use('/uploads', express.static('uploads'));

  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())  
  app.use(express.json())
  
  app.use(logger('dev'));

    
  const connectDatabase = require("./data/database")


  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
  });

  if(constants.WEB_PRESENT)
  { 
    connectDatabase();
  }  
  
  app.use("/a/lista", listRoutes)

  app.use("/a/usuario", usersRoutes)

  app.use("/publicaciones", publicsRoutes)


  const port = process.env.PORT || 3000


  app.get ('/acerca_de', async(req, res)=>
  {
    let user_decoded = await dataUserAuthenticated(req)    
    let uPresent = true
    if(user_decoded == null) {user_decoded = {name:"____"}; uPresent = false}
    res.status(200).render('acerca_de', {user:user_decoded, uPresent:uPresent})
  })
  
  app.get('/', async(req,res)=>
  {
    let user_decoded = await dataUserAuthenticated(req)    
    let uPresent = true
    if(user_decoded == null) {user_decoded = {name:"____"}; uPresent = false}
    res.render('ini',{user:user_decoded, uPresent:uPresent})
  })
  
  app.get('/chi',(req,res)=>
  {
    let ruta = p.join(__dirname, 'uploads')

    fs.readdir(ruta, async function (err, archivos) 
    {      
      if (err) {
        console.log(err);
        //return;
      }

      let user_decoded = await dataUserAuthenticated(req)    
      let uPresent = true
      if(user_decoded == null) {user_decoded = {name:"____"}; uPresent = false}

      res.render("show_files", {d:archivos, user:user_decoded, uPresent:uPresent})
      /////console.log(archivos);
    });
     
    

  })


  app.get('/panel', isAuthenticated, async(req,res)=>
  {    
    const user = req.user    

    let uPresent = true     
    let pubs = {}
    let completep = '____'
    
    if(user == null) {
      user = {name:"____"}; 
      uPresent = false
    }
    else
    {
   
      pubs = await publications.find({ uidka: user._id })

      const email = user.email
     
      let r1 = email.replace('@','a')
      let re = /\./g
      let r2 = r1.replace(re, 'p');
      completep = path.join(__dirname, './uploads' + '/' + r2)
    }
    
    
    res.render('panel',{user:user, uPresent:uPresent, publications:pubs, pathimgs:completep})
  })

  
  app.use(errorHandler)
  
  app.listen(port,()=>{console.log(`Servidor en la url http://127.0.0.1:${port}/`)})
