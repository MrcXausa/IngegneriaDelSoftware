const express = require('express');  
const router = require('./router.js');
const app = express();  
const mongoose =require('mongoose')
var port=3000;

// Handling GET requests  


app.use('/', router);  


//running web server. Database connection still missing (to be added later on)
//database part hasn't been implemented because i haven't checked it yet

//string must be modified with the password 
mongoose.connect('mongodb+srv://master:<password>@cluster0.8rtid.mongodb.net/Cluster0?retryWrites=true&w=majority').then(()=>{    
    app.listen(port, function() {  
    console.log('Server running on port ', 3000);  
    });}
).catch(()=>{
    console.log('connection refused')
});
