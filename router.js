const express = require('express')
const salvaMaf=require('./registrazioneMaf')
const router = express.Router()




// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})



router.post('/api/v1/maf', salvaMaf)


module.exports = router