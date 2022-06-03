const Partita = require('../models/Partita')
const Utente = require('../models/Utente')
const Squadra = require('../models/Squadra')

// Restituisce TUTTE le partite

async function creaPartita(req, res){            
    var partita = req.body;
    if(!partita.casa || !partita.ospite || !partita.arbitro.nome || !partita.arbitro.cognome || !partita.arbitro.codiceFiscale || !partita.fase){
        res.status(400).send({success: false, error: 'Dati mancanti nella richiesta'})
        return
    }

    //controllo se esiste squadra di casa
    //SISTEMARE SQUADRA CASA
    var casa=await Partita.findOne({nome:partita.casa})
    if(!casa){
        res.status(400).send({success: false, error: 'squadra di casa non valida'})
        return
    }

    //controllo se esiste squadra fuori casa
    var ospite=await Partita.findOne({nome:partita.ospite})
    if (!ospite){
        res.status(400).send({success: false, error: 'squadra ospite non valida'})
        return
    }
    
    //controllare se esiste arbitro (come lo indico nel frontend?)
    var arbitro=await Utente.findOne({nome:partita.arbitro.cognome,cognome:partita.arbitro.cognome,codiceFiscale:partita.arbitro.codiceFiscale})
    if(!arbitro){
        res.status(400).send({success: false, error: 'Arbitro non valido'})
        return
    }

    //controlli date!

    if(await Partita.findOne({data:partita.data,luogo:partita.luogo})){ //controllo che non ci siano partite nella stessa data nello stesso luogo
        res.status(400).send({success: false, error: 'Partita già esistente per quella data in quel luogo'})
        return
    }


    //se la squadra di casa ha un'altra partita in casa quel giorno in un posto diverso
    //o gioca già come ospite 
    var partitaquelgiornocasa=await Partita.findOne({data:partita.data,casa:partita.casa});
    if (partitaquelgiornocasa.luogo!=partita.luogo|| await Partita.findOne({data:partita.data,ospite:partita.casa})){
        res.status(400).send({success: false, error: 'Conflitto partite per la squadra di casa'})
        return
    }

    //se la squadra ospite ha un'altra partita in casa quel giorno in un posto diverso
    //o è già ospite in un'altro posto
    var partitaquelgiornoospite=await Partita.findOne({data:partita.data,casa:partita.ospite});
    if (partitaquelgiornoospite.luogo!=partita.luogo|| await Partita.findOne({data:partita.data,ospite:partita.ospite})){
        res.status(400).send({success: false, error: 'Conflitto partite per la squadra ospite'})
        return
    }

    var idCasa = await Squadra.find({nome:partita.casa})._id;
    var idOspite = await Squadra.find({nome:partita.ospite})._id;
    var idArbitro= arbitro._id;

    var nuovaPartita = new Partita({
        casa: idCasa,
        ospite: idOspite,
        luogo: partita.luogo,
        data: partita.data,
        arbitro: idArbitro,
        fase: partita.fase
    })

    nuovaPartita.save()
    .then(()=>{
        res.status(400).location("/api/v2/partita/"+nuovaPartita._id).send({success: true, self: "/api/v2/partita/"+nuovaPartita._id})
        return
    })
    .catch(()=>{
        res.status(500).location("/api/v2/partita/"+nuovaPartita._id).send({success: false, error: "errore durante il salvataggio della partita"})
        return
    })
}

module.exports = creaPartita