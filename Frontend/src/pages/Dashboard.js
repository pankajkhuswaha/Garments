import React, {useEffect, useState} from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, getOrders } from "../features/auth/authSlice";
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
    title: "Status",
    dataIndex: "staus",
  },
];

const Dashboard = () => {
  var data = [
    {
      type: "Jan",
      sales: 0,
    },
    {
      type: "Feb",
      sales: 0,
    },
    {
      type: "Mar",
      sales: 0,
    },
    {
      type: "Apr",
      sales: 0,
    },
    {
      type: "May",
      sales:0,
    },
    {
      type: "Jun",
      sales: 0,
    },
    {
      type: "July",
      sales: 0,
    },
    {
      type: "Aug",
      sales: 0,
    },
    {
      type: "Sept",
      sales: 0,
    },
    {
      type: "Oct",
      sales: 0,
    },
    {
      type: "Nov",
      sales: 0,
    },
    {
      type: "Dec",
      sales: 0,
    },
  ]
  const monthNames = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder()).then(() => {
      // Set the loading state to false after the data is fetched
      setLoading(false);
    });
  }, []);
  const setorderStatus = (e, i) => {
   
    const data = { id: i, enqData: e };
    // dispatch(updateAorder(data));
  };
  const orderState = useSelector((state) => state.auth.adminOrders);


  const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      var createdAt = new Date(orderState[i].createdAt);
      var monthValue = createdAt.getMonth() + 1; // add 1 to adjust for zero-indexed month values
      
      const monthName = monthNames[monthValue];

      const index = data.findIndex((d) => d.type === monthName);
      if (index !== -1) {
        data[index].sales += orderState[i].products.length;
      }

    data1.push({
      key: i + 1,
      name: orderState[i]?.add?.firstname,
      product: orderState[i]?.products?.length,
      // amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      status: orderState[i]?.products[0]?.orderStatus

    });
  } 




  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    
    <div>
     
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
    <div className="col">
      <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded-3">
        <div>
          <p className="desc">Total</p>
          <h4 className="mb-0 sub-title">$1100</h4>
        </div>
        <div className="d-flex flex-column align-items-end">
          <h6>
            <BsArrowDownRight /> 32%
          </h6>
          <p className="mb-0 desc">Compared To April 2022</p>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded-3">
        <div>
          <p className="desc">Total</p>
          <h4 className="mb-0 sub-title">$1100</h4>
        </div>
        <div className="d-flex flex-column align-items-end">
          <h6 className="red">
            <BsArrowDownRight /> 32%
          </h6>
          <p className="mb-0 desc">Compared To April 2022</p>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded-3">
        <div>
          <p className="desc">Total</p>
          <h4 className="mb-0 sub-title">$1100</h4>
        </div>
        <div className="d-flex flex-column align-items-end">
          <h6 className="green">
            <BsArrowDownRight /> 32%
          </h6>
          <p className="mb-0 desc">Compared To April 2022</p>
        </div>
      </div>
    </div>
    </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
        {loading ===true && <Spin tip="Loading...">
     
     </Spin>}
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
