import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import {message} from 'antd'
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading,role } = authState.auth;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
    
  dispatch(login(values)) 
    },
  });
  
 

  useEffect(() => {
    if (isSuccess) {
      if(role==="admin"||role==="super"){
        message.success("Login to Admin Panel")
        navigate("/admin");
window.location.reload()
      }
      else if(role==='user'){
        message.success("Login to User")
        navigate("/")
        window.location.reload()
      }

     
    } 
  }, [user, isError, isSuccess, isLoading, ]);
  return (
    <div className="py-5" style={{   background: `url('https://blog.hubspot.com/hs-fs/hubfs/ecommerce%20marketing.jpg?width=595&height=400&name=ecommerce%20marketing.jpg')`,
   
    backgroundPosition: "center",
    minHeight: "100vh" }}> 
  <div className="container">
    <div className="row justify-content-center align-items-center">
      <div className="col-md-6 col-lg-4 my-5 bg-white rounded-3 mx-auto p-4">
       
        <div className="error text-danger text-center">
          {message === "Rejected" ? " ": ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address   "
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error text-danger mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error text-danger text-danger text-danger text-danger text-danger text-danger text-danger text-danger mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 mt-3"
            style={{ background: "#1877f2", borderRadius:"6px" }}
            type="submit"
          >
            Login
          </button>
          <div className="align-items-center justify-content-between mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
            <br></br>
            <hr></hr>
            <Link to='/signup'
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 mt-3"
            style={{ background: "#42b72a",borderRadius:"6px" }}
           
          >
            Create New Account
          </Link>
          </div>
         
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
