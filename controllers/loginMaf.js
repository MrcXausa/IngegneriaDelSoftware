const Utente = require('../models/Utente')


async function loginMaf(req, res) {
    const body = req.body;
    //if there's no email
    if(!body.email){
        res.status(400).send({success: false, error: 'email non inserita'})
        return
    }

    //if the email is present in the request
    //search for the email in the database
    let dbMaf = await Utente.findOne({email: body.email, ruolo: 'manager'}).exec();
    if(dbMaf){//if the email is found

        

    }
    else{//email not fount CHECK CODICE ERRORE
        res.status(500).send({success: false, error: 'email non riconosciuta dal sistema'})
        return
    }
}

module.exports = loginMaf