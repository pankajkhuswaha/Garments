import React ,{useState,useEffect}from "react";
import { Link ,NavLink,useNavigate } from "react-router-dom";
import {BiArrowBack} from "react-icons/bi"
import watch from "../images/watch.jpg";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { address } from "../features/auth/authSlice";
import { getcart } from "../features/product cart/cartSlice";
const contactSchema = yup.object().shape({
  firstname: yup.string().required("Name is required"),
 
  Address: yup.string().required("Address is required"),
  Appartment: yup.string().required("Appartment is required"),
  City: yup.string().required("City is required"),
  zipcode: yup.string().required("zipcode is required"),
});



const Checkout = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        firstname:"",
        lastname:"",
        Address: "",
        Appartment:"",
        City: "",
        zipcode:""
      },
      validationSchema: contactSchema,
      onSubmit: (values) => {
      
        dispatch(address(formik.values));
        navigate("/app/payments");
        let user=values;
      
        address.address(user)
     
      },
    }); 
    
    const authState = useSelector((state) => state);
  
    const { user, isError, isSuccess, isLoading, message } = authState.auth;

    const Items = useSelector((state) => state.cart.cart);
  
    useEffect(() => {
      if (isSuccess) {
        navigate("/app/checkout");
      } else {
        navigate("");
      }
    }, [user, isError, isSuccess, isLoading]);


    //
   

    useEffect(() => {
      dispatch(getcart());
    }, [dispatch]);
    
   

    let cart = [];

    if (Items) {
      cart = Items.data.map((item, i) => {
        return {
          cartTotal: Items.cartTotal,
          count: item.count,
          price: item.price,
          total: item.total,
          url: item.url
        };
      });
    }
  
    
const size=Items.length
const cart_size={
cart_size:size
}
 //

  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-7 mb-5 mb-sm-0">
              <div className="chekcout-left-data">
                <h2 className="website-name">Deepnap</h2>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price" to="/app/cart">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /&nbsp;
                    <li
                      className="breadcrumb-ite total-price active"
                      aria-current="page"
                    >
                      Information
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item total-price active">
                      Shipping
                    </li>
                    &nbsp; /
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title">Contact Information</h4>
                <p className="user-details">
                  Deepak sharma (Deepnapsoftech@gmail.com)
                </p>
                <div>
                <form
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                  onSubmit={formik.handleSubmit}>
                <div className="w-100">
               

                </div>
                
                  <div className="flex-grow-1">
                  <CustomInput
                 type="text"
                 label="firstname"
                 id="namew"
                 name="firstname"
                 onChng={formik.handleChange("firstname")}
                 onBlr={formik.handleBlur("firstname")}
                 val={formik.values.firstname}
          />
                  </div>
<div className="text-danger">
                  {formik.errors.firstname ? <div>{formik.errors.firstname}</div> : null}</div>
                  <div className="flex-grow-1">
                  <CustomInput
            type="text"
            label="lastname"
            id="namew"
            name="lastname"
            onChng={formik.handleChange("lastname")}
            onBlr={formik.handleBlur("lastname")}
            val={formik.values.lastname}
          />
                  </div>
                  
                  <div className="w-100">
                  <CustomInput
            type="text"
            label="Address"
            id="Address"
            name="Address"
            onChng={formik.handleChange("Address")}
            onBlr={formik.handleBlur("Address")}
            val={formik.values.Address}
          />
                  </div>
                  <div className="text-danger">
                  {formik.errors.Address ? <div>{formik.errors.Address}</div> : null}</div>
                  <div className="w-100">
                  <CustomInput
            type="text"
            label="Appartment"
            id="Appartment"
            name="Appartment"
            onChng={formik.handleChange("Appartment")}
            onBlr={formik.handleBlur("Appartment")}
            val={formik.values.Appartment}
          />
                  </div>
                  <div className="text-danger">
                  {formik.errors.Appartment ? <div>{formik.errors.Appartment}</div> : null}</div>
                  <div className="flex-grow-1">
                  <CustomInput
            type="text"
            label="City"
            id="City"
            name="City"
            onChng={formik.handleChange("City")}
            onBlr={formik.handleBlur("City")}
            val={formik.values.City}
          />
                  </div>
                  <div className="text-danger">
                  {formik.errors.City ? <div>{formik.errors.City}</div> : null}</div>
                  
                  <div className="flex-grow-1">
                  <CustomInput
            type="number"
            label="zipcode"
            id="zipcode"
            name="zipcode"
            onChng={formik.handleChange("zipcode")}
            onBlr={formik.handleBlur("zipcode")}
            val={formik.values.zipcode}
          />
                  </div>
                  <div className="text-danger">
                  {formik.errors.zipcode ? <div>{formik.errors.zipcode}</div> : null}</div>
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                    <Link className="text-dark total-price" to="/app/cart">
                        <BiArrowBack className="me-2"/>Return to Cart
                      </Link>
                      <button className=" button" type="submit" >
                            Next 
                      </button>
                    </div>
                  </div>
                </form>
                </div>
            
              </div>
            </div>
           
            <div className="col-md-5">
                    <div className="border-bottom py-4">
                    {  cart.map((items,i)=>(
              <div className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      {items.count}
                    </span>
                    <img className="img-fluid" src={items?.url} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">{items?.brand}</h5>
                    {/* <p className="total-price">s / #agfgfd</p> */}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">{items?.price}</h5>
                </div>
              </div>
 ))}

            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">{Items?.cartTotal}</p>
              </div>
              {/* <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">5000</p>
              </div> */}
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">{Items?.cartTotal}</h5>
            </div>
            </div>
           
            


            
          </div>
            </div>
          </div>
   
    </>
  );
};

export default Checkout;
