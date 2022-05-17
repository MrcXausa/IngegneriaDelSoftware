const express = require('express');  
const router = require('./router.js');
const app = express();  
const mongoose =require('mongoose')

var port=3000;

// Handling GET requests  


app.use('/', router);  

//running web server. Database connection still missing (to be added later on)
//database part hasn't been implemented because i haven't checked it yet

//username:admin
//psw: Adminsw

//string must be modified with the password 
var db = mongoose.connect('mongodb+srv://admin:Adminsw@ingegneriasw.shvnz.mongodb.net/?retryWrites=true&w=majority'
).then ( () => {console.log("Connected to Database"), app.listen(8080, () => { console.log(`Server listening`);})
}).catch(()=> console.log("Database connection Error"));

 