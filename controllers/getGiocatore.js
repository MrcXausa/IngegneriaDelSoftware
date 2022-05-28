const Utente = require ("../models/Utente")

async function getGiocatore(req,res){
    var body = req.pabody
    var idGiocatore=req.params['id']

    if(!idGiocatore){//se il giocatore non è presente  nell'url
        res.status(406).send({success: false, error: 'Codice giocatore non presente nella richiesta'})
        return
    }
    var giocatore = await Utente.findById(giocatore)
    if(!giocatore){ // se non è stato trovato un giocatore con quell'id
        res.status(401).send({success: false, error: 'Il codice fornito non appartiene ad un giocatore'})
        return
    }

    //se il giocatore è stato trovato lo invio nella risposta
    res.status(200).json(giocatore)

}

module.exports=getGiocatore;