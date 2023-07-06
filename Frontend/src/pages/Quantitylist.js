import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  deleteAQuantity, getAQuantity, getQuantitys,resetState } from "../features/Quantity/quantitySlice";
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

const Quantitylist = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [QuantityId, setQuantityId] = useState("");
  
  const showModal = (e) => {
    setOpen(true);
    setQuantityId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getQuantitys());
  }, []);
  const QuantityState = useSelector((state) => state.Quantity.Quantitys);


  const data1 = [];
  for (let i = 0; i < QuantityState.length; i++) {
    data1.push({
      key: i + 1,
      name: QuantityState[i]?.title,
      action: (
        <>
          <Link
            to={`/admin/quantity/${QuantityState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(QuantityState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteQuantity = (e) => {
    dispatch(deleteAQuantity(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getQuantitys());
    }, 1000);
  };
  return (
    <div>
      <h3 className="mb-4 title">Quantitys</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteQuantity(QuantityId);
        }}
        title="Are you sure you want to delete this Quantity?"
      />
    </div>
  );
};

export default Quantitylist;
