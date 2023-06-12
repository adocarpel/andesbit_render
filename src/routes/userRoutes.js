const { constants } = require("../constants");
const express = require("express");
const {localdata} = require("../data/buntica");
const router = express.Router();

///const { httpError } = require('../sorija/___handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const {sendToken} = require("../helpers/jwtFunctions");
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')


//a/ingreso

router.get('/', (b,g)=>{
    let data = localdata(); g.render('login',{d:data})
})


//a/ingreso/(post=yupafi):

router.post('/verificacion', async(b, g, next)=>{
    //try {
        const { email, password } = b.body;
        
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        }
        if(constants.WEB_PRESENT)
        {   
            console.log("USER_VERIFICATION")         
            const user = await userModel.findOne({ email }).select("+password");
                
            if (!user) {
                res.status(400);
                throw new Error("El usuario no existe");            
            }
            ///const isPasswordValid = await user.comparePassword(password);
            const isPasswordValid = await compare(password, user.password) //TODO: Contraseña!
            
            if (!isPasswordValid) {
                res.status(401);
                throw new Error("La clave no es válida");
            }                  
            sendToken(user, g);            
        }
        else
        {
            const oser ={
                name: "adowwwwwwlfo",
                age: 29,
                email: "adocarpel@gmail.com",            
                password: "123456",
                avatarURL: "url avatar",
                role:'user'
            }
            ////sendToken(oser, g);
            jwt.sign({ id: "asdipofjaoisjffijfe"}, process.env.JWT_SECRET_KEY,{
                expiresIn: process.env.JWT_EXPIRES,
              });            
        }
        next(); //PARA CORS  
    /*    PROUE EN INDEX TENEMOS EL MANEJADOR DE ERRORES
    } catch (error) {
    return  console.error(error);
    }
    */
})
module.exports = router