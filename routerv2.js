const express = require('express')
const routerv2 = express.Router()
const avviaTorneo=require('./controllers/avviaTorneo')
const tokenChecker = require('./middlewares/checkToken')
const {getArbitri, approvaArbitro} = require('./controllers/arbitri.js')

// middleware that is specific to this router
routerv2.use((req, res, next) => {
  console.log('Router 2 - Time: ', Date.now())
  next()
})

routerv2.put('/avviatorneo',tokenChecker,avviaTorneo);
routerv2.get('/arbitri', tokenChecker, getArbitri);
routerv2.put('/arbitri/:id', tokenChecker, approvaArbitro);

module.exports = routerv2