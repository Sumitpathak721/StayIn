const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("../db/Hostels.js");

const HostelModel = require("../db/Hostels.js");
const User = require("../db/User.js");

const multer = require("multer");
const { route } = require("./signup.js");

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

router.post("/makeOrganizer",async(req,res)=>{
  const Organizer = await User.findOne({Email:req.body.Email});
  const HostelObj = await HostelModel.findOne({Name:req.body.Hostel_name});
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

module.exports = router;
