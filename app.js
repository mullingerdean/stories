const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express(); 

//Passport Config
require('./config/passport')(passport);

const auth = require('./routes/auth'); 

const port = process.env.PORT || 5000; 

app.get('/', (req, res) =>{
    res.send('it works'); 
}); 

app.use('/auth', auth); 

app.listen(port, () =>{
    console.log(`Appliction started on port: ${port}`); 
} )

