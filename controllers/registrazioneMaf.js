const Utente = require('../models/Utente')

function salvaMaf(req, res) {
  const body = req.body;
  if (!body.cognome || !body.nome || !body.codiceFiscale || !body.email) {
    res.status(400).send({success: false, error: 'I campi nome, cognome, codice fiscale e indirizzo e-mail sono obbligatori'})
    return
  }

  Utente.findOne({ruolo: 'manager'}, function(err, data) {
    if (data) {
      res.status(409).send({'error': 'Esiste già un manager registrato'});
      return;
    }
  });

  const utente = new Utente({
    nome: body.nome,
    cognome: body.cognome,
    codiceFiscale: body.codiceFiscale,
    email: body.email,
    ruolo: 'manager'
  })

  utente.save()
  .then(() => {
    res.status(201).location(process.env.URL_BASE + 'utenti/' + utente._id).send({'success': true})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send({'success': false, 'error': error.message})
  })
}

module.exports = salvaMaf