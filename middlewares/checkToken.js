

const tokenChecker = function(req, res, next) {  // header or url parameters or post parameters  
    var idToken = req.body.token || req.query.token || req.headers['x-access-token'];  

    if (!idToken) 
        res.status(401).json({success:false,message:'No token provided.'})  

    //https://firebase.google.com/docs/auth/admin/verify-id-tokens documentation
    defaultAuth.verifyIdToken(idToken).then((decodedToken) => {//problema funzione getAuth
        const uid = decodedToken.uid;
        //token verificato
        next();
    })
    .catch((error) => {//token non verificato
        console.log("token non verificato")
        res.status(403).json({success:false,message:'Token not valid'});  
    });
};

module.exports = tokenChecker;