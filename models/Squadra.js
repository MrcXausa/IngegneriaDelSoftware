const mongoose = require('mongoose');
const { Schema } = mongoose;

const squadraSchema = new Schema({
    nome: String,
    gicatori:[{ type: Schema.Types.ObjectId, 
                ref: 'Utente' }],
    approvata: Boolean,
    girone: Number,
    punteggio:Number,
    giocate:Number,
    vinte: Number,
    perse: Number,
    pareggiate: Number
}, {
    collection: 'squadre'
});

const Squadra = mongoose.model('Squadra',squadraSchema);

module.exports = Squadra