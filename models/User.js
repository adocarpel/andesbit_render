const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: String
    }
)

const User = model('biblioteca.users', userSchema);
//export default User;
module.exports = {User}
