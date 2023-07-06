import { React, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { useFormik } from "formik";
import {createsms, getAsms, resetState, updateAsms} from "../features/Sms/SmsSlice";
import CustomInput from "../component/CustomInput";
import {message} from "antd";
let schema = yup.object().shape({
  templateId: yup.string().required("TempleteId  is Required"),
  senderId:yup.string().required("SenderId is Required"),
  EntityId:yup.string().required("EntityId is Required"),
  message:yup.string().required("Message is Required"),

});
const Addsms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getSmsId = location.pathname.split("/")[3];
  
  const newSize = useSelector((state) => state.sms);
  const {
    isSuccess,
    isError,
    isLoading,
    createdsize,
    updatedsize,
    updatedsms,
    sizeName,
  } = newSize;
  useEffect(() => {
    if (getSmsId !== undefined) {
      dispatch(getAsms(getSmsId));
    } else {
      dispatch(resetState());
    }
  }, [getSmsId]);

  useEffect(() => {

    
    if (isSuccess && createdsize) {
      message.success("Sms Added Successfullly!");
    }
    if (isSuccess && updatedsms) {
      message.success("Sms Updated Successfullly!");
      navigate("/admin/list-sms");
    }
    if (isError) {
      message.error ("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdsize]);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      templateId:  sizeName?.templateId||"",
      senderId:sizeName?.senderId
      ||"",
      message:sizeName?.message
      ||"",
      EntityId:sizeName?.EntityId
      ||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
           
      if (getSmsId !== undefined) {
        const data = { id: getSmsId, sizeData: values };
        
        dispatch(updateAsms(data));
        dispatch(resetState());
      } else {
     
        dispatch(createsms(values));
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
        {getSmsId !== undefined ? "Edit" : "Add"} Sms
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Template id"
            onChng={formik.handleChange("templateId")}
            onBlr={formik.handleBlur("templateId")}
            val={formik.values.templateId}
            id="size"
          />
 <CustomInput
            type="text"
            label="Enter sender id"
            onChng={formik.handleChange("senderId")}
            onBlr={formik.handleBlur("senderId")}
            val={formik.values.senderId}
            id="size"
          />
 <CustomInput
            type="text"
            label="Enter Entity id"
            onChng={formik.handleChange("EntityId")}
            onBlr={formik.handleBlur("EntityId")}
            val={formik.values.EntityId}
            id="size"
          />
 <CustomInput
            type="text"
            label="Enter Message"
            onChng={formik.handleChange("message")}
            onBlr={formik.handleBlur("message")}
            val={formik.values.message}
            id="size"
          />
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getSmsId !== undefined ? "Edit" : "Add"} Sms
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addsms;
