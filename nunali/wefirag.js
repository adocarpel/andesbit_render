const { constants } = require("../petoja");
const e = require("express");
const {werufi} = require("../bundata/buntica");
const teroja = e.Router();

///const { httpError } = require('../sorija/___handleError')
const { encrypt, compare } = require('../sorija/handleBcrypt')
const ErrorHandler = require("../sorija/verifyError");
const {sendToken} = require("../sorija/jwtFunctions");
const sendMail = require("../sorija/sendMail");
const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')


//a/ingreso

teroja.get('/', (b,g)=>{
    let data = werufi(); g.render('wefirag',{d:data})
})


//a/ingreso/(post=yupafi):

teroja.post('/yupafi', async(b, g, next)=>{
    try {
        const { email, password } = b.body;
        
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
        if(constants.WEB_PRESENT)
        {   
            console.log("PRU·BA")         
            const user = await userModel.findOne({ email }).select("+password");
                
            if (!user) {
            return next(new ErrorHandler("User doesn't exists!", 400));
            }
            ///const isPasswordValid = await user.comparePassword(password);
            const isPasswordValid = await compare(password, user.password) //TODO: Contraseña!
            
            if (!isPasswordValid) {
                return next(
                    new ErrorHandler("Please provide the correct information", 400)
                );
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
    } catch (error) {
    return next(new ErrorHandler(error.message, 500));
    }
})
module.exports = teroja