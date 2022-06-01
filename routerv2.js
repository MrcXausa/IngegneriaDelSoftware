const express = require('express')
const routerv2 = express.Router()
const avviaTorneo=require('./controllers/avviaTorneo')
const tokenChecker = require('./middlewares/checkToken')
<<<<<<< HEAD
const {getArbitri, approvaArbitro} = require('./controllers/arbitri.js')
=======
const mostraIscrizioniSquadre=require("./controllers/mostraIscrizioniSquadre")
const approvazioneSquadra=require("./controllers/approvazioneSquadra.js")
const getGiocatore=require("./controllers/getGiocatore")
>>>>>>> approvazioneIscrizione

// middleware that is specific to this router
routerv2.use((req, res, next) => {
  console.log('Router 2 - Time: ', Date.now())
  next()
})

routerv2.put('/avviatorneo',tokenChecker,avviaTorneo);
<<<<<<< HEAD
routerv2.get('/arbitri', tokenChecker, getArbitri);
routerv2.put('/arbitri/:id/approva', tokenChecker, approvaArbitro);
=======
routerv2.get("/mostraiscrizionisquadre",tokenChecker,mostraIscrizioniSquadre);
routerv2.put("/approvazionesquadra/:id",tokenChecker,approvazioneSquadra);
routerv2.get("/giocatore/:id",getGiocatore)

>>>>>>> approvazioneIscrizione

module.exports = routerv2