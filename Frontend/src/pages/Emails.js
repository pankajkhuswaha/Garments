import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { getUsers } from "../features/cutomers/customerSlice";
import {bulk_mail, createemail, getAemail, resetState, updateAemail} from "../features/email/emailSlice";
import CustomInput from "../component/CustomInput";
import {message} from 'antd'
const Emails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.pathname.split(",")[0].split("/")[3];
  const getemailId = location.pathname.split(",")[1];

  const newSize = useSelector((state) => state.email);
  const customerstate = useSelector((state) => state.customer.customers);
  const customer = customerstate.map((item) => item.email);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const {
    isSuccess,
    isError,
    isLoading,
    createdEmail,
    updatedsize,
    updatedemail,
    Amail,
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
    if (isSuccess && createdEmail) {
      message.success("Email added successfully!");
    }
    if (isSuccess && updatedemail) {
      message.success("Email updated successfully!");
      navigate("/admin/list-email");
    }
    if (isError) {
      message.error ("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdEmail]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // templateId: customer || [],
      subject: Amail?.subject || "",
      message: Amail?.message || "",
      selectedEmails: [],
    },
    onSubmit: (values) => {

      if (getemailId !== undefined) {
        dispatch(bulk_mail({id:getemailId,emails: selectedEmails}))
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      } else {
        dispatch(createemail(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const [selectedEmails, setSelectedEmails] = useState([]);

  const handleCheckboxChange = (e) => {
    const email = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedEmails([...selectedEmails, email]);
    } else {
      setSelectedEmails(selectedEmails.filter((e) => e !== email));
    }
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const allEmails = customerstate.map((item) => item.email);
      setSelectedEmails(allEmails);
    } else {
      setSelectedEmails([]);
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getemailId !== undefined ? "Send " : "Add"} Email
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          {/* <CustomInput
            type="text"
            label="Enter Email Id"
            onChng={formik.handleChange("templateId")}
            onBlr={formik.handleBlur("templateId")}
            val={formik.values.templateId}
            id="size"
          /> */}
          <div className="checkbox-dropdown " style={{ height: "200px", overflow: "scroll" }}>
            <label>
              <input
                type="checkbox"
                value="select-all"
                checked={selectedEmails.length === customerstate.length}
                onChange={(e) => {
                  handleSelectAllChange(e);
                  formik.setFieldValue(
                    "selectedEmails",
                    selectedEmails.length === customerstate.length ? customerstate.map((item) => item.email) : []
                  );
                }}
              />
              Select All
            </label>
            Choose email
            <ul className="checkbox-dropdown-list ">
              {customerstate.map((item) => {
                return (
                  <li key={item.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={item.email}
                        name="email"
                        checked={selectedEmails.includes(item.email)}
                        onChange={(e) => {
                          handleCheckboxChange(e);
                          formik.setFieldValue(
                            "selectedEmails",
                            selectedEmails.includes(item.email)
                              ? selectedEmails.filter((e) => e !== item.email)
                              : [...selectedEmails, item.email]
                          );
                        }}
                      />
                      {item.email}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
 <CustomInput
            type="text"
            label="Enter subject"
            onChng={formik.handleChange("subject")}
            onBlr={formik.handleBlur("subject")}
            val={formik.values.subject}
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
readOnly={true}
          /> 
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {mobile==='undefined'? "Bulk " : "Send"} Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Emails;
