const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        size:String,
        price:Number,
        total:Number,
        orderStatus: {
          type: String,
          default: "Processing",
          enum: [
            "Not Processed",
            "Cash On Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered",
            "return",
            "return sucessfully",
            "Order Confirmed",
            "Shipped",
            "Out For Delivery",
            "Delivered"
    
          ],
        },
      },
    ],
    paymentIntent: { },
   
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    add: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  
  
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
