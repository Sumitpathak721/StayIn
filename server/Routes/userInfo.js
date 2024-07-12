const express = require('express');
const verifyToken = require("../index.js")

require('../db/config.js');

const users = require('../db/User.js');

const dotenv = require("dotenv");

dotenv.config();


const router = express.Router();


router.get("/",verifyToken,(req,res)=>{
    res.send(req.body.user);
});

module.exports = router;