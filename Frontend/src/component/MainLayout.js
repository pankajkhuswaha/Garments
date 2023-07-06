import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { logout } from "../features/auth/authSlice";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiTwotoneSave,
  AiTwotoneQuestionCircle,
  AiOutlineSend,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleLogOutClick = () => {
    dispatch(logout())
    navigate('/login')
      window.location.reload()
      
    };
    const role = useSelector((state) => state?.auth?.user?.super);

  useEffect(() => {
    const handleResize = () => {
      // set the collapsed state based on the screen width
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // cleanup function to remove the resize event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null}
  collapsible
  collapsed={collapsed}
  breakpoint="md" // sidebar will collapse at medium screen width
  collapsedWidth={0}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">DC</span>
            <span className="lg-logo">Deepnap Softech</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}

   

          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
           
            role === true &&  {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },

            role === true && {
              key: "Adminshows",  
              icon: <AiOutlineUser className="fs-4" />,
              label: "Admin",
            },
 
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List ",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color List",
                },
                {
                  key: "size",
                  icon: <AiTwotoneSave className="fs-4" />,
                  label: "Size",
                },
                {
                  key: "list-size",
                  icon: <AiTwotoneSave className="fs-4" />,
                  label: "Size List",
                },
                {
                  key: "quantity",
                  icon: <AiTwotoneQuestionCircle className="fs-4" />,
                  label: "Sub-Category",
                },
                {
                  key: "list-quantity",
                  icon: <AiTwotoneQuestionCircle className="fs-4" />,
                  label: "Sub-Category List",
                },
               
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            role === true &&   {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "addsms",
                  icon: <AiOutlineSend className="fs-4" />,
                  label: "Sms",
                },
                {
                  key: "list-sms",
                  icon: <AiOutlineSend className="fs-4" />,
                  label: "sms-List",
                },
                {
                  key: "addemail",
                  icon: <AiOutlineSend className="fs-4" />,
                  label: "Email",
                },
                {
                  key: "list-email",
                  icon: <AiOutlineSend className="fs-4" />,
                  label: "Email-List",
                },
                // {
                //   key: "coupon",
                //   icon: <ImBlog className="fs-4" />,
                //   label: "Add Coupon",
                // },
                // {
                //   key: "coupon-list",
                //   icon: <RiCouponLine className="fs-4" />,
                //   label: "Coupon List",
                // },
              ],
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            role === "super" &&  {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              
           
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
              
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="p-2 bg-danger  "  onClick={handleLogOutClick} style={{borderRadius:"3px"}}>Logout</h5>
               
              </div>
             
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
