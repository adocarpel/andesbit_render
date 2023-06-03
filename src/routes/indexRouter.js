const express = require('express')
const router = express.Router()
var http = require('http');//Para el send request

// middleware that is specific to this router

router.use((req, res, next) => {
  ////console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', (req, res) => {
  res.render("index")
})

router.get('/login', (req, res) => {
  res.render("login")
})

// Registrar un usuario
router.get('/register', (req, res) => {
  res.render("register")
})

// Registrar un usuario

//============ PILIMA ==================


/*
var urlparams = {
    host: '127.0.0.1/', //'plop.requestcatcher.com', //No need to include 'http://' or 'www.'
    port: 4000,
    path: '/test',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', //Specifying to the server that we are sending JSON 
    }
};

function SendRequest(datatosend) {
    function OnResponse(response) {
        var data = '';
        response.on('data', function(chunk) {
            data += chunk; //Append each chunk of data received to this variable.
        });
        response.on('end', function() {
            console.log(data); //Display the server's response, if any.
        });
    }
    var request = http.request(urlparams, OnResponse); //Create a request object.
    request.write(datatosend); //Send off the request.
    request.end(); //End the request.
}

//SendRequest("{testfield: 'Boop'"); //Execute the function the request is in.


*/

router.post('/test', (req, res) => {
  console.log("ENVIADO");
})


// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router