const { getAuth } = require('firebase-admin/auth')

const tokenChecker = function(req, res, next) {  // header or url parameters or post parameters  
    var idToken = req.body.token || req.query.token || req.headers['x-access-token'];  

    if (!idToken) 
        res.status(401).json({success: false, message: 'La risorsa richiesta richiede l\'autenticazione'})  

    //https://firebase.google.com/docs/auth/admin/verify-id-tokens documentation
    getAuth().verifyIdToken(idToken).then((decodedToken) => {//problema funzione getAuth
        const uid = decodedToken.uid;
        // todo: verificare che l'email contenuta nel token corrisponda all'email di un utente. se si, popolare req.user
        next();
    })
    .catch((error) => {//token non verificato
        res.status(403).json({success: false, message: 'Errore nel processo di autenticazione'});  
    });
};

module.exports = tokenChecker;