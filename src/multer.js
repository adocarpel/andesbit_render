const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null, path.join(__dirname, './uploads'));
    },
    filename: function (req,file,cb) {
        /*
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(".")[0];
        cb(null,filename + "-" + uniqueSuffix + ".png");
        */
        
        const {email}=req.body;
        let r1 = email.replace('@','a')
        let re = /\./g
        let r2 = r1.replace(re, 'p')
        cb(null,r2+file.originalname);
       
    },
});
/*
const {email}=req.body;
        let r1 = email.replace('@','a')
        let re = /\./g
        let r2 = r1.replace(re, 'p')
        
cb(null,r2+filename + ".png");
*/
exports.upload = multer({storage: storage});