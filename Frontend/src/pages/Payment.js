import React, { useState,useEffect } from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import {AiFillDelete} from "react-icons/ai"
import { Link ,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import{createcart,getcart,daletecart,deletecartitem} from '../features/product cart/cartSlice'
import { Checkbox } from 'antd';
import  { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Input } from 'antd';
import { Button, Space } from 'antd';
const Payment = () => {
  const [show,setShow]=useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);
  
  const Items = useSelector((state) => state.cart.cart);
  const User=useSelector((state)=>state.auth.user)
  const email=User.email;
  const firstname=User.firstname;
  const lastname=User.lastname;
  const mobile=User.mobile;
  const _id=User._id;

  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);
  
  
  

  let cart = [];

  if (Items) {
    cart = Items?.data?.map((item, i) => {
      return {
        cartTotal: Items?.cartTotal,
        count: item?.count,
        price: item?.price,
        total: item?.total,
        url: item?.url
      };
    });
  }
  
  
const size=Items.length
const cart_size={
cart_size:size
}







  // const onChange = (e: CheckboxChangeEvent) => {
    
  //   setShow(!show)
  // };
  return (
    <>
       <Meta title="Payment Option"></Meta>
      <BreadCrumb title="Payment Option" />
      <section className="cart-wrapper home-wrapper-2 py-5">
      <div className="d-flex  flex-column align-items-end">
                          
                           
                        </div>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className=" card-header py-3 d-flex align-items-center justify-content-between">
                        <h5 className='cart-col-1'>Product</h5>
                        <h5 className='cart-col-2'>Price</h5>
                        <h5 className='cart-col-3'>Quantity</h5>
                        <h5 className='cart-col-4'>Total</h5>
                    </div>
                    {  cart.map((items,i)=>(
                    <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                              <div className="cart-col-1 gap-15 d-flex align-items-center">
                            <div className='w-25'>
                                <img 
                                src={items.url}
                                alt="product image"
                                className='img-fluid' />
                            </div>
                            <div className="w-75">
                                    <h5 className='title'>{items.brand
}</h5>
                                    <p className='background'>color</p>
                                    <p className='quantity'>size</p>
                            </div>
                    </div>
                    <div className="cart-col-2 ">
                        <h5 className='price'>{items.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-30">
                        <div>
                            <div 
                           
 />
                            {items.count}
                        </div>
                       
                    </div>
                    <div className="cart-col-4">
                    <h5 className='price'>{items.total}</h5>
                    </div>
                    </div>
                    ))}
                  
                  <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">{Items.cartTotal}</h5>
            </div>
                


 {/* <Input placeholder="Apply Coupen" /> */}




  <Space direction="vertical" style={{ width: '20%' }}>
    <Button  >
    <form action='https://api.buysellanything.online/api/payment' method='post'>
         <input type="hidden" name="key" value="reMTqWa4" /> 
        <input type="hidden" name="_id" value={_id}/>     
         <input type="hidden" name="txnid" value="TXN_12345" />
        <input type="hidden" name="productinfo" value={cart} />
        <input type="submit" className='button' value="Proceed to Pay"/> 
      </form>
    </Button>
   
  </Space>





 {/* <Checkbox onChange={onChange} className="my-3 mx-5">Cash On Delivery</Checkbox> */}

                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-center" >
                           
                            <div className="d-flex  flex-column align-items-end">
                         
                            <p>Taxes and Shipping calculated at checkout</p>
                         {show &&   <Link to="/app/success" className='button'>
                                place order
                            </Link> }
                        </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default Payment
