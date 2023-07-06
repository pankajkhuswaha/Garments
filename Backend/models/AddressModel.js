const mongoose = require("mongoose");
var address = new mongoose.Schema(
    {
      firstname: {
        type: String,
       
      },
      lastname: {
        type: String, 
      },
      Address: {
        type: String,
       
      },
      Appartment: {
        type: String,
      
      },
      City: {
        type: String,
      },
      zipcode: {
        type: String,
       
      },
      
    },{
      timestamps:true
    })
    module.exports = mongoose.model("Address", address);