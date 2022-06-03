const mongoose = require('mongoose')
const { Schema } = mongoose;

const partitaSchema = new Schema({
  casa:  String,
  ospite: String,
  luogo: String,
  data: String,
  arbitro: String,
  fase: String
}, {
    collection: 'partite'
});

const Partita = mongoose.model('Partita', partitaSchema);

module.exports = Partita