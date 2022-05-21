const { ignore } = require('nodemon/lib/rules');
const Utente = require('../models/Utente')


async function loginMaf(req, res) {
    const body = req.body;
    
    /*
    if(!body.user){
        res.status(400).send({success: false, error: 'email non inserita'})
        return
    }
    */
    if(body.user){
        let dbMaf = await Utente.findOne({email: body.user.email, ruolo: 'manager'}).exec();
        if(dbMaf){//maf riconosciuto
            //dummy response
            res.status(202).json({ success: true, message: 'Login avvenuto con successo'}); 
        }
        else{//email not fount CHECK CODICE ERRORE
            res.status(403).send({success: false, error: 'utente non amministratore'})
            return
        }
    }
    
}

module.exports = loginMaf