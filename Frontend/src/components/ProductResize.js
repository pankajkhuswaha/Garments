import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";

const ProductResize = (props) => {
    const { grid } = props;
  
  let location = useLocation();
  return (
    <>
        <div
        className={` ${
          location.pathname == "/store" ? `gr-${grid}` : "col-3"
        } `}
      >
        <div
         
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <div>

              <img src="images/wish.svg" alt="wishlist" />
            </div>
            
          </div>
          <div className="product-image">
            <img src="images/watch.jpg" className="img-fluid" alt="product image" />
            <img src="images/watch-1.jpg" className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="desc">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src="images/prodcompare" alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src="images/view" alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src="images/add-cart" alt="addcart" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductResize
