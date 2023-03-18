//All Dependency
const express = require("express");
const sendEmail = require("./sendEmail.js");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();
//DataBase Configuration
require("../db/config.js");
const users = require("../db/User.js");

const router = express.Router();

//Create random uniqueString for verify Email
const randString = async () => {
  const len = 20;
  var randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10);
    randStr += ch;
  }
  return randStr;
};

//Post request to signup
router.post("/", async (req, res) => {
  if (req.body.Name && req.body.Email && req.body.Password) {
    Email = req.body.Email.toLowerCase();
    if (await users.findOne({ Email: Email })) {
      res.send({ flag: "registered" });
    } else {
      let uniqueID = await randString();
      //In case, unique id exist
      let user = await users.findOne({ uniqueID: uniqueID });
      while (user) {
        uniqueID = await randString();
        user = await users.findOne({ uniqueID: uniqueID });
      }
      if (uniqueID) {
        req.body.Password = await bcrypt.hash(req.body.Password, 10);
        req.body.uniqueID = uniqueID;
        req.body.isVerified = false;
        req.body.Email = Email;

        let newUser = new users(req.body);

        let subject = "Email Verification";
        let html = `<h2>Welcome to Our community</h2><br>
                        This email is sent to verify it is you if you do not register then ignore this email
                        <a href=${process.env.React_URL}/verify/${uniqueID}>Click here</a> to Verify<br>
                        <br><br>regards<br>
                        BookMyHostel`;

        await sendEmail(req.body.Email, subject, html);
        await newUser.save();
        res.send({ flag: "done" });
      }
    }
  } else {
    res.send({ flag: "wrong" });
  }
});

module.exports = router;
