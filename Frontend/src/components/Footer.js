import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import newsletter from "../images/newsletter.png";
import { resetState, setQueryParams } from "../features/product/productSlice";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import logo from "../Assest/assets/images/logoabs.png";
const Footer = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(createQuery(values));
      formik.resetForm();
    },
  });

  return (
    <>
      <footer className="py-1">
        <div className="container-xxl">
          <div className="row d-flex gap-2 align-items-center p-4 justify-content-between">
            <div className="col-md-5 col-12">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" className="mr-3" />
                <h3 className="mb-0 text-white">Sign Up for Now</h3>
              </div>
            </div>
            <div className="col-md-6 col-12">
            <form onSubmit={formik.handleSubmit}>              
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Your Email Address"
                    aria-label="Your Email Address"
                    aria-describedby="basic-addon2"
                    value={formik.values.email}
                    required
                    name="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <button
                    type="submit"
                    className="input-group-text p-2"
                    id="basic-addon2"
                  >
                    Subscribe
                  </button>
                </div>
            </form>
            </div>
            
          </div>
        </div>
      </footer>

      <footer className=" pt-2">
        <div className="container-xxl">
          <div className="row d-flex flex-md-row">
            <div className="col-sm-4 mb-4">
              <h5 className="text-white mb-1">Contact Us </h5>
              <div
                className="text-dark my-2 d-flex gap-2 align-items-center"
                style={{ fontWeight: "500" }}
              >
                {/* <img width={70} src={logo} alt="logo" /> */}
                <h3 className="text-light " style={{ fontWeight: "600" }}>
                  Mangla Market
                </h3>
              </div>
              <div>
                <address className="text-white fs-6 lh-3">
                  PLOT #4, MUJESSAR, near OLD MACHINE MARKET, Faridabad <br />{" "}
                  Haryana 121001
                </address>
                {/* <a href="tel:+91 8264954234" className="mt-3 d-block mb-3 text-white">
                +91 7042707091
                </a>
                <a href="mailto:dssharma@gmail.com" className="mt-2 d-block mb-3 text-white" >
                  afsdeals@gmail.com
                </a> */}
                <div className="social-icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="https://www.facebook.com/">
                    <BsFacebook className="fs-4" />
                  </a>
                  <a className="text-white" href="https://www.instagram.com/">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="https://twitter.com/">
                    <BsTwitter className="fs-4" />
                  </a>
                  <a className="text-white" href="https://www.youtube.com/">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              <h5 className="text-white mb-3">Information </h5>
              <div className="footer-links d-flex flex-column">
                <Link
                  to="/app/privacy-policy"
                  className="text-white py-sm-1  mb-1"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/app/refund-policy"
                  className="text-white py-sm-1  mb-1"
                >
                  Refund Policy
                </Link>
                <Link
                  to="/app/shipping-policy"
                  className="text-white py-sm-1  mb-1"
                >
                  Shipping policy
                </Link>
                <Link
                  to="/app/term-conditions"
                  className="text-white py-sm-1  mb-1"
                >
                  Terms & Conditions
                </Link>
                <Link to="/app/blogs" className="text-white py-sm-1  mb-1">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <h5 className="text-white mb-4">Account</h5>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-sm-1  mb-1" to="/app/about">
                  About us
                </Link>
                <Link className="text-white py-sm-1  mb-1" to="/app/contact">
                  FAQ
                </Link>
                <Link className="text-white py-sm-1  mb-1" to="/app/contact">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="col-sm-2 mb-3">
              <h5 className="text-white mb-4">Important Links</h5>
              <div className="footer-links d-flex flex-column">
                <Link
                  className="text-white py-sm-1  mb-1"
                  to="/app/product"
                  onClick={() => {
                    dispatch(
                      setQueryParams({ param: "search", value: "t-shirt" })
                    );
                  }}
                >
                 T-Shirts
                </Link>
                <Link
                  className="text-white py-sm-1  mb-1"
                  to="/app/product"
                  onClick={() => {
                    dispatch(
                      setQueryParams({ param: "search", value: "denim" })
                    );
                  }}
                >
                  Denim
                </Link>
                <Link
                  className="text-white py-sm-1  mb-1"
                  to="/app/product"
                  onClick={() => {
                    dispatch(
                      setQueryParams({ param: "search", value: "men" })
                    );
                  }}
                >
                  Mens
                </Link>
                <Link
                  className="text-white py-sm-1  mb-1"
                  to="/app/product"
                  onClick={() => {
                    dispatch(
                      setQueryParams({ param: "search", value: "women" })
                    );
                  }}
                >
                  Women
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-1">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="text-center mb-0 text-white">
                All Rights Reserved. | | &copy; {new Date().getFullYear()};
                Devloped by Deepnap Softech
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
