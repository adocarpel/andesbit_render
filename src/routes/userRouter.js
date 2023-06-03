const express = require('express')
const router = express.Router()
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { loginCtrl, registerCtrl, activationCtrl } = require('../controllers/authController')

//LOS GET DE ESTO ESTAN EN INDEX ROUTER PORQUE SON FORMULARIOS

//TODO: Login !
router.post('/login', loginCtrl)

//TODO: Registrar un usuario
router.post('/register', upload.array("files"), registerCtrl)


router.get('/panel/:token', (req, res) => {
  var id = req.params.token; //req.query seria para?nnn=// $_GET["id"]
  //{ activation_token } = useParams();
  //SendRequest("{testfield: 'Boop'}"); //Execute the function the request is in.
  //FUNCIONA¡console.log(id);
  //PROAHOERAEN... res.render("activation",{data:id})
  res.render("panel",{data:id})
})

router.post('/activation', activationCtrl) // CREATE RegisTer OF USER

module.exports = router;
