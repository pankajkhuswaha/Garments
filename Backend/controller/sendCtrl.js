require('dotenv').config();
const asyncHandler = require("express-async-handler");
const request = require("request");
const User = require('../models/userModel');


const sendSms = asyncHandler(async (req, res) => {
  try {
    const { templateId, senderId, message, EntityId } = req.body;
    if (req?.body?.mobile !== 'undefined') {
     
    

      if (templateId && senderId && message && EntityId && req.body.mobile) {
        let options = {
          url: `${process.env.API_URL}username=${process.env.API_KEY}&password=${process.env.API_SECRET}&sender=${senderId}&sendto=${req.body.mobile}&entityID=${EntityId}&templateID=${templateId}&message=${message}`,
        };
      
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
                console.log(body)
          } else {
   console.log(error)
          }
        });
      } sendSms







    } else if(req?.body?.mobile==='undefined'){
        let number='';
      const data = await User.find().select('-_id -firstname -lastname -email -password -role -isBlocked -cart -address -wishlist -createdAt -updatedAt -__v -refreshToken -passwordResetExpire -passwordResetToken');
      for (let i = 0; i < data.length; i++) {
     
        if(data[i].mobile!==undefined && i==data.length-1){
          number+=data[i].mobile.toString();  
         continue; 
}
        if (data[i].mobile !== undefined ) {
          number+=data[i].mobile.toString()+','   

        }
         
      }

      let urls = {
        url: `${process.env.API_URL}username=${process.env.API_KEY}&password=${process.env.API_SECRET}&sender=${senderId}&sendto=${number}&entityID=${EntityId}&templateID=${templateId}&message=${message}`,
      };
console.log(urls)
    
      request(urls, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                      console.log(body)
        } else {
                      console.log(error)
        }
      });
    
    }

    res.send("SMS sent successfully");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  sendSms
};
