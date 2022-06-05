const Squadra = require("../models/Squadra");
const Utente = require("../models/Utente");

// Restituisce TUTTE le squadre

async function getSquadre(req, res){            
    let squadre = await Squadra.find({})                                        //GET tutte le Squadre
    let giocatori = await Utente.find({ruolo: 'giocatore'});
    if(squadre){                                                                //Se ci sono squadre                             
        for(i=0;i<squadre.length;i++){                                          //Cicla in tutte le squadre

            for(j=0;j<giocatori.length;j++){                                    //Cicla su ogni giocatore della squadra

                var giocatoreData = await Utente.findById(squadre[i].giocatori[j]); //Variabile GiocatoreData Contiene info riguardo il giocatore[0] della squadra [0] (primo ciclo)
                squadre[i].giocatori[j] = giocatoreData.nome+" "+giocatoreData.cognome;
            }
            
        }

        res.status(200).json(squadre);
    }else{                                      // Se non esistono squadre [squadra=0]
        res.status(406).send({success: false, error: 'Non esistono squadre'})
        return
    }
}

module.exports = getSquadre;