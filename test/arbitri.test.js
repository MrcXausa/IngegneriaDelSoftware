const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const { getAuth, UserInfo } = require('firebase-admin/auth')
const {initializeApp} = require('firebase/app')
const getAuthClient = require('firebase/auth').getAuth
const { signInWithCustomToken } = require('firebase/auth')
const firebase_key  = process.env.FIREBASE_PRIVATE_KEY
const firebaseConfig = process.env.FIREBASE_CLIENT_CONFIG
const admin = require('firebase-admin');
let buffAdm = Buffer.from(firebase_key, 'base64');
let buffCli = Buffer.from(firebaseConfig, 'base64');
let firebase_key_decoded = JSON.parse(buffAdm.toString('ascii'));
let firebase_config = JSON.parse(buffCli.toString('ascii'));

admin.initializeApp({
    credential: admin.credential.cert(firebase_key_decoded)
});

let MAFUid = "VKNW4pJf9hegAgnhRKlAZBMwYLD3" // mafids2022@gmail.com
let ARBUid = "1uAIwN9fz7XW6dMROa4vomEiByz2" // arbitroids2022@gmail.com

let arbitri = [{
    "_id": "6291ed8240877df756da8cc5",
    "nome": "Massimiliano",
    "cognome": "Irrati",
    "codiceFiscale": "RRTMSM79H27D612F",
    "email": "arbitro@gmail.com",
    "ruolo": "arbitro",
    "sezione": "Pistoia",
    "codicePatentino": "123",
    "approvato": true
  },{
    "_id": "6291ed9940877df756da8ccb",
    "nome": "Daniele",
    "cognome": "Chiffi",
    "codiceFiscale": "CHFDNL84T14G224Y",
    "email": "arbitro2@gmail.com",
    "ruolo": "arbitro",
    "sezione": "Padova",
    "codicePatentino": "456",
    "approvato": true
  },{
    "_id": "629a146360f80345d5291a7f",
    "nome": "Leonardo",
    "cognome": "Bonucci",
    "codiceFiscale": "BNCLRD87E01M082X",
    "email": "leobonucci@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 1
  },{
    "_id": "629a15e960f80345d5291a80",
    "nome": "Federico",
    "cognome": "Chiesa",
    "codiceFiscale": " CHSFRC97R25D969L",
    "email": "fedexchiesa97@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 0
  },{
    "_id": "629a170060f80345d5291a81",
    "nome": "Manuel",
    "cognome": "Locatelli",
    "codiceFiscale": "LCTMNL98A08L407T",
    "email": "manuellocatelli8@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 5
  },{
    "_id": "629a1e0260f80345d5291a82",
    "nome": "Matteo",
    "cognome": "Pessina",
    "codiceFiscale": "PSSMTT97D21A087L",
    "email": "matteopessina12@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 7
  },{
    "_id": "629a1f3160f80345d5291a83",
    "nome": "Davide",
    "cognome": "Zappacosta",
    "codiceFiscale": "ZPCDVD92H11I838Z",
    "email": "zappacostadavide64@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 0
  },{
    "_id": "629a20cf60f80345d5291a84",
    "nome": "Alessandro",
    "cognome": "Bastoni",
    "codiceFiscale": "BSTLSN99D13B898F",
    "email": "alebastoni99@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 0
  },{
    "_id": "629a215660f80345d5291a85",
    "nome": "Nicolo",
    "cognome": "Barella",
    "codiceFiscale": "BRLNCL97B07B354N",
    "email": "nicobarella97@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 2
  },{
    "_id": "629a226ef5a9650e7f9f6398",
    "nome": "Alessandro",
    "cognome": "Florenzi",
    "codiceFiscale": "FLRLSN91C11H501M",
    "email": "aleflorenzi91@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 1
  },{
    "_id": "629a22d8f5a9650e7f9f6399",
    "nome": "Sandro",
    "cognome": "Tonali",
    "codiceFiscale": " TNLSDR00E08E648O",
    "email": "sandronetonali1@gmail.com",
    "ruolo": "giocatore",
    "stato": "approvato",
    "reti": 1
  },{
    "_id": "629c8f5bff92044a6e423197",
    "nome": "Marco",
    "cognome": "Xausa",
    "codiceFiscale": "placeholder",
    "email": "mafids2022@gmail.com",
    "ruolo": "manager"
  },{
    "_id": "629f26f5ff3c4c35a286e6b4",
    "nome": "Giovanni",
    "cognome": "Di Lorenzo",
    "codiceFiscale": "DLRGNN93M04E715V",
    "email": "dilorenzogiovanni@gmail.com",
    "ruolo": "giocatore",
    "stato": "in_attesa",
    "reti": 0
  },{
    "_id": "629f28b9ff3c4c35a286e6b5",
    "nome": "Alex",
    "cognome": "Meret",
    "codiceFiscale": "MRTLXA97C22L483E",
    "email": "alexmeret1@gmail.com",
    "ruolo": "giocatore",
    "stato": "in_attesa",
    "reti": 0
  },{
    "_id": "629f29d2ff3c4c35a286e6b6",
    "nome": "Stefano",
    "cognome": "Sturaro",
    "codiceFiscale": "STRSFN93C09I138H",
    "email": "stefanoilmacellaio@gmail.com",
    "ruolo": "giocatore",
    "stato": "in_attesa",
    "reti": 0
  },{
    "_id": "629f2a6eff3c4c35a286e6b7",
    "nome": "Domenico",
    "cognome": "Criscito",
    "codiceFiscale": "CRSDNC86T30C495F",
    "email": "domenicocr11@gmail.com",
    "ruolo": "giocatore",
    "stato": "in_attesa",
    "reti": 0
  },{
    "_id": "629f4b5abeca0a32c0094d6d",
    "nome": "Luca",
    "cognome": "Argentero",
    "codiceFiscale": "LCUARG99P17L876M",
    "email": "arbitroids2022@gmail.com",
    "ruolo": "arbitro",
    "sezione": "Marostica",
    "codicePatentino": "codicepatentino",
    "approvato": false
}]

let tokenMAF, tokenARB

describe('PUT /arbitri/:id/approva', () => {
    jest.setTimeout(30 * 1000);
    let utenteSpy, saveSpy
    beforeAll( async () => {
        //mongoose.connect(process.env.MONGODB_CONNECTION_STRING) // utilizzo una mock-function, quindi il database non mi serve
        const Utente = require('../models/Utente');
        utenteSpy = jest.spyOn(Utente, 'findOne').mockImplementation((criterias, callback) => {
            let res = null
            let email = criterias.email // filtro email impostato nella call a findOne
            let _id = criterias._id
            let ruolo = criterias.ruolo
            let approvato = criterias.approvato
            if (email) { // sono nel checkToken
                switch (email) {
                    case "mafids2022@gmail.com":
                        res = {
                            nome:"Marco",
                            cognome:"Xausa",
                            codiceFiscale:"placeholder",
                            email:"mafids2022@gmail.com",
                            ruolo:"manager",
                        }
                        break;
                    case "arbitroids2022@gmail.com":
                        res = {
                            nome:"Luca",
                            cognome:"Argentero",
                            codiceFiscale:"LCUARG99P17L876M",
                            email:"arbitroids2022@gmail.com",
                            ruolo:"arbitro",
                            sezione:"Marostica",
                            codicePatentino:"codicepatentino",
                            approvato:true,
                        }
                        break;
                    default:
                        res = null
                        break;
                }
            }

            if (_id && ruolo) {
                res = []
                arbitri.forEach((arbitro) => {
                    if (arbitro._id == _id && arbitro.ruolo == ruolo && arbitro.approvato == approvato) {
                        arbitro.save = function() {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  resolve(true);
                                }, 100);
                              })
                        }
                        res.push(arbitro)
                    }
                })
                if (!res.length) {
                    res = null
                } else if (res.length == 1) {
                    res = res[0]
                }
            }
            
            if (callback) { // secondo argomento callback, checkToken
                callback(null, res);
            } else { // no secondo argomento, chiamo exec sul risultato di questa funzione
                return {exec: function() {return res}}
            }
        });

        // uso firebase admin per creare un custom token a partire dagli UID degli utenti
        let custTokenMAF = await getAuth().createCustomToken(MAFUid);
        let custTokenARB = await getAuth().createCustomToken(ARBUid);
          
        const app = initializeApp(firebase_config);
        let authClient = getAuthClient();
        // uso firebase client per ottenere un token utilizzabile per il login a partire dal custom token
        let arbitro = await signInWithCustomToken(authClient, custTokenARB)
        tokenARB = await arbitro.user.getIdToken()

        let maf = await signInWithCustomToken(authClient, custTokenMAF)
        tokenMAF = await maf.user.getIdToken()
    });

    afterAll( () => { 
        //mongoose.connection.close(true); 
        utenteSpy.mockRestore();
    });
    test('PUT /arbitri/:id/approva with maf user (correct)', () => {
        return request(app)
            .put('/api/v2/arbitri/629f4b5abeca0a32c0094d6d/approva')
            .set({'x-access-token': tokenMAF})
            .set('Accept', 'application/json')
            .expect(200, { success: true })
    });
    test('PUT /arbitri/:id/approva with non-maf user', function() {
        return request(app)
            .put("/api/v2/arbitri/629f4b5abeca0a32c0094d6d/approva")
            .set('x-access-token', tokenARB)
            .set('Accept', 'application/json')
            .expect(403, {success: false, error: 'Questa operazione è riservata al MAF'})
    });
    test('PUT /arbitri/:id/approva for user that is not a arbitro or that has already been approved', function() {
        return request(app)
            .put("/api/v2/arbitri/629a146360f80345d5291a7f/approva")
            .set('x-access-token', tokenMAF)
            .set('Accept', 'application/json')
            .expect(404, {success: false, error: 'Arbitro da approvare non trovato'})
    });
});