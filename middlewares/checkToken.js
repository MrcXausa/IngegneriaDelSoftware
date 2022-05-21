const admin = require('firebase-admin');
//const getAuth=require('firebase-admin/auth')

const tokenChecker = function(req, res, next) {  // header or url parameters or post parameters  
    var idToken = req.body.token || req.query.token || req.headers['x-access-token'];  

    if (!idToken) 
        res.status(401).json({success:false,message:'No token provided.'})  

    //https://firebase.google.com/docs/auth/admin/verify-id-tokens documentation
    admin.Auth().verifyIdToken(idToken).then((decodedToken) => {//problema funzione getAuth
        const uid = decodedToken.uid;
        //token verificato
        next();
    })
    .catch((error) => {//token non verificato
        console.log("tocken non verificato")
        res.status(403).json({success:false,message:'Token not valid'});  
    });
};

module.exports = tokenChecker;