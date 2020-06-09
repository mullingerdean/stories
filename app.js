const express = require('express');
const path = require('path'); 
const mongoose = require('mongoose');
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session'); 
const passport = require('passport');
const Handlebars = require('handlebars'); 
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


// Load User Model
require('./models/User');
require('./models/Stories');
//Passport Config
require('./config/passport')(passport);


const auth = require('./routes/auth'); 
const index = require('./routes/index');
const stories = require('./routes/stories');

//Load keys file 
const keys = require('./config/keys'); 



mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI, {
    // useMongoClient: true
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then( ()  => console.log('MongoDB Connected ...'))
.catch(err => console.log(err)); 

const app = express(); 


// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Handlebars Middleware
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),

    defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(cookieParser()); 
app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: false
})); 

//Passport Middleware 
app.use(passport.initialize()); 
app.use(passport.session()); 


// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//User Routes 
app.use('/', index); 
app.use('/auth', auth); 
app.use('/stories', stories);

const port = process.env.PORT || 5000; 
 
app.listen(port, () =>{
    console.log(`Appliction started on port: ${port}`); 
} ); 

