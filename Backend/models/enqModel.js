const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var enqSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  email: {
    type: String,
    
  },
  mobile: {
    type: String,
   
  },
  comment: {
    type: String,
   
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
  },
});

//Export the model
module.exports = mongoose.model("Enquiry", enqSchema);
