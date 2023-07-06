const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const Address = require("../models/AddressModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailCtrl");
const mongoose=require('mongoose');
const { Console } = require("console");
const ObjectId=mongoose.Types.ObjectId;
const cookies = require("cookie-parser");

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
 
  const email = req.body.email;
  /**
   * TODO:With the help of email find the user exists or not
   */
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    /**
     * TODO:if user not found user create a new user
     */
    const newUser = await User.create(req.body);
    res.json(newUser);  
  } else {
    /**
     * TODO:if user found then thow an error: User already exists
     */
    throw new Error("User Already Exists");
  } 
});
// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    if(findUser.isBlocked===false){
      const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        
            
        },
        { new: true }
      ).populate('wishlist');
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
     
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
        role:findUser?.role,
        cart:findUser?.cart,
        wishlist:findUser?.wishlist,
        address:findUser?.address,
       super:findUser?.super
  
  
      });
    }else{
      res.send({message:"you are block by  Super Admin"})
    }
   
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
    
      },
      { new: true }
    );


    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
super:findAdmin
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
        console.log(req.cookies)
  if (!req.cookies?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = req.cookies.refreshToken;
  const user = await User.findOne({ refreshToken });
console.log(user)
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});
const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
console.log(id)
  const {role}=req.body;
console.log(role)
  validateMongoDbId(id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        role:role
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});


// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  

  validateMongoDbId(_id);

  try {
    // Check if address already exists in Address schema
    const existingAddress = await Address.findOne(req.body);

    if (existingAddress) {
      // If address already exists, return error response
      return res
        .status(400)
        .json({ success: false, message: "Address already exists" });
    }

    // If address does not exist, create and save new address
    const newAddress = await Address.create(req.body);


    // Check if address already exists in User's address array
    const user = await User.findById(_id);
    const existingUserAddress = user.address.find(
      (address) => address.toString() === newAddress._id.toString()
    );

    if (existingUserAddress) {
      // If address already exists in User's address array, return success response
      return res.json({ success: true, message: "Address saved successfully" });
    }

    // If address does not exist in User's address array, push it to the array
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $push: { address: newAddress._id },
      },
      {
        new: true,
      }
    );
    res.json({ success: true, message: "Address saved successfully", user: updatedUser });
  } catch (error) {
    throw new Error(error);
  }
});


// Get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  validateMongoDbId(id);


  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
console.log(id)
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

//Reset The Password
const forgetPasswordToken=asyncHandler(async(req,res)=>{
  const {email}=req.body;
console.log(email)
  const user=await User.findOne({email});
  if(!user) throw new Error('User Not find with this Email');
  try{
   const token=await user.createPasswordResetToken()
   await user.save();
  const resetUrl=`Hi the link for reset password is valid for 10 minutes only<a href='https://buysellanything.online/reset-password/${token}'>link</a>`
  const data={
      to:email,
      sunject:'password reset Link',
      text:'password reset link',
      html:resetUrl,

  }   
  sendEmail(data);
  res.json(token)

}catch(err){

  }
})



const resetPassword=asyncHandler(async(req,res)=>{
  const {password}=req.body;

  const token=req.params.token
  
  const hashToken=crypto.createHash("sha256").update(token).digest("hex");
  
  const user=await User.findOne({
      passwordResetToken:hashToken,
      passwordResetExpire:{
          $gt:Date.now()
      },
  })

  if(!user) throw new Error('Token  Expired Please Try again')
  user.password=password;
  user.passwordResetToken=undefined
  user.passwordResetExpire=undefined
  await user.save();
  res.json(user);

})


const getWishlist = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.user;
   
    const findUser = await User.findById(_id).populate("wishlist")
   
    res.json(findUser.wishlist);
  } catch (error) {
    next(error);
  }
});


//delete the product frrom wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const  prodId= req.params.id;
try {
    const user = await User.findById(_id);
    const productIndex = user.wishlist.indexOf(prodId);
    if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found in wishlist" });
    }
     user.wishlist.splice(productIndex, 1);
    await user.save();
     res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//add product to acrt 
const userCart = asyncHandler(async (req, res) => {

  const { _id, count} = req.body;
  console.log(req.body)

 try{
const produc= await Product.findById(_id);
  if (!produc) {
    return res.status(404).json({ error: "Product not found" });
  }

const updatedUser = await User.findOneAndUpdate(
  { _id: req.user._id, "cart.products.product": { $ne: produc._id } },
  {
    $addToSet: {
      "cart.products": {
        product: produc._id,
        count: count,
        size:req?.body?.sizename,
        color: req?.body?.colorname,
        price: produc?.price,
        total: produc?.price* count
      },
    },
   
  },
  {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  }
).populate("cart.products.product", "_id name price").select('-_id -firstname -lastname -email -mobile -password -role -isBlocked -address -wishlist -createdAt -updatedAt -__v -refreshToken');
  
  const cartTotal = updatedUser.cart?.products?.reduce((total, product) => {
   
    if (product.count > 0) {
      return total + product.count*product.price;
    } else {
      return total;
    }
   
  }, 0);

  
  updatedUser.cart.cartTotal = cartTotal;
  console.log(updatedUser)
  res.status(200).json({ message: "Product removed successfully", cart: updatedUser?.cart });

 }catch(err){
throw new Error(err)
}
  

});
// update cart by updating productr 
const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { product, count, color } = req.body;

  const productExists = await Product.findById(product);
  if (!productExists) {
    return res.status(404).json({ error: "Product not found" });
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id, "cart.products.product": productExists._id },
    {
      $set: {
        "cart.products.$.count": count,
        "cart.products.$.color": color,
        "cart.products.$.price": productExists.price,
        "cart.products.$.total": productExists.price* count
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  ).populate("cart.products.product", "_id name price").select('-_id -firstname -lastname -email -mobile -password -role -isBlocked -address -wishlist -createdAt -updatedAt -__v -refreshToken');
  
  const cartTotal = updatedUser.cart.products.reduce((total, product) => {
    
    if (product.count > 0) {
      return total + product.count*product.price;
    } else {
      return total;
    }
    
  }, 0);

  
  updatedUser.cart.cartTotal = cartTotal;


  if (!updatedUser) {
    return res.status(400).json({ error: "Cart update failed" });
  }

  res.status(200).json({ message: "Cart updated successfully", cart: updatedUser.cart });
});

//get cart of the user
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
console.log(_id)
  console.log("hello")
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.find({_id: _id })
      .select('-_id -firstname -lastname -email -mobile -password -role -isBlocked -address -wishlist -createdAt -updatedAt -__v -refreshToken')
      .populate("cart.products.product", "_id name price images");
   
    const cartTotal=updatedUser[0]
  
    const data=cartTotal?.cart?.products?.map((item)=>{
      return {
        price:item?.price,
        total:item?.total,
        count:item?.count,
        url:item?.product?.images[0]?.url,
        _id:item?.product?._id
      }
    })
 
    const cartTota = cartTotal?.cart?.products?.reduce((total, product) => {
      
      if (product?.count > 0) {
        return total + product?.count*product?.price;
      } else {
        return total;
      }

    }, 0);
  
    
    updatedUser[0].cart.cartTotal = cartTota ;
    
 
     res.json({data:data,cartTotal:cartTota});
  
  } catch (error) {
    throw new Error(error);
  }
});
//make cart to empty 
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    {
      $set: {
        cart: {
          products: [],
          cartTotal: 0
        }
      }
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  ).populate("cart.products.product", "_id name price").select('-_id -firstname -lastname -email -mobile -password -role -isBlocked -address -wishlist -createdAt -updatedAt -__v -refreshToken');

  if (!updatedUser) {
    return res.status(400).json({ error: "Cart empty failed" });
  }

  res.status(200).json({ message: "Cart emptied successfully", cart: updatedUser.cart });
});
//apply coupen for offer
const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.find({ orderby: _id })
      .populate("products.product")
    
      .exec();
      
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

//delete product in the cart by id 
const cartdeletebyId = asyncHandler(async (req, res) => {
  const { _id } = req.user;

try{
const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id,},
    { $pull: { "cart.products": { product: req?.params?.id} } },
    { new: true }
  ).populate("cart.products.product", "_id name price").select('-_id -firstname -lastname -email -mobile -password -role -isBlocked -address -wishlist -createdAt -updatedAt -__v -refreshToken');
  
  const cartTotal = updatedUser.cart?.products?.reduce((total, product) => {
   
    if (product.count > 0) {
      return total + product.count*product.price;
    } else {
      return total;
    }

  }, 0);

  
  updatedUser.cart.cartTotal = cartTotal;
  res.status(200).json({ message: "Product removed successfully", cart: updatedUser.cart });
}catch(err){

throw new Error(err);
}

  
});


const getAllOrders = asyncHandler(async (req, res) => {
  try {
 
    const{_id}=req.user

    validateMongoDbId(_id);
   const admin=await User.findById(_id).select('super')
   console.log(admin)
   const orders = await Order.find()
   .populate("products.product")
   .populate({path:"orderby",select:"firstname lastname email mobile "})
   .populate("add")
   .exec();
   

if(admin.super===true){
res.json(orders)
}else if(admin.super===false){
  const result = orders.filter(order => {
    return order.products.some(product => {
      return product?.product?.created?.posted?.toString() ===_id?.toString();  
    });
  });
  res.json(result);
return ;
}


  } catch (error) {
    throw new Error(error);
  }  
});
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
     
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});



//update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  console.log(req.body)

  const { id } = req.params;
  const { orderStatus, prod } = req.body;

  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
  
    if (!isValidId) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const order = await Order.findById(id).populate('orderby')
    order.orderby.populate("address");
    
    console.log(order)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    const product = order.products.find(p => p.product.toString() === prod.toString());
   
   
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.orderStatus = orderStatus;
    
    await order.save();

    console.log(`Updated order status for product with id ${prod} to ${orderStatus}`);
    console.log(order);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// getAllOrders()

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  cartdeletebyId,
  removeFromWishlist,
  updateCart,
  updateRole
};
