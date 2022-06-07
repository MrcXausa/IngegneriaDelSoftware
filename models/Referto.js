const mongoose = require('mongoose')
const { Schema } = mongoose;

const refertoSchema = new Schema({
    partitaRiferimento: String,
    goalCasa:  Number,
    goalOspite: Number,
    marcatori: Array
}, {
    collection: 'referti'
});

const Referto = mongoose.model('Referto', refertoSchema);

module.exports = Referto