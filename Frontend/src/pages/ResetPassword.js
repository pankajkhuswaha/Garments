import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { reset_password } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";
export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      passwords: "",
    },
    validationSchema: yup.object({
      password: yup.string().required("Required"),
      passwords: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),

    onSubmit: (values) => {
      const data = {
        password: values.password,
        token: token,
      };
      dispatch(reset_password(data));
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },
  });
  return (
    <>
      <Meta title="Reset Password"></Meta>
      <BreadCrumb title="Reset Password" />
      <div className="Forget-password-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row d-flex align-items-center justify-content-center">
            <div className=" card rounded-5 col-12 col-sm-6 col-md-4 mx-auto  p-4 mx-5">
              <h4 className="mb-3 mt-2 text-center">Reset Password</h4>
              <form
                action=""
                className="d-flex flex-column justify-content-around gap-15 mb-2"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-floating">
                  <CustomInput
                    type="password"
                    id="pass"
                    name="password"
                    onChng={formik.handleChange("password")}
                    onBlr={formik.handleBlur("password")}
                    val={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error text-danger text-danger text-danger text-danger text-danger text-danger text-danger">
                      {formik.errors.password}
                    </div>
                  ) : null}
                  <label for="ew_password">New Password</label>
                </div>

                <div className="form-floating">
                  <CustomInput
                    type="password"
                    id="passs"
                    name="passwords"
                    onChng={formik.handleChange("passwords")}
                    onBlr={formik.handleBlur("passwords")}
                    val={formik.values.passwords}
                  />
                  {formik.touched.passwords && formik.errors.passwords ? (
                    <div className="error text-danger text-danger text-danger text-danger text-danger text-danger text-danger">
                      {formik.errors.passwords}
                    </div>
                  ) : null}
                  <label for="ew_password">Confirm Password</label>
                </div>
                <div className=" d-flex justify-content-center gap-30 mt-4">
                  <button className="button" type="submit">
                    OK
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
