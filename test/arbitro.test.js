const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const { getAuth } = require('firebase-admin/auth')
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
let nonRegUid = "4SvXgxt8f8aT0q5iD81Bx6Ag3MV2" // riccardo.gilli@studenti.unitn.it

let tokenMAF, tokenARB, tokenNonReg

describe('GET /api/v2/arbitro', () => {
    jest.setTimeout(30 * 1000);
    let utenteSpy
    beforeAll( async () => {
        //mongoose.connect(process.env.MONGODB_CONNECTION_STRING) // utilizzo una mock-function, quindi il database non mi serve
        const Utente = require('../models/Utente');
        utenteSpy = jest.spyOn(Utente, 'findOne').mockImplementation((criterias, callback) => {
            let email = criterias.email // filtro email impostato nella call a findOne
            let res
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
            if (criterias.ruolo && res.ruolo != criterias.ruolo) { // se criterias.ruolo vuol dire che sto richiamando la funzione da loginArbitro.js e ho anche il filtro su ruolo
                res = null
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
        let custTokenNonReg = await getAuth().createCustomToken(nonRegUid);
          
        const app = initializeApp(firebase_config);
        let authClient = getAuthClient();
        // uso firebase client per ottenere un token utilizzabile per il login a partire dal custom token
        let arbitro = await signInWithCustomToken(authClient, custTokenARB)
        tokenARB = await arbitro.user.getIdToken()

        let maf = await signInWithCustomToken(authClient, custTokenMAF)
        tokenMAF = await maf.user.getIdToken()

        let nonReg = await signInWithCustomToken(authClient, custTokenNonReg)
        tokenNonReg = await nonReg.user.getIdToken()
    });

    afterAll( () => { 
        //mongoose.connection.close(true); 
        utenteSpy.mockRestore();
    });
    test('GET /api/v2/arbitro with correct arbitro token', () => {
        return request(app)
            .get('/api/v2/arbitro')
            .set({'x-access-token': tokenARB})
            .set('Accept', 'application/json')
            .expect(202, { success: true })
    });
    test('GET /api/v2/arbitro with maf token', function() {
        return request(app)
            .get("/api/v2/arbitro")
            .set('x-access-token', tokenMAF)
            .set('Accept', 'application/json')
            .expect(403, {success: false, error: 'L\'utente non è un arbitro'})
    });
    test('GET /api/v2/arbitro with non-registered user token', function() {
        return request(app)
            .get("/api/v2/arbitro")
            .set('x-access-token', tokenNonReg)
            .set('Accept', 'application/json')
            .expect(401, {success: false, error: 'Email non riconosciuta'})
    });
});