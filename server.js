const express = require('express');  
const router = require('./router.js');
const app = express();  
var port=3000;

// Handling GET requests  


app.use('/', router);  


//running web server. Database connection still missing (to be added later on)
//database part hasn't been implemented because i haven't checked it yet
app.listen(port, function() {  
    console.log('Server running on port ', 3000);  
});