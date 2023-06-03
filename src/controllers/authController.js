const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
///
const ErrorHandler = require("../helpers/ErrorHandler");
const sendToken = require("../helpers/jwtToken");
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
////
///const { upload } = require("../multer");
//const multer  = require('multer')
//const upload = multer({ dest: './public/data/uploads/' })
const userModel = require('../models/userModel')
//NO USADO CON ESTAS LLAMADASconst path = require('path')

//PASELOGINMASABAJO
//TODO: Registramos usuario!
const registerCtrl = async (req, res, next) => {
    
    try {        
        const { age, email, name, password} = req.body      
        //======= Ver si ya existe el usuario =======//
        const userEmail = await userModel.findOne({ email });
        if (userEmail) 
        {            
            const _filename = req.files[0].filename;//req.file.filename;
            const filePath = `uploads/${_filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting file" });
                }
            });
            
            return next(new ErrorHandler("User already exists", 400));
        }
        //===============================================//


        const passwordHash = await encrypt(password) //TODO: (123456)<--- Encriptando!!

        //const filename = req.file.avatar;        
        //const filename = req.file.filename;
        //const fileUrl = path.join(filename);
    
        const filename = req.files[0].filename;//.avatar;
        const fileUrl = filename;//join(__dirname, filename);

        ///const fileUrl = "ee";
        
        const user = {
            age : age,
            avatarURL: fileUrl,
            email: email,
            name: name,            
            password: passwordHash
        }
        console.log(user);
        /* ====== TODAVIA MEJOR EN ACTIVATION: =======

        const registerUser = await userModel.create(user)
        res.send({ data: registerUser })
        console.log(user)       
        console.log(req.files);
        
        ======================== */

    //===========================================
   
        ///const activationToken = createActivationToken(user);
        ///const activationUrl = `https://eshop-tutorial-cefl.vercel.app/activation/${activationToken}`;
        

        //TODO JWT 👉
        const tokenSession = createActivationToken(user);////await tokenSign(user);
        ///console.log("registerCtrldeauthControllerTOKENSESSION:",tokenSession);
        //PEROAHORAENTRAREN... const activationUrl = `http://127.0.0.1:4000/activation/${tokenSession}`;
        //BIENconst activationUrl = `http://127.0.0.1:5000/panel/${tokenSession}`;
        const activationUrl = `${process.env.APP_URL}/panel/${tokenSession}`;
        
        try {
          await sendMail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
          });
          res.status(201).json({
            success: true,
            message: `please check your email:- ${user.email} to activate your account!`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }  
    //=====================================================

    } catch (e) {
        httpError(res, e)
    }
    //res.send(x);
}


// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };
/// VER:const tokenSign = async (user) => {....en helpers generate token
    


// activate user
const activationCtrl = async (req, res, next) => {
    //console.log(req.body)
    try {
    const { activation_token } = req.body;

    /*
    const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
    );
    */
    //console.log("ACTIVATIONTOKEN:",activation_token);
    //const newUser = verifyToken = (activation_token);
    //USAR ACTIVATIONSECRET!!!
    const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

    if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
    }
    
    ///const { name, email, password, avatar } = newUser;
    const { age, avatarURL, email, name, password} = newUser;
    let user = await userModel.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }
    user = await userModel.create({
        age,
        avatarURL,        
        email,    
        name,    
        password,
    });
    sendToken(user, 201, res);
    //res.render("activation",{data:"id"})
    //res.send({ data: user })
    } catch (error) {
    return next(new ErrorHandler(error.message, 500));
    }
}

/*
// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
); 
*/
//TODO: Login!
const loginCtrl = async (req, res, next) => {    
    
    try {
        
        const { email, password} = req.body 
        console.log("=c=c=c",req.body.email)
        
        ///::ADDED
        
        if (!email || !password) {
            return next(new ErrorHandler("Please provide the all fields!", 400));
        }
        
        ///

        const user = await userModel.findOne({ email })
        //const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(404)
            res.send({ error: 'User not found' })
        }
        //if (!user) { return next(new ErrorHandler("User doesn't exists!", 400)); }

        const checkPassword = await compare(password, user.password) //TODO: Contraseña!

        //TODO JWT 👉
        const tokenSession = await tokenSign(user) //TODO: 2d2d2d2d2d2d2

        if (checkPassword) { //TODO Contraseña es correcta!
            console.log("ok1")
            res.send({
                data: user,
                tokenSession
            })
            console.log("ok2")
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        httpError(res, e)
    }
}

module.exports = { loginCtrl, registerCtrl, activationCtrl}
