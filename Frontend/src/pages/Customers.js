import React, { useEffect } from "react";
import { Table,} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { LinkedinFilled, MessageTwoTone, NodeCollapseOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { getUsers } from "../features/cutomers/customerSlice";

import { Link, useNavigate } from "react-router-dom";
import { Block ,Unblock,UserRights,role} from "../features/brand/brandSlice";

function useSmsNavigationHook() {
  const navigate=useNavigate();
  const handleSmsClick = () => {
    navigate("/sms");
  };
  return handleSmsClick;          
}

function SmsLink({ record }) {
  const handleSmsClick = useSmsNavigationHook();
  return (
    <p onClick={handleSmsClick}>
      <MessageTwoTone />
    </p>
  );
}



const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const role = useSelector((state) => state?.auth?.user?.role);

  const customerstate = useSelector((state) => state.customer.customers);

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Sms",
      dataIndex: "sms",
     
    },
   
    {
        title: "Role",
        dataIndex: "status",
      },
    
    {
      title: "Status",
      dataIndex: "role",
    },
   
    {
      title: "whatsapp",
      dataIndex: "whatsapp",
      render: (text, record) => (
        <a
          href={`https://wa.me/${record.mobile}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppOutlined />
        </a>
      ),
    },
  ];
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role === "user") {
      data1.push({
        key: i + 1,
        name: customerstate[i]?.firstname + " " + customerstate[i]?.lastname,
       
   status:(
  <>
    <div className="d-flex align-items-center gap-15">
      <div>
        <select
          name=""
          defaultValue={customerstate[i]?.role? customerstate[i]?.role:"user"}
          value={customerstate[i]?.status}
          className="form-control form-select w-auto"
          id=""
          onChange={(e) => {
            dispatch(UserRights({role:e.target.value,id:customerstate[i]._id}));
          setTimeout(()=>{
            dispatch(getUsers());


},3000)

          }}
        >
         
          <option value="user" >User</option>
          <option value="admin">Admin</option>
     
          
         
        </select>
      </div>
    </div>
   
  </>
  ), 
 role:(
  <>
    <div className="d-flex align-items-center gap-15">
      <div>
        <select
          name=""
          defaultValue={customerstate[i]?.block? "Block":"Unblock"}
          value={customerstate[i]?.block}
          className="form-control form-select w-auto"
          id=""
          onChange={(e) => {
            if(e.target.value==='block'){
              dispatch(Block(customerstate[i]?._id))
    }
            else if(e.target.value==='unblock'){
          dispatch(Unblock(customerstate[i]?._id))
       }
           
          

          }}
        > 
         
         
          <option value="block">Block</option>
          <option value="unblock">Unblock</option>
          
         
        </select>
      </div>
    </div>
   
  </>
),   
        email: <>  <Link
        to={`/admin/list-email/${customerstate[i].email}`}
        
      >
     {customerstate[i]?.email}
      </Link> 
                       </>
                        ,
        mobile: customerstate[i]?.mobile,
        sms: (
          <>
         
            <Link
              to={`/admin/list-sms/${customerstate[i].mobile}`}
              
            >
      < MessageTwoTone/>
            </Link>
           
            </>
            ),
        whatsapp: (
          <a
            href={`https://wa.me/${customerstate[i].mobile}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppOutlined />
          </a>
        ),
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div className="table-responsive">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
