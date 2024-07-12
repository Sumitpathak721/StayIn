const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
  name: String,
  images:[],
  videos:[],
  email:String,
  location:{},
  description:String,
  availableFor:String,
  availableForDetail:{},
  genderSegregation:String,
  accessibleMember:[],
  Owner:String,
});

const BuildingModel = mongoose.model("buildings", BuildingSchema);
module.exports = BuildingModel;