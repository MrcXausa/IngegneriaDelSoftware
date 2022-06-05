const Utente = require('../models/Utente')
const Referto = require('../models/Referto')
const Partita = require('../models/Partita')
const Squadra = require("../models/Squadra")

async function inserimentoReferto(req, res) {
    const body = req.body;
    
    if(req.user){
        let user = await Utente.findOne({email: req.user.email, ruolo: 'arbitro'}).exec();
        if(user){ // utente riconosciuto
            //res.status(202).json({ success: true });
            /******
             * 
             * 
             * DA FINIRE
             * 
             * 
             */
        }
        else{ // utente non riconosciuto
            res.status(403).send({success: false, error: 'L\'utente non è un arbitro'})
            return
        }
    }
    
}

module.exports = inserimentoReferto