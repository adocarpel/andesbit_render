  
  const { constants } = require("./constants")
  const errorHandler = require("./middleware/errorHandler")
  const express = require('express')
  const p = require('path')
  const logger = require('morgan')
  const cookieParser = require("cookie-parser")
  const bodyParser = require("body-parser")
  require('dotenv').config()
  const fs = require('fs')

  const listRoutes = require("./routes/listRoutes")
  const usersRoutes = require("./routes/userRoutes")

  const { isAuthenticated } = require("./middleware/auth")

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


  const port = process.env.PORT || 3000


  app.get ('/acerca_de', (req, res)=>
  {
    res.status(200).render('acerca_de')
  })
  
  app.get('/',(req,res)=>{res.render('ini')})
  
  app.get('/chi',(req,res)=>
  {
    let ruta = p.join(__dirname, 'uploads')

    fs.readdir(ruta, function (err, archivos) 
    {      
      if (err) {
        console.log(err);
        //return;
      }
      res.render("show_files", {d:archivos})
      /////console.log(archivos);
    });
     
    

  })


  app.get('/revisar',(req,res)=>{res.render('revisar')})

  app.get('/panel', isAuthenticated, (req,res)=>
  {
    console.log(req.user)
    const user = req.user
    res.render('panel',{data:user})
  })

  
  app.use(errorHandler)
  
  app.listen(port,()=>{console.log(`Servidor en la url http://127.0.0.1:${port}/`)})
