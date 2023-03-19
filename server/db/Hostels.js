const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema({
  hostel_name: String,
  floor: Number,
  room: Number,
  seater: String,
  seat: String,
  isBooked: { type: Boolean, default: false },

  Photos: [
    {
      Url: String,
      contentType: String,
    },
  ],
  rating: String,
  Email: String,
  Address: String,
});

const HostelModel = mongoose.model("hostels", HostelSchema);

module.exports = HostelModel;
