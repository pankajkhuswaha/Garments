import { React, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {message} from 'antd'
import {createsize, getAsize, resetState, updateAsize} from "../features/Size/SizeSlice";
import { deleteAQuantity, getQuantitys } from "../features/Quantity/quantitySlice";
import CustomInput from "../component/CustomInput";
let schema = yup.object().shape({
  title: yup.string().required("Size is Required"),
});
const Addsize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(getQuantitys());
  const location = useLocation();
  const getSizeId = location.pathname.split("/")[3];
  const newSize = useSelector((state) => state.size);
  const {
    isSuccess,
    isError,
    isLoading,
    createdsize,
    updatedsize,
    sizeName,
  } = newSize;
  // const QuantityState = useSelector((state) => state.Quantitys.Quantitys);


  useEffect(() => {
    if (getSizeId !== undefined) {
      dispatch(getAsize(getSizeId));

    } else {
      dispatch(resetState());
    }
  }, [getSizeId]);

  useEffect(() => {

   
    if (isSuccess && createdsize) {
      message.success("Size Added Successfullly!");
    }
    if (isSuccess && updatedsize) {
      message.success("Size Updated Successfullly!");
      navigate("/admin/list-size");
    }
    if (isError) {
      message.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdsize]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: sizeName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      
      if (getSizeId !== undefined) {
        const data = { id: getSizeId, sizeData: values };
        dispatch(updateAsize(data));
        dispatch(resetState());
      } else {
        dispatch(createsize(values));
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
        {getSizeId !== undefined ? "Edit" : "Add"} Size
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Size"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="size"
          />
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getSizeId !== undefined ? "Edit" : "Add"} Size
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addsize;
