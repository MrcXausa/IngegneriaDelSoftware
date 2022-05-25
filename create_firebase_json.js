require('dotenv').config()

const fs = require('fs')


let path="firebase-key.json"
let data={
    type: process.env.UNO,
    project_id: process.env.DUE,
    private_key_id: process.env.TRE,
    private_key: process.env.QUATTRO,
    client_email: process.env.CINQUE,
    client_id: process.env.SEI,
    auth_uri: process.env.SETTE,
    token_uri: process.env.OTTO,
    auth_provider_x509_cert_url: process.env.NOVE,
    client_x509_cert_url: process.env.DIECI
}
try {
    fs.writeFileSync(path, JSON.stringify(data))
    console.log("file creato")
} catch (err) {
    console.log("IMPOSSIBILE SALVARE FILE\N")
    console.error(err)
}
