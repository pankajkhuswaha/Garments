import { React, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {message} from 'antd'
import * as yup from "yup";
import { useFormik } from "formik";
import {createemail, getAemail, resetState, updateAemail} from "../features/email/emailSlice";
import CustomInput from "../component/CustomInput";
let schema = yup.object().shape({
 
  subject:yup.string().required("subject is Required"),
 
  message:yup.string().required("Message is Required"),

});
const Addemail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getemailId = location.pathname.split("/")[3];
  
  const newSize = useSelector((state) => state.email);
  const {
    isSuccess,
    isError,
    isLoading,
    createdsize,
    updatedsize,
    updatedemail,
    sizeName,
  } = newSize;
  useEffect(() => {
    if (getemailId !== undefined) {
      dispatch(getAemail(getemailId));
    } else {
      dispatch(resetState());
    }
  }, [getemailId]);

  useEffect(() => {

    
    if (isSuccess && createdsize) {
      message.success("Email Added Successfullly!");
    }
    if (isSuccess && updatedemail) {
      message.success("Email Updated Successfullly!");
      navigate("/admin/list-email");
    }
    if (isError) {
      message.error ("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdsize]);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      
      subject:sizeName?.subject
      ||"",
      message:sizeName?.message
      ||"",
      
    },
    validationSchema: schema,
    onSubmit: (values) => {
         
      if (getemailId !== undefined) {
        const data = { id: getemailId, sizeData: values };
     
        dispatch(updateAemail(data));
        dispatch(resetState());
      } else {
   
        dispatch(createemail(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getemailId !== undefined ? "Edit" : "Add"} Email
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          {/* <CustomInput
            type="text"
            label="Enter Email id"
            onChng={formik.handleChange("templateId")}
            onBlr={formik.handleBlur("templateId")}
            val={formik.values.templateId}
            id="size"
          /> */}
 <CustomInput
            type="text"
            label="Enter subject"
            onChng={formik.handleChange("subject")}
            onBlr={formik.handleBlur("subject")}
            val={formik.values.subject}
            id="size"
          />
 
 <textarea
  rows={15}
  cols={145}
  label="Enter Message"
  onChange={formik.handleChange("message")}
  onBlur={formik.handleBlur("message")}
  value={formik.values.message}
  id="size"
/>
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getemailId !== undefined ? "Edit" : "Add"} Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addemail;
