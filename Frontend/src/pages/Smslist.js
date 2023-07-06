import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { getsms, resetState } from "../features/Sms/SmsSlice";
import { SendOutlined } from "@ant-design/icons";


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "template Id",
    dataIndex: "template",
  },
  {
    title: "Sender Id",
    dataIndex: "sender",
  },
  {
    title: "Entity  Id",
    dataIndex: "entity",
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
    title: "Send SMS",
    dataIndex: "sms",
  },
];

const Smslist = () => {
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
    dispatch(getsms());
  }, []);
  const sizeState = useSelector((state) => state.sms.sms);
  const smses = location.pathname.split("/")[3];
 

  const data1 = [];
  for (let i = 0; i < sizeState.length; i++) {
    data1.push({
      key: i + 1,

      // "templateId": "1",
      // "senderId": "123",
      // "EntityId": "456",
      // "message": "Hello World"
      template: sizeState[i].templateId,
      sender:sizeState[i].senderId,
      entity:sizeState[i].EntityId,
      message:sizeState[i].message,
      action: (
        <>
          <Link
            to={`/admin/addsms/${sizeState[i]._id}`}
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
      sms:  (
        <Link to={`/admin/sms/${smses+","+sizeState[i]._id}`}>
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
    // dispatch(deleteAsize(e));

    setOpen(false);
    setTimeout(() => {
      // dispatch(getsizes());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Sms</h3>
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

export default Smslist;
