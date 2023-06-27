const multer = require("multer");
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage(
{
//const storage = SharpMulter (
//{
    /*
        destination:(req, file, callback) =>callback(null, "images"),
        imageOptions:{
         fileFormat: "jpg",
         quality: 80,
         resize: { width: 200, height: 160 },
        }
     */

    ///*
    destination: function (req,res,cb)
    {
        const {email} = req.body;       

        let r1 = email.replace('@','a')
        let re = /\./g
        let r2 = r1.replace(re, 'p')
        let complete_path = path.join(__dirname, './uploads' + '/' + r2)
        
        if(fs.existsSync(complete_path))
        {
            //YA TIENE QUE EXISTIR SI SE SUBIÓ EL AVATAR
        }else{
            fs.mkdir(complete_path,(error)=> {
                if(error){
                    console.log('error en creación de subdirectorio')
                }else{;}
            })
        }
        cb(null, complete_path);
    },
    filename: function (req,file,cb) 
    {
        cb(null, file.originalname);       
    },
    //*/
})

exports.upload2 = multer({storage: storage})
////const upload  =  multer({ storage });