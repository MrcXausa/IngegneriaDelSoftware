const Partita = require('../models/Partita')
const Squadra=require("../models/Squadra")
const Utente =require("../models/Utente")

// Restituisce TUTTE le partite

async function getPartite(req, res){            
    const partite = await Partita.find({})      // GET TUTT le partite


    if(partite){   //se ci sono le partite                             
        for(var i=0;i<partite.length;i++){ //recupero i dati relativi a squadre a arbitro
            var casa= await Squadra.findById(partite[i].casa)
            var ospite =await Squadra.findById(partite[i].ospite)
            var arbitro= await Utente.findById(partite[i].arbitro)

            if(!arbitro || !casa || !ospite){
                res.status(400).send({success: false, error: 'Errore nei dati delle partite'})
                return
            }

            partite[i].casa=casa.nome;
            partite[i].ospite=ospite.nome;
            partite[i].arbitro = arbitro.nome+" "+arbitro.cognome;
        }
        res.status(200).json(partite);
    }else{                                      // Se non esistono partite [partita=0]
        res.status(406).send({success: false, error: 'Non esistono partite'})
        return
    }
}

module.exports = getPartite