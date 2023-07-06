import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/cutomers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import blogReducer from "../features/blogs/blogSlice";
import colorReducer from "../features/color/colorSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";
import cart from '../features/product cart/cartSlice'
import compareReduce from '../features/compare/compareSlice'
import  wishlistSlice  from "../features/Wishlist/wishSlice";
import orderReducer from "../features/Order/orderSlice"
import productReducers from "../features/products/productSlice";
import sizeReducer from '../features/Size/SizeSlice'
import smsReducer from '../features/Sms/SmsSlice'
import smssend from '../features/send   Sms/SendSlice'
import  QuantitySlice  from "../features/Quantity/quantitySlice";
import contactReducer from '../features/contact/contactSlice'
import emailReducer from '../features/email/emailSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    bCategory: bCategoryReducer,
    blogs: blogReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
    cart:cart,
    compare:compareReduce,
    wishlist:wishlistSlice,
    order:orderReducer,
    productReduceradmin:productReducers,
    size:sizeReducer,
    sms:smsReducer,
    send:smssend,
    Quantity: QuantitySlice ,
    contact:contactReducer,
   email:emailReducer
  },
});













