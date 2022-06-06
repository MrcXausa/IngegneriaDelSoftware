const Utente = require('../models/Utente')
const Referto = require('../models/Referto')
const Partita = require('../models/Partita')
const Squadra = require("../models/Squadra")

async function inserimentoReferto(req, res) {
    var referto = req.body;
    
    if(req.user.ruolo == "arbitro"){
        // Se manca la partita di riferimento nella richiesta di inserimento
        if(!referto.partitaRiferimento){            
            res.status(400).send({success: false, error: 'Partita non indicata nella richiesta'})
            return
        // Dato inerente ai gol della squadra di casa o trasferta mancante 
        }else if(!referto.goalCasa || !referto.goalOspite){
            res.status(403).send({success: false, error: 'Dati dei gol segnati mancanti'})
            return
        // Controllo che la somma gol casa e gol ospite non sia diversa dal numero di marcatori(AUTOGOL NON AMMESSI)
        }else if((Number(referto.goalCasa)+Number(referto.goalOspite)) != referto.marcatori.length){
            res.status(403).send({success: false, error: 'Numero di marcatori totali diverso dai gol totali'})
            return
        }
        // Controllo che il referto non sia già stato inserito
        var refertoCheck = await Referto.findOne({partitaRiferimento:referto.partitaRiferimento})
        if(refertoCheck){
            res.status(400).send({success: false, error: 'Referto già esistente!'})
            return
        }

        // Controllo che non sia pareggio nel caso in cui sia partita di tabellone
        var match = await Partita.findById( referto.partitaRiferimento);
        if((match.fase == "tabellone")){
            if(Number(referto.goalCasa)==Number(referto.goalOspite)){
                res.status(403).send({success: false, error: 'La partita di tabellone finale non può terminare in pareggio'})
                return
            }
        }     
        // Variabili per inserire in DB
        var idRef = referto._id;
        var partitaRif = referto.partitaRiferimento;
        var scCasa= referto.goalCasa;
        var scOspite= referto.goalOspite;
    
        var nuovoReferto = new Referto({
            _id: idRef,
            partitaRiferimento: partitaRif,
            goalCasa: scCasa,
            goalOspite: scOspite
        })

        nuovoReferto.save()
        .then(()=>{
            res.status(200).location("/api/v2/referto/"+nuovoReferto._id).send({success: true, self: "/api/v2/referto/"+nuovoReferto._id})
            return
        })
        .catch(()=>{
            res.status(500).send({success: false, error: "Errore durante il salvataggio del Referto"})
            return
        })
    }
    else{
        res.status(412).send({success: false, error: 'Utente non autorizzato'})
    }
}
module.exports = inserimentoReferto