const Partita = require('../models/Partita')

// Restituisce TUTTE le partite

async function getPartite(req, res){            
    const partite = await Partita.find({})      // GET TUTT le partite
    console.log(partite);

    if(partite){                                // Se esiste almeno una partita [partita!=0]
        res.status(200).json(partite);
    }else{                                      // Se non esistono partite [partita=0]
        res.status(404).send({success: false, error: 'Non esistono partite'})
        return
    }
}

module.exports = getPartite