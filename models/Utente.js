const mongoose = require('mongoose')
const { Schema } = mongoose;

const utenteSchema = new Schema({
  nome:  String,
  cognome: String,
  codiceFiscale: String,
  email: String,
  ruolo: String, // manager, giocatore, arbitro
  // giocatore attributes
  stato: String,
  reti: Number,
  // arbitro attributes
  sezione: String,
  codicePatentino: String,
  approvato: Boolean
}, {
    collection: 'utenti'
});

const Utente = mongoose.model('Utente', utenteSchema);

module.exports = Utente