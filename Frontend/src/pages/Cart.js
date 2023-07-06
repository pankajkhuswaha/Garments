import React ,{useEffect, useState}from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import {  toast } from 'react-toastify';
import {AiFillDelete} from "react-icons/ai"
import { Alert, Space, Spin } from 'antd';
import { Link ,useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import{createcart,getcart,daletecart,deletecartitem, resetState} from '../features/product cart/cartSlice'
const Cart = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      dispatch(resetState()); 
      dispatch(getcart()).then(() => {
        // Set the loading state to false after the data is fetched
        setLoading(false);
      });

      }, []);
      const Items = useSelector((state) => state.cart.cart);
    
   
 
      let cart = [];

      if (Array.isArray(Items.data)) {
        cart = Items.data.map((item, i) => {
          return {
            cartTotal: Items.cartTotal,
            count: item.count,
            price: item.price,
            total: item.total,
            url: item.url,
            _id:item._id
          };
        });
      }
  
      
const size=Items.length
const cart_size={
cart_size:size
}
 
  return (
   <>

     
         <Meta title={`${cart_size?.cart_size}`} />
      <BreadCrumb title="Cart" />
      {loading ===true && <Spin tip="Loading...">
     
     </Spin>}
      <section className="cart-wrapper home-wrapper-2 py-5">
      <div className="d-flex  flex-column align-items-end">
                          
                            {/* <div  className='button' onClick={()=>{
                                dispatch(daletecart())
                                window.location.reload()
                            }}>
                              Clear Cart
                            </div> */}
                        </div>
        <div className="container-xxl">
        
               <div className="row">
               <div className="col-12">
                   <div className=" card-header py-3 d-flex ">
                       <h5 className='cart-col-1'>Name</h5>
                       <h5 className='cart-col-1'>Price</h5>
                       <h5 className='cart-col-2'>Quantity</h5>
                       <h5 className='cart-col-1'></h5>
                       <h5 className='cart-col-1'>Total</h5>
                       {/* <h5 className='cart-col-1'>Delete</h5> */}
                   </div>
                   {  cart.map((items,i)=>(
                   <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
             <div className="cart-col-1 gap-10 d-flex align-items-center">
                           <div className='w-25'>
                               <img 
                               src={items?.url}
                               alt="product image"
                               className='img-fluid' />
                           </div>
                           <div className="w-25">
                                   <h5 className='title'>{Items?.title}</h5>
                                   <p className='background'>color</p>
                                   <p className='quantity'>size</p>
                           </div>
                   </div>
                   <div className="cart-col-1  ">
                       <h5 className='price'>₹{items?.price}</h5>
                   </div>
                   <div className="cart-col-1 d-flex align-items-center gap-30">
                       <div>
                       <h5 className='price jus' >{items?.count}</h5>
                       </div>
                      
                   </div>
                   <div className="cart-col-1 justify-content-center">
                   <h5 >₹{items?.total}</h5>
                   </div>

                   <div>
                       <AiFillDelete className='fs-3 text-danger ' onClick={()=>{
                        //  dispatch(deletecartitem(items._id))
                        //  window.location.reload()
                        setLoading(true);
                       dispatch(deletecartitem(items._id))
                   setTimeout(()=>{
                    dispatch(getcart()).then(() => {
                         setLoading(false);
                    });
                   },1000)
                       
                       }}/>
                       </div>



                   </div>


                   ))}
                   <div className="col-12 py-2 mt-4 align-items-end">
  <div className="d-flex justify-content-end align-items-end">
    <div className="d-flex flex-column align-items-end">
      <h4>SubTotal :₹{Items?.cartTotal}</h4>
      <p>Taxes and Shipping calculated at checkout</p>
      <Link to="/app/checkout" className="button">
        Chekcout
      </Link>
    </div>
  </div>
</div>

                   
               </div>
           </div>
         
           <div className="col-12 py-2 mt-4">
                       <div className="d-flex justify-content-between align-items-center" >
                           <Link to="/app/product" className="button">
                               Continue to Shopping
                           </Link>
                          
                       </div>
                       
                   </div>

        </div>
      </section>
   </>
  )
}   

export default Cart
