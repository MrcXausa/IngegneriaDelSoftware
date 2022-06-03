const express = require('express')
const routerv2 = express.Router()
const avviaTorneo=require('./controllers/avviaTorneo')
const tokenChecker = require('./middlewares/checkToken')
const {getArbitri, approvaArbitro} = require('./controllers/arbitri.js')
<<<<<<< HEAD
const mostraIscrizioniSquadre=require("./controllers/mostraIscrizioniSquadre")
const approvazioneSquadra=require("./controllers/approvazioneSquadra.js")
const getGiocatore=require("./controllers/getGiocatore")
const visualizzazionePartite=require("./controllers/visualizzazionePartite")
=======
const loginArbitro = require('./controllers/loginArbitro')
>>>>>>> loginArbitro

// middleware that is specific to this router
routerv2.use((req, res, next) => {
  console.log('Router 2 - Time: ', Date.now())
  next()
})

routerv2.put('/avviatorneo',tokenChecker,avviaTorneo);
routerv2.get('/arbitri', tokenChecker, getArbitri);
routerv2.put('/arbitri/:id/approva', tokenChecker, approvaArbitro);
<<<<<<< HEAD
routerv2.get("/mostraiscrizionisquadre",tokenChecker,mostraIscrizioniSquadre);
routerv2.put("/approvazionesquadra/:id",tokenChecker,approvazioneSquadra);
routerv2.get("/giocatore/:id",getGiocatore);
routerv2.get("/partite", visualizzazionePartite);
=======
routerv2.get('/arbitro', tokenChecker, loginArbitro)
>>>>>>> loginArbitro

module.exports = routerv2