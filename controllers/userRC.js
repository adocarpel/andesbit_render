const {constants} = require("../constants");
const express = require("express");
const {localdata} = require("../data/buntica");
const router = express.Router();
const path = require('path')
const {encrypt, compare} = require('../helpers/handleBcrypt')
const {sendToken} = require("../helpers/jwtFunctions");
const sendMail = require("../helpers/sendMail");
const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')
const publications = require('../models/publications')
const {dataUserAuthenticated} = require('../middleware/auth')
const {upload} = require("../multer");
const {upload2} = require("../multer2");
const { isAuthenticated } = require("../middleware/auth")
const sharp = require('sharp');
const fs = require('fs')

//SIGNIN
router.get('/registrar', async(req, res)=>
{   
    
    let user_decoded = await dataUserAuthenticated(req)    
    let uPresent = true
    if(user_decoded == null) {user_decoded = {name:"____"}; uPresent = false}

    res.render('signin', {global_url:process.env.URL_APP, user:user_decoded, uPresent:uPresent})
})


router.post('/pre_register', upload.single("files"), async(req, res)=>
{       
    let img_name = req.file.originalname
    const { age, email, name, password} = await req.body

    let avatarUrl = "liavatarli_" + img_name
    

    const userEmail = await userModel.findOne({ email });

    if (userEmail) 
    {              
        /*
        const _filename = avatarUrl///req.files[0].filename;//req.file.filename;
        const filePath = `uploads/${_filename}`

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
                res.status(500);
                throw new Error("Error eliminando imagen.");
            }
        });
        
        return next(new ErrorHandler("User already exists", 400));
        */
       res.send("el usuario ya existe")
    }
    else
    {
        const passwordHash = await encrypt(password)
        //const filename = req.files[0].filename
        //console.log(filename)
        ///const fileUrl = filename;//join(__dirname, filename);

        const user = {
            age : age,
            avatarUrl: avatarUrl,//fileUrl,
            email: email,
            name: name,            
            password: passwordHash
        }
        /////console.log(user);
        
        const tokenSession = createActivationToken(user)
        const activationUrl = `${process.env.URL_APP}/a/usuario/panel/${tokenSession}`;

        try {
            await sendMail({
                email: user.email,
                subject: "Activar tu cuenta",
                message: `Hola ${user.name}, por favor revise su email para activar su cuenta: ${activationUrl}`,
            });
        res.send(`¡Por favor revise su email:- ${user.email} para activar su cuenta!`)
        } catch (error) {        
            res.status(500);
            throw new Error(error.message);
            
        }
    }    

})

const createActivationToken = (user) => 
{
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
}


router.get('/panel/:token', async(req, res) => 
{
  var token = req.params.token 
  
  //FROM return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });


  //let user = decode(token)
  ///const decoded1 = jwt.verify(token, process.env.ACTIVATION_SECRET);

  
  //·esto era llamado como post (reqresnext) desde javascript
  //·{    
  //·    const ahc = document.getElementById("ahc");    
  //·    const data = {
  //·        activation_token: ahc.value
  //·    };
  //·    const customHeaders = {
  //·        "Content-Type": "application/json",
  //·    }        
  //·    fetch("http://127.0.0.1:5000/activation", {
  //·        method: "POST",
  //·        headers: customHeaders,
  //·        body: JSON.stringify(data),
  //·    })
  //·    .then((res) => {console.log(res); document.getElementById("u").innerHTML="¡SI"})
  //·    .catch((err) => ("Error occured", err));   
  //·}   

  // const { activation_token } = req.body;
  // const newUser = jwt.verify( activation_token, process.env.ACTIVATION_SECRET );    
  
  const newUser = jwt.verify(token, process.env.ACTIVATION_SECRET);

  if (!newUser) {
    res.status(400);
    throw new Error("Token sin validez, pede estar mal copiada la dirección.");
    //· res.send("Token sin validez, pede estar mal copiada la dirección.")
      //return next(new ErrorHandler("Invalid token", 400));
  }
      
  const { age, avatarUrl, email, name, password} = newUser;
  let user = await userModel.findOne({ email });

  if (user) {
    //res.status(400);
    //throw new Error("Ya existe el usuario.");
    res.send("YA EXISTE EL USUARIO!")
    //  return next(new ErrorHandler("User already exists", 400));
  }
  else
  {
    user = await userModel.create({
        age,
        avatarUrl,
        email,    
        name,    
        password,
    });
    sendToken(user, res);

    ///res.render("panel", {user:user, uPresent: true, publications: [{title:'',url:'',graphUrl:'',comments:''}]})
    res.render('panel', {user:user, uPresent:true, publications:[{title:'',url:'',graphUrl:'',comments:''}], pathimgs:'../uploads', last_search:''})
  }

  
})


router.get('/ingresar', async(req, s)=> 
{    
    let data = localdata(); 
    let user_decoded = await dataUserAuthenticated(req)    
    //console.log(user_decoded)
    let uPresent = true

    if(user_decoded == null) 
    {
        user_decoded = {name:"____"}; 
        uPresent = false;
        console.log('asha');
    };

    s.render('login',{d:data, global_url:process.env.URL_APP, user:user_decoded, uPresent:uPresent})
})


router.post('/entrar', async(req, res, next)=>
{
       const { email, password } = req.body;
        
        if (!email || !password) {
            res.status(400);
            throw new Error("Se deben llenar todos los campos o recuadros.");
        }
        if(constants.WEB_PRESENT)
        {   
            ////console.log("USER_VERIFICATION")         
            const user = await userModel.findOne({ email }).select("+password");
                
            if (!user) {
                res.status(400);
                throw new Error("El usuario no existe");            
            }
            
            const isPasswordValid = await compare(password, user.password)
            
            if (!isPasswordValid) {
                res.status(401);
                throw new Error("La clave no es válida");
            }                  
            sendToken(user, res);            
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
})



router.post('/upload_item', isAuthenticated, upload2.single("files"), async(req,res)=>
//router.post('/upload_item', isAuthenticated, async(req,res)=>
{
    let img_name = req.file.originalname
    
    //uidka
        
    const {user_id, title, category, url, comments, rviews} = await req.body

    
    
    let uidka = user_id
    ////////CREO QUE ESTA DEMASlet user = await dataUserAuthenticated(req)    
    const user = req.user 
    user.email
    const email = user.email
     
    let r1 = email.replace('@','a')
    let re = /\./g
    let r2 = r1.replace(re, 'p');
     
      //completep = path.join(__dirname, './uploads' + '/' + r2)
      
    let graphUrl = '/' + r2 + '/m_'+ img_name
    let user_name = user.name


    //IMG===================



    completep = '../../uploads' ////+ '/' + r2

    let spath = req.file.path
    const { filename: image } = req.file
    await sharp(spath)
    .resize(220, 160)
    .toFile(path.resolve(req.file.destination,'','m_'+image))

    fs.unlinkSync(req.file.path)



    //var newItem = new Item();
    //newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    //newItem.img.contentType = ‘image/png’;
    //newItem.save();
    let l =path.resolve(req.file.destination,'','m_'+image)
    let hs = fs.readFileSync(l)
    /**img: { 
        data: Buffer, 
        contentType: String 
     } */
     let img = {
        data: hs,
        contentType: req.file.mimetype
      }

    //let img =null
    

    //======================

    const pub = await publications.create(
    {
        title, category, url, comments, graphUrl, rviews, uidka, user_name, img
    });
    

    let uPresent = true     
    let pubs = []///{}
    let completep = '____'
    /*
    if(user == null) 
    {
        user = {name:"____"}; 
        uPresent = false
    }
    else
    {
    */       
        pubs = await publications.find({ uidka: user._id })
/*
        completep = '../../uploads' ////+ '/' + r2

        let spath = req.file.path
        const { filename: image } = req.file
        await sharp(spath)
        .resize(220, 160)
        .toFile(path.resolve(req.file.destination,'','m_'+image))

        fs.unlinkSync(req.file.path)
*/        
    ///}    
    
    res.render('panel',{user:user, uPresent:uPresent, publications:pubs, pathimgs:completep, last_search:''})

})


// log out user
router.get("/salir", async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(201).json({
        success: true,
        message: "Log out successful!",
    });
})
  

module.exports = router