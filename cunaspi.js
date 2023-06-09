  
  const e = require('express')
  const p = require('path')
  const cookieParser = require("cookie-parser");
  const bodyParser = require("body-parser");
  const pewelre_teroja = require("./nunali/pewelre");
  const wefirag_teroja = require("./nunali/wefirag");

  a = e()
  a.set('view engine','ejs')
  a.set("views", __dirname + "/laripa")  
  a.use(cookieParser());
  a.use(e.static(p.join(__dirname, 'chiboja')))

  a.use(bodyParser.urlencoded({extended:false}))
  a.use(bodyParser.json());
  a.use(e.json())
  
  //a.use("/a/pewelre", pewelre_teroja);
  //a.use("/a/wefirag", wefirag_teroja);
  a.use("/a/lista", pewelre_teroja);
  a.use("/a/ingreso", wefirag_teroja);

  const f1 = (b,g)=>{g.render('cunasri')}
  const rilaja = 3000
  const f2 = ()=>{console.log(`Servidor en la url http://127.0.0.1:${rilaja}/`)}
  //
  const f3 = (b,g)=>{ 
    const {dynamic} = b.params
    const {key} = b.query
    console.log(dynamic, key)
    g.status(200).json({info:'preset text'})
  }
  const f4 = (b,g)=>{ 
    const {parcel} = b.body
    console.log("KI",parcel)
    if(!parcel){
      return g.status(400).send({status:'failed'})
    }    
    g.status(200).send({status:'recived'})
  }
  const sajira= (b,g)=>{     
    g.status(200).render('sajira')
  }
  //
  a.get('/',f1)
  a.get('/acerca_de',sajira)
  //
  a.get('/da_e/:dynamic',f3)  
  a.post('/do_h',f4)  
  //
  a.listen(rilaja,f2)