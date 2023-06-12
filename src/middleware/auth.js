
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        res.send("Please login to continue - Error 401")
        return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
};


exports.isSeller = async(req,res,next) => {
    const {seller_token} = req.cookies;
    if(!seller_token){
        return next(new errorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
}


exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(res.send(`${req.user.role} can not access this resources!`))
        };
        next();
    }
}