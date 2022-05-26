const Torneo = require('../models/Torneo')

async function avviaTorneo(req, res) {
  const body = req.body;


  // verifico che non esista un torneo
  let dbTorneo = await Torneo.findOne().exec();
  if(dbTorneo){
    Torneo.updateOne({},{stato:'attivo'})
    .then(() => {
      res.status(201).send({success: true, self: '/api/v2/torneo'})
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({success: false, error: error.message})
    })
  }
  else{
    res.status(406).send({success: false, error: 'nessun torneo esistente'})
  }
}

module.exports = avviaTorneo