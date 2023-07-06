import React,{useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useDispatch } from "react-redux";
import { forget_password_reset } from "../features/auth/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
const Forgetpassword = () => {
  const [email, setEmail] = useState("");
const navigate=useNavigate();
const dispatch=useDispatch();
let schema = yup.object().shape({
   
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
    
  });
 const formik = useFormik({
      initialValues: {
      email: "",
      
      },
      validationSchema: schema,
     
    });

 return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form >
        <CustomInput
            type="email"
            label="email"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
      <button
        className="border-0 px-3 py-2 text-white fw-bold w-100"
        style={{ background: "#ffd333" }}
        type="submit"
        onClick={async(e)=>{
        e.preventDefault();
          await dispatch(forget_password_reset({email:formik.values.email}))
         
  
        }}
        
      >
        Send Link
      </button>
    </form>
      </div>
    </div>
  );
};

export default Forgetpassword;
