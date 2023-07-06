import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { getemail, resetState,deleteAemail,getAemail } from "../features/email/emailSlice";
import { SendOutlined } from "@ant-design/icons";


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
 
  {
    title: "Subject",
    dataIndex: "sender",
  },
 
  {
    title: "Message",
    dataIndex: "message",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
  {
    title: "Send email",
    dataIndex: "email",
  },
];

const Emaillist = () => {
  const location=useLocation()
  const [open, setOpen] = useState(false);
  const [sizeId, setsizeId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setsizeId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getemail());
  }, []);
  const sizeState = useSelector((state) => state.email.email);

  const emailes = location.pathname.split("/")[3];
  

  const data1 = [];
  for (let i = 0; i < sizeState.length; i++) {
    data1.push({
      key: i + 1,

      // "templateId": "1",
      // "senderId": "123",
      // "EntityId": "456",
      // "message": "Hello World"
    
      sender:sizeState[i]?.subject,
      
      message:sizeState[i]?.message,
      action: (
        <>
          <Link
            to={`/admin/addemail/${sizeState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(sizeState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
      email:  (
        <Link to={`/admin/email/${emailes+","+sizeState[i]._id}`}>
          <div className="checkbox">
            <label>
            
              <SendOutlined />
            </label>
          </div>
        </Link>
      ),
      
    });
  }
  const deleteSize = (e) => {
    dispatch(deleteAemail(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getemail());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Emails</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteSize(sizeId);
        }}
        title="Are you sure you want to delete this size?"
      />
    </div>
  );
};

export default Emaillist;
