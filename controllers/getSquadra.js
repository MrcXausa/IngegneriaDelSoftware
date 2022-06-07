const Squadra = require("../models/Squadra")

async function getSquadra(req,res){
    var idSquadra=req.params['id']

    if(!idSquadra){//se la squadra non è presente  nell'url
        res.status(406).send({success: false, error: 'Codice squadra non presente nella richiesta'})
        return
    }
    var squadra = await Squadra.findById(idSquadra)
    if(!squadra){ // se non è stata trovata una squadra con quell'id
        res.status(401).send({success: false, error: 'Il codice fornito non appartiene ad una squadra'})
        return
    }

    //se la squadra è stata trovata lo invio nella risposta
    res.status(200).json(squadra)
}
module.exports=getSquadra;