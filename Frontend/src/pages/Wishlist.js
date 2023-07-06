import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {  toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { deletefromwishlist, getwishlist ,resetState} from "../features/Wishlist/wishSlice";
import { Alert, Space, Spin } from 'antd';



export default function Wishlist() {
const dispatch = useDispatch();
const [loading, setLoading] = useState(true);

// Use the useEffect hook to get the wishlist items on mount
useEffect(() => {
  dispatch(resetState());
  dispatch(getwishlist()).then(() => {
    // Set the loading state to false after the data is fetched
    setLoading(false);
  });
}, []);


  // Use the useSelector hook to get the wishlist items from the store
  const items = useSelector((state) =>  state?.wishlist?.wishlist);

 

  // Use the useEffect hook to set the items state with the wishlist items
;

  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      {loading ===true && <Spin tip="Loading...">
     
    </Spin>}
      <div className="wishlist-wrapper home-wrapper-2 py-5">
  <div className="container-xxl">
    {items?.length === 0 ? (
     ""
    ) : (
      
      <div className="row row-cols-1 row-cols-md-4 g-4">
        { loading===false && items?.map((item, i) => (

          <div className="col" key={item._id}>
            <Link
              
              className="card position-relative"
              style={{ width: "100%" }}
            >
              <div className="d-flex">
                <div className="position-relative">
                  <Link to="#">
                    
                  </Link>
                  <img
                    src={item.images[0].url}
                    
                    className="card-img-top img-fluid items-image"
                    alt="items image"
                  />
                </div>
                <div className="card-body px-4 ">
                <RxCross2
                      className="heart-icon position-absolute ql-direction-rtl"
                      onClick={() => {
                        dispatch(deletefromwishlist(item._id))
                     
                       
                       setTimeout(()=>{
                             dispatch(getwishlist());
                       },1000)
                       toast.success("item remove sucessfully")
                       
                      }}
                    />
                  <h6>{item.title}</h6>
                  <p className="price mb-3">₹{item.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
     
    )}
  </div>
</div>

    </>
  );
}


