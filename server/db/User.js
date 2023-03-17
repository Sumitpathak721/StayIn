const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    isVerified:Boolean,
    uniqueID:String,
    Gender:String,
    DOB:String,
    Access:String
})
module.exports = mongoose.model('users',userSchema);