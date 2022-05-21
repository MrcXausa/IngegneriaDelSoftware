require('dotenv').config()

const { initializeApp } = require('firebase-admin/app');
const express = require('express');  
const router = require('./router.js');
const mongoose = require('mongoose')
const admin = require('firebase-admin');
const tokenChecker = require('./middlewares/checkToken');

var serviceAccount = require("C:/Users/marco/Downloads/ingegneria-del-software-mmr-firebase-adminsdk-tvg9v-4dd73368e7.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
console.log(admin)
let defaultAuth = getAuth(admin);

const app = express();  
var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(tokenChecker)
app.use('/api/v1', router);  

//username:admin
//psw: Adminsw
var db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
        console.log("Connected to Database"), 
        app.listen(port, () => { console.log(`Server listening`); })
}).catch(()=> {
    console.log("Database connection Error")
});

 