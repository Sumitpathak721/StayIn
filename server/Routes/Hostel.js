const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("../db/Hostels.js");

const HostelModel = require("../db/Hostels.js");

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
  const data = new HostelModel({
    hostel_name: req.body.hostel_name,
    floor: req.body.floor,
    room: req.body.room,
    seater: req.body.seater,
    seat: req.body.seat,
    isBooked: req.body.isBooked,
    Photos: {
      Url: req.file.path,
      contentType: "/image.jng",
    },
    rating: req.body.rating,
    Email: req.body.Email,
    Address: req.body.Address,
  });
  const result = await data.save();
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "Error occured" });
  }
});

module.exports = router;
