const Squadra= require ("../models/Squadra")
const Torneo=require("../models/Torneo")

async function mostraIscrizioniSquadre(req,res){
    if(req.user.ruolo=="manager"){
        //trovo tutte le squadre non approvate
        let iscrizioni= await Squadra.find({approvata:'false'});

        if(iscrizioni){//se ci sono iscrizioni non approvate    
            let torneo= await Torneo.findOne();
            if(torneo && torneo.stato=="attivo")//se esiste un torneo ed è in stato avviato invio le iscrizioni
                res.status(200).json(iscrizioni);
            else //altrimenti ritorno un'errore
                res.status(403).send({success: false, error: 'non esiste un torneo in stato avviato'})      
        }
        else{ //se non ci sono iscrizioni da approvare ritorno stato ok ma con testo "nessuna iscrizione"
            res.status(406).send({success: false, error: 'non ci sono iscrizioni al momento'})
            //DA VERIFICARE LA RISPOSTA
        }
    }
    else{
        res.status(412).send({success: false, error: 'Utente non autorizzato'})
    }
    
}

module.exports= mostraIscrizioniSquadre