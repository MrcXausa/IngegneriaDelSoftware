const express = require('express')
const routerv2 = express.Router()
const avviaTorneo=require('./controllers/avviaTorneo')
const tokenChecker = require('./middlewares/checkToken')
const mostraIscrizioniSquadre=require("./controllers/mostraIscrizioniSquadre")
const approvazioneSquadra=require("./controllers/approvazioneSquadra.js")
const getGiocatore=require("./controllers/getGiocatore")

// middleware that is specific to this router
routerv2.use((req, res, next) => {
  console.log('Router 2 - Time: ', Date.now())
  next()
})

routerv2.put('/avviatorneo',tokenChecker,avviaTorneo);
routerv2.get("/mostraiscrizionisquadre",mostraIscrizioniSquadre);
routerv2.put("/approvazionesquadra",approvazioneSquadra);
routerv2.get("/getgiocatore/:id",getGiocatore)


module.exports = routerv2