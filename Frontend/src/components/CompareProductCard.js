import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import {removeItem} from'../../src/features/compare/compareSlice'
export default function CompareProductCard(props) {
  const location = useLocation();
  const dispatch = useDispatch();


  const [show, setShow] = useState(true);

  const items = useSelector(state => state.compare);
  useEffect(() => {
    
  }, [items])
  
  const { _id,brand, category, color, description, images, price, quantity, ratings, slug, sold, tags, title, totalrating } = props.state

  


  return (
    <>
      {show && (
        <div className="col-lg-3 col-12 compare-product-card">
          <div className="card position-relative" style={{ width: '100%' }}>
            <div className="row d-flex">
              <div className="col-12 col-sm-12 ">
                <div>
                <RxCross2
  className="heart-icon position-absolute"
  onClick={() => {
   
   dispatch(removeItem(_id))
    toast.success("Item removed successfully");
  }}
/>
                </div>
               <img
                  src={images[0].url}
                  className="card-img-top img-fluid "
                  alt="product image"
                />
              </div>

              <div className="col-12 col-sm-12  ">
                <div className="card-body px-4 ">
                  <h6>{title}</h6>
                  <p className="price mb-3">₹{price?price:""}</p>
                  <div className=" d-flex justify-content-between align-items-center data-list mb-3">
                    <h5 className="mt-2">Brand</h5>
                    <h6 className="mt-2">{brand?brand:""}</h6>
                  </div>
                  <div className=" d-flex justify-content-between align-items-center data-list mb-3">
                    <h5 className="mt-2">Type</h5>
                    <h6 className="mt-2">{category?category:""}</h6>
                  </div>
                  <div className=" d-flex justify-content-between align-items-center data-list mb-3">
                    <h5 className="mt-2">Availability</h5>
                    <h6 className="mt-2">In-Stock</h6>
                  </div>
                 
                  <div className=" d-flex justify-content-between align-items-center data-list mb-3">
                    <h5 className="mt-2">Tags</h5>
                    <h6 className="mt-2">{tags?tags:""}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
