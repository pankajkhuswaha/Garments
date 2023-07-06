const User = require("../models/userModel");
const Order = require("../models/orderModel");
const path = require('path');
const fs=require('fs');
const asyncHandle=require('express-async-handler');
// const {uploadPdfToCloudinary} =require('../utils/cloudinary')
const deletefile=asyncHandle(async(id)=>{

try {

  const user = await User.findById(id).populate('cart.products.product')
// Set the products array to an empty array

// Save the updated user object to the database

    // Create a new order document with the user's cart data
    const order = new Order({
      products: user.cart.products,
      orderby: id,
      add:user.address[user.address.length-1]

       });
    order.save()
    await User.findByIdAndUpdate(id,{$set:{"cart.products":[]}})
    

  fs.unlinkSync( path.join(__dirname, `../${id}example.pdf`));





} catch (err) {
 resizeBy.send(err)
 }
})


module.exports={deletefile}