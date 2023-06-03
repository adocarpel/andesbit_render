const jwt = require('jsonwebtoken') //TODO : 😎

const tokenSign = async (user) => { //TODO: Genera Token
    /*
    return jwt.sign(
        {
            _id: user._id, //TODO: <---
            role: user.role
        }, //TODO: Payload ! Carga útil
        process.env.JWT_SECRET, //TODO ENV 
        {
            expiresIn: "2h", //TODO tiempo de vida
        }
    );
    */

    console.log("===============================================")
    console.log(user)

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

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}

module.exports = { tokenSign, decodeSign, verifyToken }