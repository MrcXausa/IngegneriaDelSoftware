const Squadra = require("../models/Squadra");
const Utente = require("../models/Utente");

// Restituisce TUTTE le squadre

async function getSquadre(req, res){ 
    let squadre = await Squadra.find({approvata : true}).sort({ 'punteggio' : -1 }).exec();     //GET tutte le Squadre ({approvata:'true'})
    
    if(squadre){                                                                           // Se ci sono squadre                             
        res.status(200).json(squadre);
    }else{                                                                                 // Se non esistono squadre [squadra=0]
        res.status(406).send({success: false, error: 'Non esistono squadre'})
        return
    }
}

module.exports = getSquadre;