const express = require('express')
const routerv2 = express.Router()
const avviaTorneo=require('./controllers/avviaTorneo')
const tokenChecker = require('./middlewares/checkToken')
const {getArbitri, approvaArbitro} = require('./controllers/arbitri.js')
const mostraIscrizioniSquadre=require("./controllers/mostraIscrizioniSquadre")
const approvazioneSquadra=require("./controllers/approvazioneSquadra.js")
const getGiocatore=require("./controllers/getGiocatore")
const visualizzazionePartite=require("./controllers/visualizzazionePartite")
const loginArbitro = require('./controllers/loginArbitro')
const inserimentoReferto = require('./controllers/inserimentoReferto')
const creaPartita=require("./controllers/creaPartita")
const candidaturaSquadra=require('./controllers/candidaturaSquadra')
const getSquadra = require("./controllers/getSquadra")
const visualizzazioneSquadre=require("./controllers/visualizzazioneSquadre")

// middleware that is specific to this router
routerv2.use((req, res, next) => {
  console.log('Router 2 - Time: ', Date.now())
  next()
})

routerv2.put('/avviatorneo',tokenChecker,avviaTorneo);
routerv2.get('/arbitri', tokenChecker, getArbitri);
routerv2.put('/arbitri/:id/approva', tokenChecker, approvaArbitro);
routerv2.get("/mostraiscrizionisquadre",tokenChecker,mostraIscrizioniSquadre);
routerv2.post('/squadra', candidaturaSquadra);
routerv2.put("/squadre/:id/approva",tokenChecker,approvazioneSquadra);
routerv2.get("/giocatore/:id",getGiocatore);
routerv2.get("/partite", visualizzazionePartite);
routerv2.get('/arbitro', tokenChecker, loginArbitro)
routerv2.post("/partita",tokenChecker,creaPartita); //needs tokenCheker
routerv2.post('/inserimentoreferti', inserimentoReferto);
routerv2.get("/squadra/:id", getSquadra);
routerv2.get("/squadre",visualizzazioneSquadre)

module.exports = routerv2