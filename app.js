const express = require('express');  
const routerv1 = require('./routerv1.js');
const routerv2 = require('./routerv2.js')
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', routerv1);  
app.use('/api/v2', routerv2);

module.exports=app;