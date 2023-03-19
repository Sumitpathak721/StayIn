const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    isVerified:Boolean,
    uniqueID:String,
    Access:{type:String,default:"user"},
    Myhostel:{
        type:Object,
        default:{
            haveHostel:{type:Boolean,default:false},
            hostel:{type:mongoose.Schema.Types.ObjectId,ref:"Hostel"}
        }
        /*  If Hostel Booked
            Myhostel:{
                haveHostel:true,
                HostelDetail:{
                    Hostel:Hostel_Obj,
                    RoomNo:Number,
                    FloorNo:Number
                }
            }
        */
    }
})
module.exports = mongoose.model('users',userSchema);