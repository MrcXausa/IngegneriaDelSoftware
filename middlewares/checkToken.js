const { getAuth } = require('firebase-admin/auth')
const Utente = require('../models/Utente')

const tokenChecker = function(req, res, next) {  // header or url parameters or post parameters  
    var idToken = req.body.token || req.query.token || req.headers['x-access-token'];  

    if (!idToken) 
        res.status(400).json({success: false, message: 'token mancante'})  

    //https://firebase.google.com/docs/auth/admin/verify-id-tokens documentation
    getAuth().verifyIdToken(idToken).then((decodedToken) => {
        mail=decodedToken.email //DA VERIFICARE il tipo di token
        let user = await Utente.findOne({email: mail}).exec();
        if(!user)
            req.status(401).json({success: false, message: 'Email non riconosciuta'});  
        else
            req.user=user

        next();
    })
    .catch((error) => {//token non verificato
        res.status(500).json({success: false, message: 'Errore nel processo di autenticazione'});  
    });
};

module.exports = tokenChecker;
