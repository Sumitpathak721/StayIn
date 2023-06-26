const express = require('express');
const sendEmail = require("./sendEmail.js")
require('../db/config.js');
const bcrypt = require("bcryptjs");
const users = require('../db/User.js');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();



const router = express.Router();

//Check and respond for login crediential
router.post('/',async(req,res)=>{
    if(req.body.Email && req.body.Password){
        
        let result = await users.findOne({Email:req.body.Email.toLowerCase()});
        // console.log(result);
        if(result){    
            let isPassword = await bcrypt.compare(req.body.Password,result.Password);
            
            if(isPassword){
                data = {
                    Email:result.Email,
                    UniqueID:result.uniqueID,
                    Access:result.Access
                };
                const token = jwt.sign(data,process.env.JWT_SECRET_TOKEN);
                

                if(result.isVerified){
                    res.send({flag:"verified",token:token}); 
                }else{
                    res.send({flag:"not verified"})
                }
            }else{
                res.send({flag:"wrong"});
            }
        }else{
            res.send({flag:"wrong"});
        }
    }else{
        res.send({flag:"wrong"});
    }
});


//post api for forget password
//ResetEmail stands for Reset Password Email
router.post("/ResetEmail",async(req,res)=>{
    if(req.body.Email){

        let Email = req.body.Email.toLowerCase();
        let result = await users.findOne({"Email":Email});
        console.log(Email);
        if(result){
            
            let subject = "Reset Password Email";
            let html = `<h2>Reset Password Here</h2><br>
                        <p><a href='${process.env.React_URL}/verify/${result.uniqueID}/ResetPassword'>Click Here</a> to Reset password</p>
                        <p>If you were not attempt to reset password then just ignore this email</p>
                        <br><br>Regards<br>
                        <br>BookMyHostel`;
            await sendEmail(Email,subject,html);
            res.send({respond:"succesful"});
        }else{
            res.send({respond:"not member"})
        }
    }else{
        res.send({respond:"incomplete"});
    }
});

router.use('/verify',require('./verify.js'));



module.exports = router;