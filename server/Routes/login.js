const express = require('express');
const sendEmail = require("./sendEmail.js")
require('../db/config.js');
const bcrypt = require("bcryptjs");
const users = require('../db/User.js');
const dotenv = require("dotenv");
dotenv.config();



const router = express.Router();

//Check and respond for login crediential
router.post('/',async(req,res)=>{
    
    if(req.body.Email && req.body.Password){
        
        let result = await users.findOne({Email:req.body.Email.toLowerCase()});
        
        if(result){    
            let isPassword = await bcrypt.compare(req.body.Password,result.Password);
            
            if(isPassword){
                if(result.isVerified){
                    res.send({flag:"verified",Response:{
                        Email:result.Email,
                        UniqueID:result.uniqueID,
                        Access:result.Access
                    }});
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

        let result = await users.findOne(req.body);
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