const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema({
  name: String,
  rating: String,
});

const HostelModel = mongoose.model("hostels", HostelSchema);

module.exports = HostelModel;
