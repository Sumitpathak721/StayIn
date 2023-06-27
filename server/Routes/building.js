const express = require("express");
const dotenv = require("dotenv");
const MongoDB = require("mongodb");
const multer = require("multer");

//Oauth
const verifyToken = require("../index.js");

dotenv.config();
require("../db/config.js");

const BuildingModel = require("../db/Building.js");
const UserModel = require("../db/User.js");


const router = express.Router();

//Multer defination


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.mimetype.split("/")[0]=='image'){
      cb(null, "uploads/images");
    }else if(file.mimetype.split("/")[0]=='video'){
      cb(null, "uploads/videos");
    }else{
      cb(null,"uploads/others");
    }
      
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  },
});
let upload = multer({ storage: storage });
router.post("/addBuilding",verifyToken,upload.fields([{name:'images',maxCount:20},{name:"videos",maxCount:10}]),async(req,res)=>{
  req.body.accessibleMember=req.body.accessibleMember.split(",");
    for(let i=0;i<req.body.accessibleMember.length;i++){
      let user = await UserModel.findOne({"Email":req.body.accessibleMember[i]});
      if(user){
        if(user.isVerified){
          continue;
        }else{
          res.sendStatus(401);
          // res.send({"status":"Accessible email not verified","Email":req.body.accessibleMember[i]});
          return;
        }
        
      }else{
        res.sendStatus(400);
        // res.send({"status":"Accessible email not exist","Email":req.body.accessibleMember[i]});
        return;
      }
    }

    res.send({"status":"successful"});
})



module.exports = router;
