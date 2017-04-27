
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    _id: String,
    pwd: String
})

var User  = mongoose.model('User', UserSchema);
module.exports.User = User;


