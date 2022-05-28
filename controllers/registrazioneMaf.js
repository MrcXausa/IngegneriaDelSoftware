const Utente = require('../models/Utente')

async function salvaMaf(req, res) {
  const body = req.body;
  // verifico la presenza di tutti i parametri obbligatori
  if (!body.cognome || !body.nome || !body.codiceFiscale || !body.email) {
    res.status(400).send({success: false, error: 'I campi nome, cognome, codice fiscale e indirizzo e-mail sono obbligatori'})
    return
  }

  // verifico l'esistenza di un altro MAF registrato nel sistema
  // nel caso non è possibile procedere alla registrazione di un ulteriore MAF
  let dbMaf = await Utente.findOne({ruolo: 'manager'}).exec();
  if (dbMaf) {
    res.status(409).send({success: false, error: 'Esiste già un manager registrato'});
    return
  }

  // verifico che l'indirizzo email e il codice fiscale non siano già presenti tra gli utenti
  let dbEmail = await Utente.findOne({email: body.email}).exec();
  if (dbEmail) {
    res.status(409).send({success: false, error: 'L\'indirizzo e-mail inserito è già registrato'})
    return
  }
  let dbCodiceFiscale = await Utente.findOne({codiceFiscale: body.codiceFiscale}).exec();
  if (dbCodiceFiscale) {
    res.status(409).send({success: false, error: 'Il codice fiscale inserito è già registrato'})
    return
  }

  // creo il mio document con i dati della richiesta
  const utente = new Utente({
    nome: body.nome,
    cognome: body.cognome,
    codiceFiscale: body.codiceFiscale,
    email: body.email,
    ruolo: 'manager'
  })

  utente.save()
  .then(() => {
    res.status(201).location('/api/v1/utenti/').send({success: true, self: '/api/v1/utenti/' + utente._id})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send({success: false, error: error.message})
  })
}

module.exports = salvaMaf