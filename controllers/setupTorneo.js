const Torneo = require('../models/Torneo')

async function setupTorneo(req, res) {
  const body = req.body;
  // verifico la presenza di tutti i parametri obbligatori
  if (!body.gironi || !body.squadre || !body.squadre_per_girone || !body.a_finali) {
    res.status(400).send({success: false, error: 'I campi necessari mancanti'})
    return
  }

  // verifico che non esista un torneo
  let dbTorneo = await Torneo.findOne().exec();
  if(dbTorneo){
    res.status(409).send({success: false, error: 'Esiste già un torneo'})
    return
  }

  const torneo = new Torneo({
    numero_gironi: body.gironi,
    numero_squadre: body.squadre,
    squadre_per_girone: body.squadre_per_girone,
    alle_fasi_finali: body.a_finali, 
    stato: 'creato', 
  })

  torneo.save()
  .then(() => {
    res.status(201).send({success: true, self: '/api/v1/torneo'})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send({success: false, error: error.message})
  })
}

module.exports = setupTorneo