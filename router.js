const express = require('express')
const router = express.Router()
const salvaMaf = require('./controllers/registrazioneMaf')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.post('/maf', salvaMaf)

module.exports = router