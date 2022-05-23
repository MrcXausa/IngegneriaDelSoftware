const mongoose = require('mongoose')
const { Schema } = mongoose;

const torneoSchema = new Schema({
  numero_gironi: Number,
  numero_squadre: Number,
  squadre_per_girone: Number,
  alle_fasi_finali: Number, //squadre alla fase finale per ogni girone
  stato: String, // stato torneo

}, {
    collection: 'tornei'
});

const Torneo = mongoose.model('Torneo', torneoSchema);

module.exports = Torneo