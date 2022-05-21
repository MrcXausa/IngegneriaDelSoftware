require('dotenv').config()

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const express = require('express');  
const router = require('./router.js');
const app = express();  
const mongoose = require('mongoose')
const cors = require('cors')

const admin = require('firebase-admin');

initializeApp({
    credential: applicationDefault(),
});

var port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);  

//username:admin
//psw: Adminsw
var db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
        console.log("Connected to Database"), 
        app.listen(port, () => { console.log(`Server listening`); })
}).catch(()=> {
    console.log("Database connection Error")
});

 