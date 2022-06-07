const Squadra=require("../models/Squadra")
const Torneo =require("../models/Torneo");
const Utente = require("../models/Utente");

async function iscriviSquadra(req,res){
    var squadra=req.params['id']
    if(req.user.ruolo=="manager"){
        let torneo= await Torneo.findOne(); 

        if(!torneo || torneo.stato!="attivo"){
            //sistema risposta
            res.status(406).send({success: false, error: 'Non c\'è un torneo attivo in questo momento'})
            return
        }
    
        if(!squadra){//se non c'è la squadra nel body
            res.status(400).send({success: false, error: 'Squadra non presente nella richiesta'})
            return
        }
    
        //se posso iscrivere ancora squadra
        if(await Squadra.find().count()<torneo.numero_squadre){
            console.log(squadra)
            var team = await Squadra.findByIdAndUpdate(squadra,{approvata:true}) //aggiorno lo stato della squadra
            .then(()=>{ //se è stato aggiornato con successo 
                
                for(var i=0; i<team.giocatori.length;i++){
                     Utente.findByIdAndUpdate(team.giocatori[i],{stato:"approvato"})
                }
                res.status(200).send({success: true})
            })
            .catch((error)=>{ //se non è stato aggiornato ritorno errore
                res.status(500).send({success: false, error:error });
                console.log("ERRORE")
            }); 
           
        }
        else{//se non posso più aggiungere squadre
            res.status(403).send({success: false, error: 'Non è più possibile aggiungere squadre'})
        }
    }
    else{
        res.status(412).send({success: false, error: 'Utente non autorizzato'})
    }
    
}

module.exports=iscriviSquadra;
