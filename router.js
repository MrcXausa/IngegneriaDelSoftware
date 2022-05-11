const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  res.send(' prova ')
})

router.get('/ciao',(req,res)=>(
    res.send('CIAO!')
));


module.exports = router