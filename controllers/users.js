const { httpError } = require('../helpers/handleError')
const userModel = require('../models/users')

const getItems = async (req, res) => {
    try {
        const listAll = await userModel.find({})
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const getItem = (req, res) => {

}

const createItem = async (req, res) => {
    console.log("ilaja")
   // try {
        const { name, age, email, password } = req.body

        /////var Cat = mongoose.model('Cat', { name: String });

        ///var resDetail = new userModel({
        ///    name, age, email, password
        ///})
/*
        const resDetail = await userModel.create({
            name, age, email, password
        })
        */

        ///onst username = req.body.username;

        const newUser = new userModel({name, age, email, password });
      
        newUser.save()
            .then(() => {
                res.send({ data: newUser })
                console.log("1---")
            })
            .catch(err => {
                res.status(400).json('Error: ' + err)
                console.log("2---")
            });

        ///res.send({ data: resDetail })
    //} catch (e) {
     //   httpError(res, e)
   // }
}


const updateItem = (req, res) => {

}

const deleteItem = (req, res) => {

}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }