const express = require("express");
const {d} = require("../data/buntica");
const router = express.Router();
const pewelre = (i, r)=>{let data = d(); r.render('pewelre',{d:data})}
router.get('/', pewelre)
module.exports = router