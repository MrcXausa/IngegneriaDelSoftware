const Utente = require('../models/Utente')
const Referto = require('../models/Referto')
const Partita = require('../models/Partita')
const Squadra = require("../models/Squadra")

async function inserimentoReferto(req, res) {
    var referto = req.body;
    
    if(req.user.ruolo == "arbitro"){
        // Se manca la partita di riferimento nella richiesta di inserimento
        if(!referto.partitaRiferimento){            
            res.status(400).send({success: false, error: 'Partita non indicata nella richiesta'})
            return
        // Dato inerente ai gol della squadra di casa o trasferta mancante 
        }else if(!referto.goalCasa || !referto.goalOspite){
            res.status(403).send({success: false, error: 'Dati dei gol segnati mancanti'})
            return
        // Controllo che la somma gol casa e gol ospite non sia diversa dal numero di marcatori(AUTOGOL NON AMMESSI)
        }else if((Number(referto.goalCasa)+Number(referto.goalOspite)) != referto.marcatori.length){
            res.status(403).send({success: false, error: 'Numero di marcatori totali diverso dai gol totali'})
            return
        }
        // Controllo che il referto non sia già stato inserito
        var refertoCheck = await Referto.findOne({partitaRiferimento:referto.partitaRiferimento})
        if(refertoCheck){
            res.status(400).send({success: false, error: 'Referto già esistente!'})
            return
        }

        // Controllo che non sia pareggio nel caso in cui sia partita di tabellone
        var match = await Partita.findById( referto.partitaRiferimento);
        if((match.fase == "tabellone")){
            if(Number(referto.goalCasa)==Number(referto.goalOspite)){
                res.status(403).send({success: false, error: 'La partita di tabellone finale non può terminare in pareggio'})
                return
            }
        }     
        // Variabili per inserire in DB
        var idRef = referto._id;
        var partitaRif = referto.partitaRiferimento;
        var scCasa= referto.goalCasa;
        var scOspite= referto.goalOspite;
        const marcat = referto.marcatori;
    
        var nuovoReferto = new Referto({
            _id: idRef,
            partitaRiferimento: partitaRif,
            goalCasa: scCasa,
            goalOspite: scOspite,
            marcatori: marcat
            
        })

        await nuovoReferto.save()
        .catch(()=>{
            res.status(500).send({success: false, error: "Errore durante il salvataggio del Referto"})
            return
        })
        

        const sqCasa = match.casa;
        const sqOspite = match.ospite;
        const fase = match.fase;

        if(scCasa==scOspite){   //Caso Pareggio
            try{
                await Squadra.findByIdAndUpdate(            
                    sqCasa,{ $inc: {giocate: 1, 
                                    pareggiate: 1,
                                    punteggio: 1}
                            }
                )
                await Squadra.findByIdAndUpdate(           
                    sqOspite,{ $inc: { giocate: 1, 
                                    pareggiate: 1,
                                    punteggio: 1} 
                            }                
                )

                // Update Gol Giocatore
                for(i=0;i<marcat.length;i++){ 
                    await Utente.findByIdAndUpdate( marcat[i],{ $inc: {reti: 1} })
                }
                res.status(200).location("/api/v2/referto/"+nuovoReferto._id).send({success: true, self: "/api/v2/referto/"+nuovoReferto._id})       
            }catch(error) {
                res.status(500).send({success: false, error:error });
            }
        }
        
        if(scCasa>scOspite && fase != "tabellone"){  //Caso Casa vincente
            try{
                await Squadra.findByIdAndUpdate(            
                    sqCasa,{ $inc: {giocate: 1,
                                    vinte: 1,
                                    punteggio: 3}
                            }
                )
                await Squadra.findByIdAndUpdate(           
                    sqOspite,{ $inc: { giocate: 1, 
                                    perse: 1,} 
                            }                
                )
                // Update Gol Giocatore
                for(i=0;i<marcat.length;i++){ 
                    await Utente.findByIdAndUpdate( marcat[i],{ $inc: {reti: 1} })
                    console.log("Giocatore [",marcat[i], "] aggiunto" )
                }
                res.status(200).location("/api/v2/referto/"+nuovoReferto._id).send({success: true, self: "/api/v2/referto/"+nuovoReferto._id})              
            }catch(error) {
                res.status(500).send({success: false, error:error });
            }            
        }

        if(scCasa<scOspite && fase != "tabellone"){  //Caso Ospite vincente
            try{
                await Squadra.findByIdAndUpdate(            
                    sqCasa,{ $inc: {giocate: 1,
                                    perse: 1}
                            }
                )
                await Squadra.findByIdAndUpdate(           
                    sqOspite,{ $inc: { giocate: 1, 
                                    vinte: 1,
                                    punteggio: 3} 
                            }                
                )
                // Update Gol Giocatore
                for(i=0;i<marcat.length;i++){ 
                    await Utente.findByIdAndUpdate( marcat[i],{ $inc: {reti: 1} })
                }
                res.status(200).location("/api/v2/referto/"+nuovoReferto._id).send({success: true, self: "/api/v2/referto/"+nuovoReferto._id})           
            }catch(error) {
                res.status(500).send({success: false, error:error });
            }            
        }            
    }
    else{
        res.status(412).send({success: false, error: 'Utente non autorizzato'})
    }
}
module.exports = inserimentoReferto