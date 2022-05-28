require('dotenv').config()

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const express = require('express');  
const routerv1 = require('./routerv1.js');
const routerv2 = require('./routerv2.js')
const app = express();  
const mongoose = require('mongoose')
const cors = require('cors')
const firebase_key  = process.env.FIREBASE_PRIVATE_KEY
const admin = require('firebase-admin');

let buff = Buffer.from(firebase_key, 'base64');
let firebase_key_decoded = JSON.parse(buff.toString('ascii'));

admin.initializeApp({
    credential: admin.credential.cert(firebase_key_decoded)
});

var port = process.env.PORT || 8080;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routerv1);  
app.use('/api/v2', routerv2);


var db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to Database"), 
    app.listen(port, () => { console.log(`Server listening`); })
}).catch(()=> {
    console.log("Database connection Error")
});

 