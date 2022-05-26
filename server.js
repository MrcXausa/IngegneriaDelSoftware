require('dotenv').config()

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const express = require('express');  
const router = require('./router.js');
const app = express();  
const mongoose = require('mongoose')
const cors = require('cors')
const privateKeyFirebase  = JSON.parse(process.env.QUATTRO)
const admin = require('firebase-admin');
//console.log(process.env.QUATTRO)
//console.log(privateKeyFirebase)
let firebaseauth={
    type: process.env.UNO,
    project_id: process.env.DUE,
    private_key_id: process.env.TRE,
    private_key: privateKeyFirebase.privatekey,
    client_email: process.env.CINQUE,
    client_id: process.env.SEI,
    auth_uri: process.env.SETTE,
    token_uri: process.env.OTTO,
    auth_provider_x509_cert_url: process.env.NOVE,
    client_x509_cert_url: process.env.DIECI
}
//console.log(firebaseauth)

var port = process.env.PORT || 8080;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);  


var db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING_LOCAL).then(() => {
    console.log("Connected to Database"), 
    app.listen(port, () => { console.log(`Server listening`); })
}).catch(()=> {
    console.log("Database connection Error")
});

 