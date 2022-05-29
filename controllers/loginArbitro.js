const Utente = require('../models/Utente')


async function loginArbitro(req, res) {
    const body = req.body;
    
    if(req.user){
        let user = await Utente.findOne({email: req.user.email, ruolo: 'arbitro'}).exec();
        if(user){ // utente riconosciuto
            res.status(202).json({ success: true }); 
        }
        else{ // utente non riconosciuto
            res.status(403).send({success: false, error: 'L\'utente non è un arbitro'})
            return
        }
    }
    
}

module.exports = loginArbitro