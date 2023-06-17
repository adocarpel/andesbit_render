const jwt = require('jsonwebtoken') 

/* ya no necesaro porqu se usa el del modelo userModel...
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
*/
//PARAUSARPRONTO
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (e) {
        return null
    }
}

/*VERIFICAR
const decodeSign = (token) => { //: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}
*/

const sendToken = (user, res) => {

    const token = user.getJwtToken();
  
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
  
    res.cookie("token", token, options);
    
  };
  
///module.exports = { tokenSign, decodeSign, verifyToken, sendToken }
module.exports = { verifyToken, sendToken }