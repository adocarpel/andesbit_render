

const express = require('express')
///const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()


//DATABSE
const connectDatabase = require("./db/database");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// connect db
connectDatabase();

//settings
//PROBARapp.use(express.static(__dirname + "/public"));  //PARA CSS
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:false})) //NECESARIOOOO
app.use(bodyParser.json());    

//Routes:
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
app.use("/", indexRouter);
//app.use("/api/auth", authRouter);
app.use("/", userRouter);

app.set('views',path.join(__dirname, 'views'))
app.set('view engine','ejs')


//starting server
app.listen(port, () => {  
    console.log(`Servidor en la url http://127.0.0.1:${port}/`)
})
