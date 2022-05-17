const express = require('express');  
const router = require('./router.js');
const app = express();  
const mongoose =require('mongoose')

var port=3000;

// Handling GET requests  


app.use('/', router);  

//username:admin
//psw: Adminsw

var db = mongoose.connect('mongodb+srv://admin:Adminsw@ingegneriasw.shvnz.mongodb.net/?retryWrites=true&w=majority').then ( () => {
    console.log("Connected to Database"), 
    app.listen(8080, () => { console.log(`Server listening`);
})
}).catch(()=> {
    console.log("Database connection Error")
});

 