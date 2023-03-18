const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema({
  Name: String,
  Floors: [{type:Object}],
  /*Floors=[
    FLoor1:{
      Rooms=[
        {
         seater:
         vacent:
        }
      ]
    }
  ]
  */
  Photos:[{
    Url:String,
    contentType:String
  }],
  isBooked: { type: Boolean, default: false },
  rating: String,
  Email:String,
  Address:String,
});

const HostelModel = mongoose.model("hostels", HostelSchema);

module.exports = HostelModel;
