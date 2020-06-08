const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const session = require('express-session'); 
const passport = require('passport');

//Passport Config
require('./config/passport')(passport);

//Load keys file 
const keys = require('./config/keys'); 

//Mongoose connect
mongoose.connect(keys.mongoURI, {
    useMongoClient: true
})
.then( ()  => console.log('MongoDB Connected ...'))
.catch(err => console.log(err)); 

const app = express(); 

const auth = require('./routes/auth'); 


app.get('/', (req, res) =>{
    res.send('it works'); 
}); 

app.get('/', (req, res) =>{
    res.send('it works'); 
}); 
app.use(cookieParser); 
app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: false
})); 

//Passport Middleware 
app.use(passport.initialize()); 
app.use(passport.session()); 
//User Routtes 
app.use('/auth', auth); 

const port = process.env.PORT || 5000; 
 
app.listen(port, () =>{
    console.log(`Appliction started on port: ${port}`); 
} )

