const Torneo = require('../models/Torneo')

async function avviaTorneo(req, res) {
  const body = req.body;


  // verifico che esista un torneo in stato "creato"
  let dbTorneo = await Torneo.findOne({stato:'creato'}).exec();
  if(dbTorneo){ //se esiste aggiorno il suo stato
    Torneo.updateOne({},{stato:'attivo'})
    .then(() => {
      res.status(201).send({success: true, self: '/api/v2/torneo'})
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({success: false, error: error.message})
    })
  }
  else{ //se non trovo nulla restituisco errore
    res.status(406).send({success: false, error: 'nessun torneo esistente'})
  }
}

module.exports = avviaTorneo