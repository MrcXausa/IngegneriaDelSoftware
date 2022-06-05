const Partita = require('../models/Partita')
const Utente = require('../models/Utente')
const Squadra = require('../models/Squadra')

// Restituisce TUTTE le partite

async function creaPartita(req, res){            
    var partita = req.body;
    if(req.user.ruolo=="manager"){ //se sono un manager
        if(!partita.casa || !partita.ospite || !partita.arbitro.nome || !partita.arbitro.cognome || !partita.arbitro.codiceFiscale || !partita.fase){
            res.status(403).send({success: false, error: 'Dati mancanti nella richiesta'})
            return
        }
    
        //controllo se esiste squadra di casa
        var casa=await Squadra.findOne({nome:partita.casa})
        if(!casa){
            res.status(400).send({success: false, error: 'squadra di casa non valida'})
            return
        }
    
        //controllo se esiste squadra fuori casa
        var ospite=await Squadra.findOne({nome:partita.ospite})
        if (!ospite){
            res.status(400).send({success: false, error: 'squadra ospite non valida'})
            return
        }
        
        //controllare se esiste arbitro (come lo indico nel frontend?)
        var arbitro=await Utente.findOne({nome:partita.arbitro.nome,cognome:partita.arbitro.cognome,codiceFiscale:partita.arbitro.codiceFiscale})
        if(!arbitro){
            res.status(400).send({success: false, error: 'Arbitro non valido'})
            return
        }
    
        //controlli date!
    
        if(await Partita.findOne({data:partita.data,luogo:partita.luogo})){ //controllo che non ci siano partite nella stessa data nello stesso luogo
            res.status(409).send({success: false, error: 'Partita già esistente per quella data in quel luogo'})
            return
        }
    
        //se la squadra di casa ha un'altra partita in casa quel giorno in un posto diverso
        //o gioca già come ospite 
        var partitaquelgiornocasa=await Partita.findOne({data: partita.data, casa: partita.casa});
        if(partitaquelgiornocasa){
            if (partitaquelgiornocasa.luogo!=partita.luogo|| await Partita.findOne({data:partita.data,ospite:partita.casa})){
                res.status(409).send({success: false, error: 'Conflitto partite per la squadra di casa'})
                return
            }
        }
        
    
        //se la squadra ospite ha un'altra partita in casa quel giorno in un posto diverso
        //o è già ospite in un'altro posto
        var partitaquelgiornoospite=await Partita.findOne({data:partita.data,casa:partita.ospite});
        if(partitaquelgiornoospite){ 
            if (partitaquelgiornoospite.luogo!=partita.luogo|| await Partita.findOne({data:partita.data,ospite:partita.ospite})){
                res.status(409).send({success: false, error: 'Conflitto partite per la squadra ospite'})
                return
            }
        }
    
        var idCasa = casa._id;
        var idOspite = ospite._id;
        var idArbitro= arbitro._id;
    
        console.log("idarbitro="+idArbitro)
    
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
            res.status(200).location("/api/v2/partita/"+nuovaPartita._id).send({success: true, self: "/api/v2/partita/"+nuovaPartita._id})
            return
        })
        .catch(()=>{
            res.status(500).send({success: false, error: "errore durante il salvataggio della partita"})
            return
        })
    }
    else{
        res.status(412).send({success: false, error: 'Utente non autorizzato'})
    }
    
}

module.exports = creaPartita