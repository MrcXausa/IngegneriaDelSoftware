require('dotenv').config()

const app=require("./app")
const { initializeApp, applicationDefault } = require('firebase-admin/app');  
const mongoose = require('mongoose')
const firebase_key  = process.env.FIREBASE_PRIVATE_KEY
const admin = require('firebase-admin');

let buff = Buffer.from(firebase_key, 'base64');
let firebase_key_decoded = JSON.parse(buff.toString('ascii'));

admin.initializeApp({
    credential: admin.credential.cert(firebase_key_decoded)
});

var port = process.env.PORT || 8080;


var db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to Database"), 
    app.listen(port, () => { console.log(`Server listening`); })
}).catch(()=> {
    console.log("Database connection Error")
});

 