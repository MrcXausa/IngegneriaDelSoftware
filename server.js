const express = require('express');  
const router = require('./router.js');
const app = express();  
const mongoose = require('mongoose')

var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', router);  

//username:admin
//psw: Adminsw
var db = mongoose.connect('mongodb+srv://admin:Adminsw@ingegneriasw.shvnz.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log("Connected to Database"), 
        app.listen(port, () => { console.log(`Server listening`); })
}).catch(()=> {
    console.log("Database connection Error")
});

 