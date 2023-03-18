const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema({
  name: String,
  no_of_floor: Number,
  no_of_room: Number,
  isBooked: { type: Boolean, default: false },
  rating: String,
});

const HostelModel = mongoose.model("hostels", HostelSchema);

module.exports = HostelModel;
