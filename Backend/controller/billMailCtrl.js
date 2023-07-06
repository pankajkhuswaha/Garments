require('dotenv').config();
const nodemailer=require('nodemailer');
const path = require('path');
const fs=require('fs');
const asyncHandle=require('express-async-handler');
const User=require('../models/userModel')

const sendpdf=asyncHandle(async(id,callback)=>{
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ID, // generated ethereal user
      pass: process.env.MP, // generated ethereal password
    },
  });

  // Upload the PDF file to Cloudinary
 
  // send mail with defined transport object
const user=await User.findById(id).select('email')
console.log(email+"zxcczc")
  let info = await transporter.sendMail({
    from: '"Hey 👻" <deepnapsoftech@gmail.com>', // sender address
    to: "abhiasthana36@gmail.com", // list of receivers
    subject: `hello world`, // Subject line
    text: `data`, // plain text body
    html: `data`, // html body
    attachments: [
      {
        filename: 'example.pdf', // <= Here: made sure file name match
        path: path.join(__dirname, `../${id}example.pdf`), // <= Here
      }]
  })
  callback()

}
  
 
  )
  module.exports={sendpdf}  