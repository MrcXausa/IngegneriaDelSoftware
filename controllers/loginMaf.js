const { ignore } = require('nodemon/lib/rules');
const Utente = require('../models/Utente')


async function loginMaf(req, res) {
    const body = req.body;
    
    if(req.user){ //se nella risposta è stato inserito dal middleware un'utente
        let dbMaf = await Utente.findOne({email: req.user.email, ruolo: 'manager'}).exec();
        if(dbMaf){//maf riconosciuto
            //dummy response
            res.status(202).json({ success: true }); 
        }
        else{//email not fount
            res.status(403).send({success: false, error: 'utente non amministratore'})
            return
        }
    }
    
}

module.exports = loginMaf