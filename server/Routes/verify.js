const express = require("express");
const router = express();
const users = require("../db/User.js");
const dotenv = require("dotenv");
dotenv.config();

//for verification email in signup
<<<<<<< HEAD
router.get('/:uniqueID',async(req,res)=>{
    const {uniqueID} = req.params;
    
    const user = await users.findOne({uniqueID:uniqueID});
    
    if(user){
        user.isVerified = true;
        await user.save();
        res.send({done:true});
    }else{
        res.send({done:false});
    }
});
router.put('/ResetPassword',async(req,res)=>{
    const {uniqueID,Email,NPassword} = req.body;
    const user = await users.findOne({unique:uniqueID,Email:Email});
    if(user){
        user.Password = NPassword;
        await user.save();
        res.send({done:true});
=======
router.get("/:uniqueID", async (req, res) => {
  const { uniqueID } = req.params;
>>>>>>> sujeetBranch

  const user = await users.findOne({ uniqueID: uniqueID });

  if (user) {
    user.isValid = true;
    await user.save();
    res.send({ done: true });
  } else {
    res.send({ done: false });
  }
});
router.put("/ResetPassword", async (req, res) => {
  const { uniqueID, Email, NPassword } = req.body;
  const user = await users.findOne({ unique: uniqueID, Email: Email });
  if (user) {
    user.Password = NPassword;
    await user.save();
    res.send({ done: true });
  } else {
    res.send({ done: false });
  }
});

module.exports = router;
