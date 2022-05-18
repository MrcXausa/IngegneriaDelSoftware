require('dotenv').config()

const express = require('express');  
const router = require('./router.js');
const app = express();  
const mongoose = require('mongoose')

var port = process.env.PORT || 3000;

// Handling GET requests  
app.use('/v1', router);  

//username:admin
//psw: Adminsw
var db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
        console.log("Connected to Database"), 
        app.listen(8080, () => { console.log(`Server listening`); })
}).catch(()=> {
    console.log("Database connection Error")
});

 