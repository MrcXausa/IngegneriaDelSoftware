const Squadra = require('../models/Squadra');
const Utente = require('../models/Utente')

async function salvaSquadra(req, res) {
  const body = req.body;
  // verifico la presenza di tutti i parametri obbligatori
  if (!body.nome || !body.girone) {
    res.status(400).send({success: false, error: 'I campi nome e girone sono obbligatori'})
    return
  }

  // verifico che la squadra non sia già presente
  let dbSquadra = await Squadra.findOne({nome: body.nome}).exec();
  if (dbSquadra) {
    res.status(409).send({success: false, error: 'La squadra è già registrata'})
    return
  }

  // verifico che i giocatori da iscrivere siano almeno 5 e non più di 10
  if (body.giocatori.length < 5 || body.giocatori.length > 10) {
    res.status(400).send({success: false, error: 'Per iscrivere una squadra sono necessari almeno 5 giocatori ed è possibile iscrivere al massimo 10 giocatori'})
    return
  }
  
  // verifico che i giocatori non siano già iscritti ad altre squadre
  // se non lo sono, procedo con il loro inserimento
  let error = false
  let errorMessages = []

  let elencoCompletoUtenti = await Utente.find({}, 'codiceFiscale email')
  let elencoGiocatoriDaInserire = [];
  let elencoIdGiocatori = [];
  body.giocatori.forEach(function(giocatore) {
    if (!giocatore.nome || !giocatore.cognome || !giocatore.codiceFiscale || !giocatore.email) {
        error = true
        errorMessages.push("I campi nome, cognome, codice fiscale e indirizzo e-mail sono obbligatori per tutti i giocatori")
    }
    if (elencoCompletoUtenti.filter(u => u.codiceFiscale == giocatore.codiceFiscale).length || elencoGiocatoriDaInserire.filter(u => u.codiceFiscale == giocatore.codiceFiscale).length) {
        error = true
        errorMessages.push("Il giocatore avente codice fiscale " + giocatore.codiceFiscale + " è già registrato nel sistema o è stato inserito più volte")
    }
    if (elencoCompletoUtenti.filter(u => u.email == giocatore.email).length || elencoGiocatoriDaInserire.filter(u => u.email == giocatore.email).length) {
        error = true
        errorMessages.push("Il giocatore avente email " + giocatore.email + " è già registrato nel sistema o è stato inserito più volte")
    }
    elencoGiocatoriDaInserire.push({
        nome: giocatore.nome,
        cognome: giocatore.cognome,
        email: giocatore.email,
        codiceFiscale: giocatore.codiceFiscale,
        ruolo: 'giocatore',
        stato: 'approvato',
        reti: 0
    })
  })

  if (error) {
    res.status(409).send({success: false, error: errorMessages.join('\n')})
    return
  } else {
    elencoGiocatoriDaInserire.forEach(function(giocatore) {
        let utente = new Utente(giocatore)
        utente.save()
        elencoIdGiocatori.push(utente._id)
    })
  }

  // creo il mio document con i dati della richiesta
  const squadra = new Squadra({
    nome: body.nome,
    girone: body.girone,
    approvata: false,
    punteggio: 0,
    giocate: 0,
    vinte: 0,
    perse: 0,
    pareggiate: 0,
    giocatori: elencoIdGiocatori
  })

  squadra.save()
  .then(() => {
    res.status(201).location('/api/v1/squadre/' + squadra._id).send({success: true, self: '/api/v1/squadra/' + squadra._id})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).send({success: false, error: error.message})
  })
}

module.exports = salvaSquadra