import React, { useEffect } from "react";
import { Table,} from "antd";
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { LinkedinFilled, MessageTwoTone, WhatsAppOutlined } from "@ant-design/icons";
import { getUsers } from "../features/cutomers/customerSlice";

import { Link, useNavigate } from "react-router-dom";
import { Block, UserRights,Unblock } from "../features/brand/brandSlice";

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

const AdminCustomers = () => {
  const dispatch = useDispatch();
const navigate=useNavigate()
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);

  const data1 = [];
  for (let i = 0; i <customerstate.length; i++) {
    if (customerstate[i].role === "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i]?.firstname,
        email: customerstate[i].email,
        
        mobile: customerstate[i]?.mobile,
        role:(
          <>
            <div className="d-flex align-items-center gap-15">
              <div>
                <select
                  name=""
                  defaultValue={customerstate[i]?.isBlocked===true?"Block":"Unblock"}
                  value={customerstate[i]?.isBlocked===true?`block`:`Unblock`}
                  className="form-control form-select w-auto"
                  id=""
                  onChange={(e) => {

                    if(e.target.value==='block'){
                      dispatch(Block(customerstate[i]?._id))
                      setTimeout(()=>{

                        dispatch(getUsers());
    
    } , 5000  ) 



            }
                    else if(e.target.value==='unblock'){
                  dispatch(Unblock(customerstate[i]?._id))
                  setTimeout(()=>{

                    dispatch(getUsers());

} , 5000  ) 
               }
                   
                  
        
                  }}
                >
                 
                 <option value="unblock">Unblock</option>
                  <option value="block">Block</option>
                 
                  
                 
                </select>
              </div>
            </div>
           
          </>
        ), 
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
  
  } , 2000  )
        
                  }}
                >
                 
                  <option value="user" >User</option>
                  <option value="admin">Admin</option>
             
                  
                 
                </select>
              </div>
            </div>
           
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
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="m-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Admin</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="table-responsive">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default AdminCustomers;
