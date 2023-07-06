import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  deleteAsize, getAsize, getsizes,resetState } from "../features/Size/SizeSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Sizelist = () => {
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
    dispatch(getsizes());
  }, []);
  const sizeState = useSelector((state) => state.size.sizes);

  const data1 = [];
  for (let i = 0; i < sizeState.length; i++) {
    data1.push({
      key: i + 1,
      name: sizeState[i]?.title,
      action: (
        <>
          <Link
            to={`/admin/size/${sizeState[i]._id}`}
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
    });
  }
  const deleteSize = (e) => {
    dispatch(deleteAsize(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getsizes());
    }, 1000);
  };
  return (
    <div>
      <h3 className="mb-4 title">Sizes</h3>
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

export default Sizelist;
