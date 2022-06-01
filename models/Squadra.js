const mongoose = require('mongoose');
const { Schema } = mongoose;
const Utente =require("./Utente")

const squadraSchema = new Schema({
    nome: String,
    giocatori:[String],
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