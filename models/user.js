//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var users = new Schema({
    userName:{
        type: String,
        required: true
    },
    passWord:{
        type: String,
    },
    walletAddress:{
        type: String,
    },
    walletKey:{
        type: String,
    }   
});
  
// Compile model from schema
var users = mongoose.model('users', users );

module.exports = users;
  
