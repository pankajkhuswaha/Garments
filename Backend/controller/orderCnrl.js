const asyncHandle=require('express-async-handler');
const Order=require('../models/orderModel')
const updateOrder=asyncHandle(async(req,res)=>{
    
    try {
      // Get the order ID from the request parameters
      // Find the order in the database and update its order statu
      console.log(req.body)
      await Order.findByIdAndUpdate(req.body.id, { orderStatus: req.body.orderStatus });
      res.status(200).json({ message: 'Order status updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  module.exports={updateOrder}