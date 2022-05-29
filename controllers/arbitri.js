const Utente = require('../models/Utente')

async function getArbitri(req, res) {
    let filterApprovato = ('approvato' in req.query) ? req.query.approvato : false;
    let arbitri = await Utente.find({ruolo: 'arbitro', approvato: filterApprovato})
        .sort({cognome: 'asc'}).exec();

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