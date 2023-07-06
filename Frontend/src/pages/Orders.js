import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrder, getOrders } from "../features/auth/authSlice";
import { orderupdate } from "../features/Order/orderSlice";
import { DatabaseOutlined } from "@ant-design/icons";
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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Size",
    dataIndex: "size",
  },
  {
    title: "Quantity",
    dataIndex: "count",
  },

  {
    title: "Address",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  const setorderStatus = (e, i) => {
    const data = { id: i, orderStatus: e.target.value };
    dispatch(orderupdate(data));
  }
  const orderState = useSelector((state) => state.auth.adminOrders);

  const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {

    data1.push({
      key: i + 1,
      name: orderState[i]?.orderby?.firstname,
      product: orderState[i]?.products.map((i, j) => {
        return (
          <ul key={j}>
            <li>{i.product?.title}</li>
          </ul>
        );
      }),
     
      color: orderState[i]?.products.map((i, j) => {
        return (
          <ul key={j}>
            <li>{i.color}</li>
          </ul>
        );
      }) ,
      size: orderState[i]?.products.map((i, j) => {
        return (
          <ul key={j}>
            <li>{i.size}</li>
          </ul>
        );
      }),
      count: orderState[i]?.products.map((i, j) => {
        return (
          <ul key={j}>
            <li>{i.count}</li>
          </ul>
        );
      }),

      amount: orderState[i]?.add?.Address,
      
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action:orderState[i]?.products.map((k,j)=>{ return (
        <select
          name=""
          defaultValue={k.orderStatus? k.orderStatus: "Not Processed"}
          className="form-control form-select w-auto"
          id=""
          onChange={(e) =>setorderStatus(e,{id:orderState[i]?._id,prod:k.product?._id})}
        >
          <option value="Not Processed">Not Processed</option>
          <option value="Cash On Delivery">Cash On Delivery</option>
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Cancelled">Cancelled</option>
          <option value="return">return</option>
          <option value="return sucessfully">return sucessfully</option>
          <option value="Order Confirmed">Order Confirmed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out For Delivery">Out For Delivery</option>
        </select>
      )
      }),
    });
  } 
  return (
    <div className="overflow-auto">
      <h3 className="mb-4 title">Orders</h3>
      <div>{  <Table columns={columns} dataSource={data1} /> }</div>
    </div>
  );
};

export default Orders;
