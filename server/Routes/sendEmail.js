const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

//For Sending Email to Register User
const sendEmail = async(email,subject,html)=>{
    var Transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_KEY
        }
    });
    var mailOption={
        from : "BookMyHostel",
        to: email,
        subject: subject,
        html: html
    };
    Transport.sendMail(mailOption);
}

module.exports = sendEmail;