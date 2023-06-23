const multer = require("multer");
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage(
{
    
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
})

exports.upload2 = multer({storage: storage})