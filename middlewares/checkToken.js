const { getAuth } = require('firebase-admin/auth')
const Utente = require('../models/Utente')

const tokenChecker = function(req, res, next) {  // header or url parameters or post parameters  
    var idToken = req.body.token || req.query.token || req.headers['x-access-token'];  

    if (!idToken){
        res.status(400).json({success: false, error: 'token mancante'})
        return
    }
          

    
    getAuth().verifyIdToken(idToken).then((decodedToken) => {
        email = decodedToken.email //DA VERIFICARE il tipo di token
        let user = Utente.findOne({email}, function(err, user) {
            if(!user)
                res.status(401).json({success: false, error: 'Email non riconosciuta'});  
            else
                req.user = user
                next();
        });
    })
    .catch((error) => { //token non verificato
        res.status(500).json({success: false, error: 'Errore nel processo di autenticazione'});  
    });
};

module.exports = tokenChecker;
