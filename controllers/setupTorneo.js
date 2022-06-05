const Torneo = require('../models/Torneo')

async function setupTorneo(req, res) {
  if(req.user.ruolo=="manager"){ //se l'utente è autorizzato
    const body = req.body;
    // verifico la presenza di tutti i parametri obbligatori
    if (!body.gironi || !body.squadre || !body.squadre_per_girone || !body.a_finali) {
      res.status(400).send({success: false, error: 'I campi necessari mancanti'})
      return
    }
  
    // verifico che non esista un torneo
    let dbTorneo = await Torneo.findOne().exec();
    if(dbTorneo){ //se un torneo esiste già ritorno errore
      res.status(409).send({success: false, error: 'Esiste già un torneo'})
      return
    }
    //altrimenti creo un nuovo torneo con i parametri e lo salvo
    const torneo = new Torneo({
      numero_gironi: body.gironi,
      numero_squadre: body.squadre,
      squadre_per_girone: body.squadre_per_girone,
      alle_fasi_finali: body.a_finali, 
      stato: 'creato', 
    })
  
    torneo.save()
    .then(() => {
      res.status(201).location('/api/v1/torneo').send({success: true, self: '/api/v1/torneo'})
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({success: false, error: error.message})
    })
  }
  else{
      res.status(412).send({success: false, error: 'Utente non autorizzato'})
  }
}



module.exports = setupTorneo