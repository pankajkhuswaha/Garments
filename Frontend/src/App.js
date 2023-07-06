import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route ,HashRouter} from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermAndCondition from './pages/TermAndCondition';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import Payment from './pages/Payment';
import OrderTrack from './pages/OrderTrack';
 import Dashboard from "./pages/Dashboard";
 import MainLayout from "./component/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
 import Blogcatlist from "./pages/Blogcatlist";
 import Orders from "./pages/Orders";
 import Customers from "./pages/Customers";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import Sizelist from "./pages/Sizelist";
import Addsize from "./pages/Addsize";
import Sms from './pages/Sms';
import Smslist from './pages/Smslist';
import Addsms from './pages/Addsms';
import Error from './pages/Error';
import Invoice from './pages/Invoice';
import Quantitylist from './pages/Quantitylist';
import Addquantity from './pages/Addquantity';
import Userorders from './pages/Userorders';
import Error404 from './pages/Error404';
import Addemail from './pages/Addemail';
import Emaillist from './pages/Emaillist';

import Emails from './pages/Emails';
import Orderstatus from './pages/Orderstatus';
import { PrivateRoutes } from './pages/routes/PrivateRoute';
import AdminCustomers from './pages/AdminCustomers';

function App() {
  return (
    <>
  {/* <Navbar/> */}
     
      <BrowserRouter>
        <Routes>
        <Route path='*' element={<Error404/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />} >
          
              <Route index element={<Home/>}/>
             
              <Route path="app/about" element={<About/>} />
              <Route path="app/contact" element={<Contact/>} />
              <Route path="app/userorders" element={<PrivateRoutes><Userorders/>   </PrivateRoutes> } />
              <Route path="app/product" element={<OurStore />}/>
              <Route path='app/products' element={<SingleProduct/>}/>
              <Route path="app/blogs" element={<Blog/>}/>
              <Route path="app/cart"  element={<PrivateRoutes><Cart/>  </PrivateRoutes> }/>
              <Route path="app/checkout" element={<Checkout/>}/>
              <Route path="app/blogs/:id" element={<SingleBlog />} />
              <Route path="app/compare-products" element={<CompareProduct/>}/>
              <Route path="app/wishlist" element={<PrivateRoutes>   <Wishlist/>    </PrivateRoutes> }/>
              <Route path="app/orderstatus" element={<PrivateRoutes> <Orderstatus/>   </PrivateRoutes> }/>
              <Route path="app/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="app/refund-policy" element={<RefundPolicy/>} />
              <Route path="app/shipping-policy" element={<ShippingPolicy />} />
              <Route path="app/term-conditions" element={<TermAndCondition />} /> 
              <Route path="app/payments" element={<Payment />} /> 
              <Route path="app/success" element={<OrderTrack/>} /> 
              <Route path="app/fail" element={<Error/>} /> 
          </Route>
          <Route path="invoice" element={<Invoice/>}/>
         
{/* 
          <Route path="/" element={<Login />} /> */}
        {/* <Route path="/reset-password" element={<Resetpassword />} /> */}
        {/* <Route path="/forgot-password" element={<Forgotpassword />} /> */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard/>}/>
          <Route path="Adminshows" element={<AdminCustomers/>}/>
          <Route path="enquiries" element={<Enquiries />}/>
          <Route path="enquiries/:id" element={<ViewEnq />}/>
          <Route path="blog-list" element={<Bloglist />}/>
          <Route path="blog" element={<Addblog />}/>
          <Route path="blog/:id" element={<Addblog />}/>
          <Route path="coupon-list" element={<Couponlist />}/>
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />}/>
          <Route path="blog-category-list" element={<Blogcatlist />}/>
          <Route path="blog-category" element={<Addblogcat />}/>
          <Route path="blog-category/:id" element={<Addblogcat />}/>
          <Route path="orders" element={<Orders />}/>
          <Route path="sms/:id" element={<Sms/>}/>
          <Route path="email/:id" element={<Emails/>}/>
          <Route path="customers" element={<Customers />}/>
          <Route path="list-color" element={<Colorlist />}/>
          <Route path="list-quantity" element={<Quantitylist/>}/>
          <Route path="list-size" element={<Sizelist/>}/>
          <Route path="list-sms" element={<Smslist/>}/>
          <Route path="list-sms/:id" element={<Smslist/>}/>
          <Route path="list-email" element={<Emaillist/>}/>
          <Route path="list-email/:id" element={<Emaillist/>}/>
          <Route path="color" element={<Addcolor />}/>
          <Route path="quantity" element={<Addquantity/>}/>
          <Route path="quantity/:id" element={<Addquantity/>}/>
          <Route path="color/:id" element={<Addcolor />}/>
          <Route path="size" element={<Addsize/>}/>
          <Route path="addemail" element={<Addemail/>}/>
           <Route path="addemail/:id" element={<Addemail/>}/>
           <Route path="addsms" element={<Addsms/>}/>
           <Route path="addsms/:id" element={<Addsms/>}/>
          <Route path="size/:id" element={<Addsize />}/>
          <Route path="list-category" element={<Categorylist />}/>
          <Route path="category" element={<Addcat />}/>
          <Route path="category/:id" element={<Addcat />}/>
          <Route path="list-brand" element={<Brandlist />}/>
          <Route path="brand" element={<Addbrand />}/>
          <Route path="brand/:id" element={<Addbrand />}/>
          <Route path="list-product" element={<Productlist />}/>
          <Route path="product" element={<Addproduct />}/>
          <Route path="product/:id" element={<Addproduct />}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
 