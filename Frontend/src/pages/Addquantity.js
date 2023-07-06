import { React, useEffect } from "react";
import CustomInput from "../component/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {message } from 'antd'
import { useFormik } from "formik";
import {
  createQuantity,
  getAQuantity,
  resetState,
  updateAQuantity,
} from "../features/Quantity/quantitySlice";
let schema = yup.object().shape({
  title: yup.string().required("Quantity is Required"),
});
const Addquantity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getQuantityId = location.pathname.split("/")[3];
 
  const newQuantity = useSelector((state) => state.Quantity);
  const {
    isSuccess,
    isError,
    isLoading,
    createdQuantity,
    updatedQuantity,
    QuantityName,
  } = newQuantity;

  
  useEffect(() => {
    if (getQuantityId !== undefined) {
      dispatch(getAQuantity(getQuantityId));

    } else {
      dispatch(resetState());
    }
  }, [getQuantityId]);
  useEffect(() => {
    if (isSuccess && createdQuantity) {
      message.success("Quantity Added Successfullly!");
    }
    if (isSuccess && updatedQuantity) {
      message.success("Quantity Updated Successfullly!");
      navigate("/admin/list-Quantity");
    }
    if (isError) {
      message.error ("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdQuantity]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: QuantityName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getQuantityId !== undefined) {
        const data = { id: getQuantityId, QuantityData: values };
        dispatch(updateAQuantity(data));
        dispatch(resetState());
      } else {
        dispatch(createQuantity(values));
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
        {getQuantityId !== undefined ? "Edit" : "Add"}  Sub-Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Sub category"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="Quantity"
          />
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getQuantityId !== undefined ? "Edit" : "Add"} Sub-Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addquantity;
