const { constants } = require("../petoja");
const verifyError = require("../sorija/verifyError");
///const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticated = async(b,g,next) => {
 
  //const {token} = req.cookies;  
  const x = b.headers.cookie;
  const token = x.split("=")[1];
  
  if(!token){
      /////g.status(401);
      return next(new verifyError("User is not authorized or token is missing", 401));
  }
  
  /////const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  let permised = false;
  let i;
  if(constants.WEB_PRESENT) 
  { 
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        g.status(401);
        //////throw new Error("User is not authorized");
        return next(new verifyError("User is not Authorized", 401));
      }
      //////b.user = decoded.user;
      /////b.user = await userModel.findById(decoded.id);
      /////console.log("=======>",b.user)
      i = decoded;
      permised = true;
    })
  }else permised = true;//...................

  if(permised)
  {
    if(constants.WEB_PRESENT)
    {
      b.user = await userModel.findById(i.id);
      console.log("=======>",b.user)
    }
    else 
    {
      b.user = {
        name: "adolfo",
        age: 29,
        email: "adocarpel@gmail.com",            
        password: "123456",
        avatarURL: "url avatar",
        role:'user'
      }
    }  
    next();
  }
}
  