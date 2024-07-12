//import Dependency
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser")

dotenv.config();

//Configuration
const Root = express();
Root.use(cors());
Root.use(bodyParser.json());

//Middleware Setup
Root.use(express.json());
//token verify  
const verifyToken = async(req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization;
    // Check if the token exists
    if (!token) {
      console.log("401");
      return res.sendStatus(401);
    }
    try{
      req.body.user = await  jwt.decode(token, process.env.JWT_SECRET_TOKEN);
      next();
    }catch(e){
      console.log("Error is:",e);
      return res.sendStatus(403);
    }
  };
module.exports = verifyToken;


//All Routes
Root.use("/signup", require("./Routes/signup.js"));
Root.use("/login", require("./Routes/login.js"));
Root.use("/verify", require("./Routes/verify.js"));
Root.use("/userInfo",require("./Routes/userInfo.js"));
Root.use("/building", require("./Routes/building.js"));
//Listening Root
Root.listen(5000,()=>{
  console.log(`${process.env.PORT}`)
});
