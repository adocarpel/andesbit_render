const e = require("express");
const {d} = require("../bundata/buntica");
const teroja = e.Router();
const pewelre = (i, r)=>{let data = d(); r.render('pewelre',{d:data})}
teroja.get('/', pewelre)
module.exports = teroja