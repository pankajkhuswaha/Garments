const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var template = new mongoose.Schema(
  {
     subject:String,
     message:String,
     
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Email",template);
