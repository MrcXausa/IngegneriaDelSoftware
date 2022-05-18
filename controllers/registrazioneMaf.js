const Utente = require('../models/Utente')

async function salvaMaf(req, res) {
  const body = req.body;
  if (!body.cognome || !body.nome || !body.codiceFiscale || !body.email) {
    res.status(400).send({success: false, error: 'I campi nome, cognome, codice fiscale e indirizzo e-mail sono obbligatori'})
    return
  }

  let dbMaf = await Utente.findOne({ruolo: 'manager'}).exec();
  if (dbMaf) {
    res.status(409).send({success: false, error: 'Esiste già un manager registrato'});
    return
  }

  const utente = new Utente({
    nome: body.nome,
    cognome: body.cognome,
    codiceFiscale: body.codiceFiscale,
    email: body.email,
    ruolo: 'manager'
  })

  utente.save()
  .then(() => {
    res.status(201).send({'success': true, self: '/api/v1/utenti/' + utente._id})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send({success: false, error: error.message})
  })
}

module.exports = salvaMaf