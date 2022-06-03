const express = require('express')
const routerv2 = express.Router()
const avviaTorneo=require('./controllers/avviaTorneo')
const tokenChecker = require('./middlewares/checkToken')
const {getArbitri, approvaArbitro} = require('./controllers/arbitri.js')
const mostraIscrizioniSquadre=require("./controllers/mostraIscrizioniSquadre")
const approvazioneSquadra=require("./controllers/approvazioneSquadra.js")
const getGiocatore=require("./controllers/getGiocatore")
const visualizzazionePartite=require("./controllers/visualizzazionePartite")
const creaPartita=require("./controllers/creaPartita")

// middleware that is specific to this router
routerv2.use((req, res, next) => {
  console.log('Router 2 - Time: ', Date.now())
  next()
})

routerv2.put('/avviatorneo',tokenChecker,avviaTorneo);
routerv2.get('/arbitri', tokenChecker, getArbitri);
routerv2.put('/arbitri/:id/approva', tokenChecker, approvaArbitro);
routerv2.get("/mostraiscrizionisquadre",tokenChecker,mostraIscrizioniSquadre);
routerv2.put("/squadre/:id/approva",tokenChecker,approvazioneSquadra);
routerv2.get("/giocatore/:id",getGiocatore);
routerv2.get("/partite", visualizzazionePartite);
routerv2.post("/partita",creaPartita); //needs tokenCheker


module.exports = routerv2