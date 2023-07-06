const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var QuantitySchema = new mongoose.Schema(
  {
    title: {
      type:String,
      required: true,
     
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Quantity",QuantitySchema);
