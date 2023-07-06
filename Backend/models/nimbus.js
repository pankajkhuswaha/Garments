const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var template = new mongoose.Schema(
  {
    templateId:String,
    senderId:String,
    EntityId:String,
    message:String
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Template",template);
