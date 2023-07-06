import { React, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {createsms, getAsms, resetState, updateAsms} from "../features/Sms/SmsSlice";
import CustomInput from "../component/CustomInput";
import { sendsms } from "../features/send   Sms/SendSlice";
let schema = yup.object().shape({
  templateId: yup.string().required("TempleteId  is Required"),
  senderId:yup.string().required("SenderId is Required"),
  EntityId:yup.string().required("EntityId is Required"),
  message:yup.string().required("Message is Required"),

});
const Sms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.pathname.split(",")[0].split("/")[3];
  
  const getSmsId = location.pathname.split(",")[1];

  
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
      toast.success("Sms Added Successfullly!");
    }
    if (isSuccess && updatedsms) {
      toast.success("Sms Updated Successfullly!");
      navigate("/admin/list-sms");
    }
    if (isError) {
      toast.error ("Something Went Wrong!");
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
      mobile:mobile||""
    },
    // validationSchema: schema,
    onSubmit: (values) => {
     
           
      if (getSmsId !== undefined) {
    
        // dispatch(updateAsms(data));
        // dispatch(resetState());
        dispatch(sendsms(values))
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
        {getSmsId !== undefined ? "Send " : "Add"} SMS
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
            readOnly={true}
          />
 <CustomInput
            type="text"
            label="Enter sender id"
            onChng={formik.handleChange("senderId")}
            onBlr={formik.handleBlur("senderId")}
            val={formik.values.senderId}
            id="size"
            readOnly={true}
          />
 <CustomInput
            type="text"
            label="Enter Entity id"
            onChng={formik.handleChange("EntityId")}
            onBlr={formik.handleBlur("EntityId")}
            val={formik.values.EntityId}
            id="size"
            readOnly={true}
          />
 <CustomInput
            type="text"
            label="Enter Message"
            onChng={formik.handleChange("message")}
            onBlr={formik.handleBlur("message")}
            val={formik.values.message}
            id="size"
          />
         {mobile === 'undefined' ? (
  <div></div> // replace with desired element to render when mobile is undefined
) : (
  <CustomInput
    type="tel"
    label="Enter Mobile"
    onChng={formik.handleChange("mobile")}
    onBlr={formik.handleBlur("mobile")}
    val={formik.values.mobile}
    id="size"
  />
)}
<div className="error text-danger">
  {formik.touched.title && formik.errors.title}
</div>
           
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {mobile==='undefined'? "Bulk " : "Send"} SMS
          </button>
          <button
            className="btn btn-danger border-0 rounded-3 my-5 ms-5"
            type="submit"
          >
            {mobile ===undefined ? "Send " : "Bulk"} SMS
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sms;
