import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../features/auth/authSlice";

import { message } from "antd";
const schema = yup.object().shape({
  firstname: yup.string().required("Name is required"),
  lastname: yup.string().required("lastname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  password: yup.string().required("password is required"),
});
export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(registration(values));
      message.success("Register Succesfully");
      navigate("/login");
    },
  });

  const authState = useSelector((state) => state.auth);


  return (
    <>
      <div
        className="container-xxl"
        style={{
          background: `url('https://blog.hubspot.com/hs-fs/hubfs/ecommerce%20marketing.jpg?width=595&height=400&name=ecommerce%20marketing.jpg')`,

          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="row d-flex align-items-center justify-content-center">
          <div className=" card rounded-5 col-12 col-sm-6 col-md-4 mx-auto  p-4 mx-5">
            <h4 className="mb-3 mt-2 text-center">Sign Up</h4>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form-floating">
                <CustomInput
                  type="text"
                  label="firstname"
                  id="namew"
                  name="firstname"
                  onChng={formik.handleChange("firstname")}
                  onBlr={formik.handleBlur("firstname")}
                  val={formik.values.firstname}
                />
                {formik.errors.firstname ? (
                  <div>{formik.errors.firstname}</div>
                ) : null}
              </div>
              <div className="form-floating">
                <CustomInput
                  type="text"
                  label="lastname"
                  id="namew"
                  name="lastname"
                  onChng={formik.handleChange("lastname")}
                  onBlr={formik.handleBlur("lastname")}
                  val={formik.values.lastname}
                />
                {formik.errors.lastname ? (
                  <div>{formik.errors.lastname}</div>
                ) : null}
              </div>

              <div className="form-floating">
                <CustomInput
                  type="email"
                  label="email"
                  id="email"
                  name="email"
                  onChng={formik.handleChange("email")}
                  onBlr={formik.handleBlur("email")}
                  val={formik.values.email}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              </div>

              <div className="form-floating">
                <CustomInput
                  type="number"
                  label="mobile"
                  id="mobile"
                  name="mobile"
                  onChng={formik.handleChange("mobile")}
                  onBlr={formik.handleBlur("mobile")}
                  val={formik.values.mobile}
                />
                {formik.errors.mobile ? (
                  <div>{formik.errors.mobile}</div>
                ) : null}
              </div>

              <div className="form-floating mb-4">
                <CustomInput
                  type="password"
                  label="password"
                  id="pass"
                  name="password"
                  onChng={formik.handleChange("password")}
                  onBlr={formik.handleBlur("password")}
                  val={formik.values.password}
                />
                {formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
              <div className=" d-flex justify-content-center gap-30">
                <button
                  className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                  style={{ background: "#ffd333" }}
                  type="submit"
                >
                  Sign-up
                </button>
              </div>
            </form>
            <Link
              to="/login"
              className="border-0 px-3 py-2  fw-bold w-100 text-center text-decoration-none fs-5"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
