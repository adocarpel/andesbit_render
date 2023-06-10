const jwt = require('jsonwebtoken') //TODO : 😎

const tokenSign = async (user) => { //TODO: Genera Token
    
    return jwt.sign(
        {
            id: user._id,
            age: user.age,
            avatarURL: user.avatarURL,
            email: user.email,
            name: user.name,
            password: user.password

        }, 
        process.env.JWT_SECRET_KEY, 
        {
            expiresIn: "5m",
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { //: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}


const sendToken = (user, res, redirect) => {

    const token = user.getJwtToken();
  
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
  
    res.cookie("token", token, options);
    
  };
  
module.exports = { tokenSign, decodeSign, verifyToken, sendToken }