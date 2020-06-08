const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


//Create Schema 
const UserSchema = new Schema({
    googleID: {
        type: String
    },
    email: {
        type: String
    }, 
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    }
}); 

//Create collection and add schema 
mongoose.model('users', UserSchema); 
