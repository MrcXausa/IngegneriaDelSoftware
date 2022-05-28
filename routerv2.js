const express = require('express')
const routerv2 = express.Router()
const avviaTorneo=require('./controllers/avviaTorneo')
const tokenChecker = require('./middlewares/checkToken')
const mostraIscrizioniSquadre=require("./controllers/mostraIscrizioniSquadre")
const iscrizioneSquadra=require("./controllers/iscrizionesquadra.js")

// middleware that is specific to this router
routerv2.use((req, res, next) => {
  console.log('Router 2 - Time: ', Date.now())
  next()
})

routerv2.put('/avviatorneo',tokenChecker,avviaTorneo);
routerv2.get("/mostraiscrizionisquadre",mostraIscrizioniSquadre);
routerv2.put("/iscrizionesquadra",iscrizioneSquadra);


module.exports = routerv2