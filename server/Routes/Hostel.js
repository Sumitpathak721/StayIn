const express = require("express");
const dotenv = require("dotenv");
const MongoDB = require("mongodb");



dotenv.config();
require("../db/Hostels.js");

const HostelModel = require("../db/Hostels.js");
const User = require("../db/User.js");

const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });

router.post("/hostelDetails", upload.single("room_pics"), async (req, resp) => {
  let body = req.body;
  console.log(body.floor);
  const data = new HostelModel({
    Name: req.body.Name,
    /*floor:
    [
      //for each floor
      [
        //for each room
        {
          seater,vacent
        },
        {
          seater,vacent
        }
      ],
      [
        {
          seater,vacent
        },{
          seater,vacent
        }
      ]
    ]
    */
    Floors: req.body.Floors,//In array form
    // Photos: {
    //   Url: req.file.path,
    //   contentType: "/image.jpg",
    // },
    rating: req.body.rating,
    Email: req.body.Email,
    Address: req.body.Address,
  });
  const result = await data.save();
  if (result) {
    resp.send({result:result});
  } else {
    resp.send({ result: "Error occured" });
  }
});
//to change user accesibility to organizer
router.post("/makeOrganizer",async(req,res)=>{
  const Organizer = await User.findOne({Email:req.body.Email});
  const HostelObj = await HostelModel.findOne({Name:req.body.Hostel_name});
  console.log(Organizer);
  console.log(HostelObj);

  if(HostelObj==null){
    res.send({respond:"false"});
  }else if(Organizer==null){
    res.send({respond:"false"});
  }else{
    Organizer.Access = "Organization";
    Organizer.Myhostel = {
      haveHostel:true,
      Hostel:HostelObj._id
    }
    Organizer.save();
    res.send({respond:"done"});
    console.log(Organizer);
  }
});

//Get All members of the hostel

router.get("/getMembers",async(req,res)=>{
  Organizer=await User.findOne({Email:req.body.Email});
  if(Organizer.Access==="Organization" ){
    Hostel = await HostelModel.findOne({"_id":Organizer.Myhostel.hostel})
    res.send({respond:"done",result:Hostel.Members});
  }else{
    res.send({respond:"false"});
  }
});

//Add hostelrs
router.post("/addMember",async(req,res)=>{
  user=await User.findOne({Email:req.body.Email});
  if(user){
    if(user.Myhostel.haveHostel){//In case if user already have an hostel
      res.send({respond:"false"})
    }else{
    hostel = await HostelModel.findOne({Name:req.body.hostel_name});
    hostel.Members.push(user._id)
    user.Myhostel={
      haveHostel:true,
      hostel:hostel._id
    }
    await hostel.save();
    await user.save();
    res.send({respond:"ok"});
  }
  }else{
    res.send({respond:"false"});
  }
});

module.exports = router;
