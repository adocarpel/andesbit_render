  
  const { constants } = require("./constants")
  const errorHandler = require("./middleware/errorHandler")
  const express = require('express')
  const p = require('path')
  const logger = require('morgan')
  const cookieParser = require("cookie-parser")
  const bodyParser = require("body-parser")
  //RUTAS
  const listRoutes = require("./routes/listRoutes")
  const usersRoutes = require("./routes/userRoutes")

///
  const { isAuthenticated } = require("./middleware/auth")
///


  const app = express()
  app.set('view engine','ejs')
  app.set("views", __dirname + "/views")  
  app.use(cookieParser());
  app.use(express.static(p.join(__dirname, 'public')))

  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())
  require('dotenv').config()
  app.use(express.json())
  
  app.use(logger('dev'));

  //DATABSE
    
  const connectDatabase = require("./data/database")

  // Handling uncaught Exception
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
  });

  // connect db
  if(constants.WEB_PRESENT)
  { 
    connectDatabase();
  }  
  
  app.use("/a/lista", listRoutes); //a/pewelre
  app.use("/a/ingreso", usersRoutes); //a/wefirag



  const port = 3000


  const sajira= (b,g)=>{     
    g.status(200).render('acerca_de')
  }
  //
  app.get('/',(b,g)=>{g.render('ini')})
   
  app.get('/panel', isAuthenticated, (b,g)=>{
    console.log(b.user)
    const user=b.user
    g.render('panel',{data:user})
  })
  /////
  app.use(errorHandler);//?CONECTA CON EXPRESS?
  /////
  app.listen(port,()=>{console.log(`Servidor en la url http://127.0.0.1:${port}/`)})
