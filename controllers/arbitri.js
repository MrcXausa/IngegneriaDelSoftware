const Utente = require('../models/Utente')

async function getArbitri(req, res) {
    let filters = {ruolo: 'arbitro'}
    if ('approvato' in req.query) {
        filters.approvato = req.query.approvato
    }
    let arbitri = await Utente.find(filters).sort({cognome: 'asc'}).exec();

    res.send({success: true, data: arbitri});
}

async function approvaArbitro(req, res) {
    if (req.user.ruolo != "manager") {
        res.status(403).send({success: false, error: 'Questa operazione è riservata al MAF'})
        return;
    }

    let id = req.params.id;
    let arbitro = await Utente.findOne({ruolo: 'arbitro', approvato: false, _id: id}).exec();

    if (!arbitro) {
        res.status(404).send({success: false, error: 'Arbitro da approvare non trovato'});
        return;
    }

    arbitro.approvato = true;
    await arbitro.save();
    res.send({success: true});
}

module.exports = {
    getArbitri,
    approvaArbitro
}