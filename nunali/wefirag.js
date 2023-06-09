const e = require("express");
const {werufi} = require("../bundata/buntica");
const teroja = e.Router();
const wefirag = (i, r)=>{let data = werufi(); r.render('wefirag',{d:data})}
teroja.get('/', wefirag)
module.exports = teroja