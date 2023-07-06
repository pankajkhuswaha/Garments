import React, { useState, useEffect } from 'react'
import { Divider, Steps, Card } from 'antd';
import { useLocation } from 'react-router-dom';
import { getOrders } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Orderstatus() {
    const location=useLocation()
    const [current,setCurrent]=useState("0")
    // const {orders}= useSelector((state) => state.auth);
   

const orders=location?.state?.item
    const product = location?.state?.item?.product;
    const brand = product?.brand;
    const title = product?.title;
    const images = product?.images;
    
    useEffect(() => {
      if (orders && orders?.orderStatus === "Order Confirmed") {
        setCurrent("1");
        
      }
      else if (orders && orders?.orderStatus === "Processing") {
        setCurrent("2");
      }
      else if (orders && orders?.orderStatus === "Shipped") {
        setCurrent("3");
      }  else if (orders && orders?.orderStatus === "Out For Delivery") {
        setCurrent("4");
      } 
      else if (orders && orders?.orderStatus === "Delivered") {
        setCurrent("5");
      }
      else if (orders && orders?.orderStatus === "Cancelled") {
        setCurrent("6");
      }
      else if (orders && orders?.orderStatus === "return") {
        setCurrent("7");
      }else {
        setCurrent("0");
      }
    }, [orders]);

    return (
       

  <>




  <h3>Status</h3>
   <div className="d-flex justify-content-between align-items-center mb-3  ">
    
   <Steps className='ms-4 ps-5'
    progressDot
    current={current}
    direction="vertical"
    items={[
      {
        title: 'Order Confirmed',
        description: 'Your Order has been placed.',
      },
      {
        title: 'processing',
        description: 'Your item has been processed.',
      },
      {
        title: 'Shipped',
        description: 'Your item has been shipped.',
      },
      {
        title: 'Out For Delivery',
        description: 'Your item is out for delivery.',
      },
      {
        title: 'Delivered',
        description: 'Your item has been delivered.',
      },
      {
        title: 'Cancelled',
        description: 'Your item has been Cancelled.',
      },
      {
        title: 'Return',
        description: 'Your item has been Returned.',
      },
     
    ]}
  />   
  <Card title={brand?brand:""} bordered={false} style={{ width: 300 }}>
    <p>{title?title:""}</p>
    <p><img src={`${images?.[0]?.url}`}></img></p>

    
  </Card>
          </div>
 
 


</>
    )
}
