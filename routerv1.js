const express = require('express')
const routerv1 = express.Router()
const salvaMaf = require('./controllers/registrazioneMaf')
const loginMaf = require('./controllers/loginMaf')
const setupTorneo=require('./controllers/setupTorneo')
const candidaturaArbitro = require('./controllers/candidaturaArbitro')
const avviaTorneo=require('./controllers/avviaTorneo')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const tokenChecker = require('./middlewares/checkToken')

const swaggerDocument = YAML.load('./oas3.yaml');


routerv1.use('/api-docs', swaggerUi.serve);
routerv1.get('/api-docs', swaggerUi.setup(swaggerDocument));

// middleware that is specific to this router
routerv1.use((req, res, next) => {
  console.log('Router 1 - Time: ', Date.now())
  next()
})

routerv1.post('/maf', salvaMaf)
routerv1.get('/maf', tokenChecker, loginMaf)
routerv1.post('/arbitro', candidaturaArbitro) //rimuovere tokenCheker
routerv1.post('/setuptorneo', tokenChecker,setupTorneo)

module.exports = routerv1