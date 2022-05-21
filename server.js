require('dotenv').config()

const express = require('express');  
const router = require('./router.js');
const mongoose = require('mongoose')
const admin = require('firebase-admin/app');



admin.initializeApp();
const app = express();  


const checkToken= require('./middlewares/checkToken.js')





var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkToken)
app.use('/api/v1', router);  

//username:admin
//psw: Adminsw
var db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
        console.log("Connected to Database"), 
        app.listen(port, () => { console.log(`Server listening`); })
}).catch(()=> {
    console.log("Database connection Error")
});
app.listen(port, () => { console.log(`Server listening`); })
 