const express = require('express')
const router = express.Router()
const salvaMaf = require('./controllers/registrazioneMaf')
const loginMaf = require('./controllers/loginMaf')
const setupTorneo=require('./controllers/setupTorneo')
const candidaturaArbitro = require('./controllers/candidaturaArbitro')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const tokenChecker = require('./middlewares/checkToken')

const swaggerDocument = YAML.load('./oas3.yml');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.post('/maf', salvaMaf)
router.get('/maf', tokenChecker, loginMaf)
router.post('/arbitro', candidaturaArbitro) //missing middleware for checking refree login
router.post('/setuptorneo',tokenChecker, setupTorneo)

module.exports = router