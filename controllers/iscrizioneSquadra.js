const Squadra=require("../models/Squadra")
const Torneo =require("../models/Torneo")

async function iscriviSquadra(req,res){
    body=req.body //body .squadra contiene l'id univoco della squadra da approvare
    let torneo=Torneo.findOne();

    if(!torneo || torneo.stato!="attivo"){
        //sistema risposta
        res.status(400)
        return
    }

    if(!body.squadra){//se non c'è la squadra nel body
        res.status(400).send({success: false, error: 'Squadra non presente nella richiesta'})
        return
    }

    //se posso iscrivere ancora squadra
    if(Squadra.find().count()<torneo.numero_squadre){
        Squadra.updateOne({_id:body.squadra},{approvata:"true"}); //aggiorno lo stato della squadra
        res.status(200).send({success: false, self:"/api/v2/squadre" + body.squadra._id })
        return
    }
    else{//se non posso più aggiungere squadre

    }
        
    
}
