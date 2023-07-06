import React, { useState ,useEffect} from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link ,useLocation, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import convert from 'color-convert';
import { Image } from 'antd';


import { createcart} from '../features/product cart/cartSlice'
import { Rate } from 'antd';
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import { getAproduct, getProducts, rating, resetState } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import { message } from "antd";
const SingleProduct = () => {
  const location=useLocation();
  const dispatch=useDispatch();
 const navigate=useNavigate();
const[showColor,setShowColor]=useState([])
const[showSize,setShowSize]=useState([])
  const [value, setValue] = useState(3);
  const [style, setStyle] = useState({});
  const id= location.pathname.split("/")[3];
 const [colorname,setColorname]=useState("no color")
 const [sizename,setSizename]=useState("no Size")
  const [copied, setCopied] = useState(false);
  const product=useSelector((state=>state.product))
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const auth=useSelector((state)=>state.auth.user)

    const { _id,brand, category, color, description, images,Discount, price, quantity, ratings,star, slug, sold, tags, title,totalrating, size } = location?.state ;
    // Do something with the destructured values
 



  const [total, setTotal] = useState(totalrating);
  // setTotal();
 const[image,setImage]=useState(images[0].url);
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
const [selectedColor, setSelectedColor] = useState(null);
  const handleSizeClick = (siz) => {
    setSelectedSize(siz);
    setShowSize(!showSize);
    setSizename(siz.title)

    message.success("Size is Selected");
  }
  
  const handleColorClick = (colo) => {
    setSelectedColor(colo);
    setShowColor(!showColor);
   setColorname(colo.title)
    message.success("Color is Selected");
  }

  const handleAddToCart = () => {
    if(auth===null){
      message.info("please login....")
      setTimeout(()=>{
 
 navigate("/login")},1000)
   }else{
    dispatch(createcart({_id,count,colorname,sizename,price}));

message.success("item is added in cart")
    }

  };
  const handleAddToCarts = () => {
    if(auth===null){
      message.info("please login....")
      setTimeout(()=>{
 
 navigate("/login")},1000)
   }else{
    dispatch(createcart({_id,count,colorname,sizename,price}));
    message.success("item is added in cart")
    navigate("/app/cart")
    }
  };
 
  const  [orderProduct, setOrderProduct] = useState(true)
  const formik = useFormik({
    initialValues: {
      review:"",
    },
   
    onSubmit: (values) => {
     
      const val={
        prodId:location?.state?._id,
        comment:formik?.values?.review,
        star:value
      }

      dispatch(rating(val))
message.success("Comment Added Sucessfully")
setTimeout(() => {
  dispatch(resetState());
}, 300);
dispatch(getProducts());

  }});

const percentage = (ratings.length) / 100;
  return (
    <>
    
  <Meta title="Product Name"></Meta>
      <BreadCrumb title="Product Name" />
      <div className="compare-product-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row d-flex align-items-center justify-content-center">
          <div className="col-12 card bg-white mb-5 p-3">
        <div className="wrapper row">
          <div className="preview col-md-6"> 
            <div className="preview-pic tab-content">
            <div className="tab-pane active p-5" id="pic-1">
        <Image
          style={{ width: "400px", height: "400px" }}
          src={`${image}`}
          alt="example" />
    </div>
       </div>
            <ul className="preview-thumbnail nav nav-tabs">
              <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={`${images[0]?.url}` } 
                onClick={(e)=>{
                  e.preventDefault();
                  setImage(images[0]?.url)

                }
                }
                style={{  width: "100px", height: "100px"}}  /></a></li>
          <li>
  {images.length > 0 ? (
    <a data-target="#pic-2" data-toggle="tab">
      <img src={`${images[images.length > 1 ? 1 : 0]?.url}`} onClick={(e) => {
        e.preventDefault();
        setImage(images[images.length > 1 ? 1 : 0]?.url);
      }}  style={{  width: "100px", height: "100px"}} />
    </a>
  ) : (
    <img src={`${images[0]?.url}`} />
  )}
</li>
<li>
  {images.length > 0 ? (
    <a data-target="#pic-2" data-toggle="tab">
      <img src={`${images[images.length > 2 ? 2 : 0]?.url}`} onClick={(e) => {
        e.preventDefault();
        setImage(images[images.length > 2 ? 2 : 0]?.url);
      }}   style={{  width: "100px", height: "100px"}}/>
    </a>
  ) : (
    <img src={`${images[0]?.url}`} />
  )}
</li>
<li>
  {images.length > 0 ? (
    <a data-target="#pic-2" data-toggle="tab">
      <img src={`${images[images.length > 3 ? 3 : 0]?.url}`} onClick={(e) => {
        e.preventDefault();
        setImage(images[images.length > 3 ? 3 : 0]?.url);
      }}   style={{  width: "100px", height: "100px"}}/>
    </a>
  ) : (
    <img src={`${images[0]?.url}`} />
  )}
</li>
            </ul>
            <br></br><br></br>    
          </div>
          <div className="details col-md-6 gap-10">
            <h5 className="product-title">{title?title:""}</h5>
<hr></hr>
<p className="product-description">Key Features</p>
<p className="product-description">{description?description.replace(/(<([^>]+)>)/gi,""):" "
}</p>
<br/>
<h5 className="price">current price: <span > &nbsp;₹ {Discount>0?price-(price*Discount)/100:price}</span></h5>

<h6 className="colors d-flex;
align-items-center">colors: 

{color && color.length > 0 ? color.map((colo) => {
  const colorCode = colo.title;

  const style = {
    backgroundColor: colo.title,
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "2px solid white"
  };
 
  return (
    <span
    key={colorCode}
    style={style}
    onClick={() => {
      handleColorClick(colo);
      message.success("Color is selected");
    }}
  ></span>
  );
}) :" "}

         
</h6>
<h6 className="sizes">

Available:
{size && size.length > 0 ? 
    size.map((siz) => {
     
        return (
            
                
                <span className="size" data-toggle="tooltip" title="small"   onClick={() => handleSizeClick(siz)}>
                    {siz.title ? siz.title : ''}
                </span>
            
        );
    }) 
    : " "
}
            
</h6>           <div className="action row d-flex  gap-30 justify-content-between mb-2">
             <div className="col-sm-4 d-flex gap-10 ">
             <h5 className="mb-0">Quantity  </h5>
             <p style={{ display: "flex", alignItems: "center" }}>
  <button onClick={() => setCount(Math.min(count + 1, 100))} style={{border:"none", fontSize:"35px", background:"transparent" }}>+</button>
  <input
    type="number"
    max={100}
    min={1}
    style={{ width: "50px", height: "30px", margin: "0 10px" }}
    value={count}
    onChange={(e) => setCount(parseInt(e.target.value))}
  />
  <button onClick={() => setCount(Math.max(count - 1, 1))} style={{border:"none", fontSize:"35px", background:"transparent" }}>-</button>
</p>
      
             </div>

            </div>
            <div className="col-sm-7 ms-5">
  <button className="button" onClick={handleAddToCart}>
    Add to Cart
  </button>
  {/* <button className="button" onClick={handleAddToCarts}>
    Buy Now
  </button> */}
</div>
            <div className="rating">
              <div className="stars">
              
              <ReactStars
      count={5}
      size={30}
      value={total}
      edit={false}
      activeColor="#ffd700"
    />

              </div>

              <span className="review-no">41 reviews</span>
            </div>
            
            
            <p className="vote"><strong>{percentage?percentage:""}%</strong> of buyers enjoyed this product! <strong>({ ratings?ratings.length:""} votes)</strong></p>
      
            <div className="d-flex gap-10 flex-column  mt-3">
                  <h5 className="product-heading">Shipping & Returns :</h5>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
 

          </div>
        </div>
      
          </div>
            <div className="col-12 card mx-auto p-4 mb-4">
              <h4>Description</h4>
              <p>
              { description?description.replace(/(<([^>]+)>)/gi, ""):""
}
              </p>
            </div>

            <h4>Customer Reviews</h4>
            <div className="col-12 card mx-auto p-4 mb-4">
              <div className="row mx-2 border-bottom border-primary mb-3 pb-3">
                <div className="col-4 col-sm-1 ">
                  <div className="review-logo text-white mb-5">
                    <p>R</p>
                  </div>
              
                </div>
                <div className="col-8 d-flex justify-content-between">
                <div className="row">
                   <div className="">
                <ReactStars
                    count={5}
                    size={30}
                    value={5}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <h6>Good Product</h6>
                  <p>by Rohit saini on March. 09.2023</p>
                </div>

                  {
                  orderProduct && (
                    <div className="">
                      <a >Write a Review</a>
                    </div>
                  )
                  }
                </div>

             
                </div>
              </div>
              <form action=""  onSubmit={formik.handleSubmit}>
                  <div className="review-font mb-0">

              <h5 >Write a Review</h5> 
                 
              <span>
      <Rate tooltips={desc} onChange={setValue} value={value} allowHalf defaultValue={2.5}/>
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
    </span>
                  </div>

              <div className="row mb-2" >
             
              
                <CustomInput
            type="textarea"
            label="Leave a comment here"
            id="review"
            name="review"
            rows={5}
            onChng={
            
               formik.handleChange("review")}
            
             
            onBlr={formik.handleBlur("review")}
            val={formik.values.review}
            
          /> 
               <div className="col-md-2 mt-2 ">
               <button type="submit"  className="button"  >
              Submit Review
            </button>
               </div>
              </div>
              </form>

              {ratings && ratings.length > 0 && ratings.map((rating,i) => (
              <div className="row mt-2 border border-secondary shadow-none">
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 mx-2">Umakant</h5>
                  <ReactStars
  count={rating.star}
  size={rating.size}
  value={rating.star}
  edit={false}
  activeColor="#ffd700"
/>
                </div>             
  <div key={rating._id}>
    <p>{rating.comment}</p>
  </div>

              </div>
           ))}
       
            </div>
          </div>
        </div>
      </div>   
    </>
  );
};

export default SingleProduct;














