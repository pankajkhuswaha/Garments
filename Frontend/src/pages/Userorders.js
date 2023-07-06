import React, { useEffect, useState } from "react";
import { Card, Button, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
import { orderupdate } from "../features/Order/orderSlice";
import {  toast } from 'react-toastify';
import { DatabaseOutlined } from "@ant-design/icons";
import Orderstatus from "./Orderstatus";
const { Option } = Select;

const Userorders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getOrders()).then(() => {
      // Set the loading state to false after the data is fetched
      setLoading(false);
    });
  }, []);

  const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);

  const setorderStatus = (e, i) => {
    const data = { id: i, orderStatus: e };
    dispatch(orderupdate(data));
  };

  const { orders } = useSelector((state) => state.auth);
  return (
    <>
      <div>
        <h3 className="mb-4 title">Orders</h3>
        {loading ===true && <Spin tip="Loading...">
     
     </Spin>}
        {orders.map((order, index) => (
          <Card key={index} className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Order #{index + 1}</h4>
              <span>Date: {new Date(order?.createdAt).toLocaleString()}</span>
            </div>

            {order.products.map((item, idx) => (
              <div key={idx} className="d-flex justify-content-between align-items-center mb-3">
                <div
                  className="d-flex align-items-center  "
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/app/orderstatus", { state: { item } });
                  }}
                >
                  <img
                    src={item?.product?.images[0]?.url}
                    alt=""
                    style={{ width: "80px", height: "80px", marginRight: "20px" }}
                  />

                  <div>
                    <h5>{item?.product?.title}</h5>
                    <p>Price: {item?.price}</p>
                  </div>
                </div>
                <div>
                <Select
  defaultValue={item?.orderStatus?item?.orderStatus:"Status"}
  className="form-control form-select"
  onChange={(e) => setorderStatus(e, {id:order?._id ,prod:item?.product?._id})}
  disabled={new Date(order.createdAt) < fiveDaysAgo}
>
<Option value="Cancelled" disabled={new Date(orders.createdAt) < fiveDaysAgo}>
                      Cancelled
                    </Option>
                    <Option value="return" disabled={new Date(orders.createdAt) < fiveDaysAgo}>
                      Return
                    </Option>
</Select>





                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </>
  );
};


export default Userorders;



