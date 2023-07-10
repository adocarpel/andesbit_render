const express = require('express')
const router = express.Router()
const {dataUserAuthenticated} = require('../middleware/auth')
const publications = require('../models/publications')

router.get('/listar/:id_user', async(req, res) => 
{
    const pubs = await publications.find({ user_id: req.params.id_user })

    res.status(201).json({
      success: true,
      pubs,
    });
})


router.get('/agregar', async(req,res)=>
{  
//ESTA FUNCION ES DE PRUEBA PERO LA REAL ESTA EN USERS UPLOADITEM
  let user = await dataUserAuthenticated(req) 
  /////console.log("PPPPPPPPPPPPP",user)
  /*
  var pub = await publications.create(
    {
      title    : "Sotro  :::::::::::",
      url      : "=====seuTRO w.abc",
      comments : "======TROndo   ",
      graphUrl : "=========TRO::",
      uidka    : "=========TRO::"
    }
  );
  */

  var pub = await publications.create(
    {
      title    : "TER:::::::::::",
      url      : "=====TERo  w.abc",
      comments : "=======TERdo   ",
      graphUrl : "==========TER==::",
      uidka    : user._id      
    }
  );

  
  res.send(pub)
    
})

module.exports = router