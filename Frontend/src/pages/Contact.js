import React from "react";
import { json, Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { ImHome } from "react-icons/im";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsInfoLg } from "react-icons/bs";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";

const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  comment: yup.string().required("Comment is required"),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery(values));
    },
  });

  return (
    <>
      <Meta title="Contact"></Meta>
      <BreadCrumb title="Contacts" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row mb-5">
            <div className="col-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.8800560436024!2d77.31718626698147!3d28.343117610228905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdb8a7e6cd5d5%3A0xd53a2531865d503f!2sMangla%20garments!5e0!3m2!1sen!2sin!4v1688815697058!5m2!1sen!2sin"
                width="600"
                height="450"
                title="maps"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-md-6 p-4 ">
              <h3 className="mb-3">Get In Touch With Us</h3>
              <div className="d-flex flex-column  gap-15">
                <div className="d-flex gap-30">
                  <ImHome className="fs-4 " />
                  <div className="text-wrap">
                    <p className="ml-2 ">
                      Near Main market , Ambedhkar chowk ,Ballabgarh
                      <br/>
                      Faridabad Haryana 121004
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-30 ">
                  <BsTelephoneFill className="fs-4 " />
                  <span className="ml-2">+91 7042707091, 7042707092</span>
                </div>
                <div className="d-flex gap-30 ">
                  <MdEmail className="fs-4 " />
                  <span className="ml-2">manglagarment@gmail.com</span>
                </div>
                <div className="d-flex gap-30 ">
                  <BsInfoLg className="fs-4 " />
                  <span className="ml-2">Monday-Sunday, 10AM - 8PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row bg-white">
            <div className="col-md-12 p-4">
              <h3 className="mb-3 align-item-itself ">Contact </h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column justify-content-around gap-15 mb-4"
              >
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control bg-light border-0 text-dark"
                    placeholder="Name"
                    aria-label="Name"
                    value={formik.values.name}
                    id="name"
                    name="name"
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  ></input>
                  <label for="name">Name</label>
                </div>
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}

                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control bg-light border-0 text-dark"
                    placeholder="Email"
                    aria-label="email"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  ></input>
                  <label for="Email">Email</label>
                </div>
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                <div className="form-floating">
                  <input
                    type="tel"
                    className="form-control bg-light border-0 text-dark"
                    placeholder="Mobile"
                    aria-label="Mobile"
                    value={formik.values.mobile}
                    name="mobile"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  ></input>
                  <label for="Contact Number">Contact Number</label>
                </div>
                {formik.errors.mobile ? (
                  <div>{formik.errors.mobile}</div>
                ) : null}

                <div className="form-floating">
                  <textarea
                    className="form-control bg-light border-0 text-dark"
                    id="Address"
                    placeholder="Review"
                    rows="5"
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange("comment")}
                    onBlur={formik.handleBlur("comment")}
                  />
                  <label for="Address">Review</label>
                </div>
                {formik.errors.comment ? (
                  <div>{formik.errors.comment}</div>
                ) : null}

                <button type="submit" className="button ">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
