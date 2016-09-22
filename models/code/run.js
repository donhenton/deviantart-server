var User = require('./../user');
var mongoose = require('mongoose');
var bCrypt = require('bcrypt-nodejs');



mongoose.connect('mongodb://localhost/deviantart');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("hit db")
});

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}



var user100Data = {
    "_id": "aa23f8b01470e40673287e3f",
    "userId": 100,
    "username": "user",
    "password": createHash("your-password-here"),
    "email": "user@user.com",
    "firstName": "First",
    "lastName": "Last"
}

var user100 = new User(user100Data);


user100.save(function (err, user100) {
    if (err)
        return console.error(err);
    console.log("done finished ")
     
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 