const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    isVerified:Boolean,
    uniqueID:String,
    Access:{type:String,default:"user"},  
})
module.exports = mongoose.model('users',userSchema);