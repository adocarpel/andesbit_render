const express = require("express");
const {localdata} = require("../data/buntica");
const {dataUserAuthenticated} = require('../middleware/auth')
const router = express.Router();
////const jwt = require("jsonwebtoken");//userDecode


router.get('/', async(req, res)=>{
    let data = localdata()

    //::::::::::::::::::::::::::::::::::::

    let user_decoded = await dataUserAuthenticated(req)    
    let uPresent = true
    if(user_decoded == null) {user_decoded = {name:"____"}; uPresent = false}

    ////console.log(":::::::",user_decoded)

    res.render('lista',{d:data, user:user_decoded, uPresent:uPresent})
});

module.exports = router