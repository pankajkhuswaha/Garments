import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch, BsArrowRepeat, BsHeart, BsBag, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { setQueryParams, getProducts } from "../features/product/productSlice";
import { getQuantitys } from "../features/Quantity/quantitySlice";
import logo from "../Assest/assets/images/logoabs.png";
import { FaUserCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaBars, FaCartArrowDown } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("");
  const [searchText, setSearchText] = useState("");

  const query = useSelector((state) => state?.product.query);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getQuantitys());
  }, []);
  const auth = useSelector((state) => state.auth.user);
  const compare = useSelector((state) => state.compare.Items);
  const wish = useSelector((state) => state.wishlist.wishlist);

  const items = useSelector((state) => state.cart.cart);
  const category = useSelector((state) => state.pCategory.pCategories);

  const handleSearchClick = () => {
    const inputValue = document.getElementById("search-input").value;
    if (inputValue.trim() !== "") {
      navigate("/app/product");
      dispatch(setQueryParams({ param: "search", value: inputValue }));
      document.getElementById("search-input").value = "";
    }
  };

  const handleItemClick = (data, item) => {
    setSelectedItem(item);
    dispatch(setQueryParams({ param: data, value: item }));
    navigate("/app/product");
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      navigate("/app/product");
      handleSearchClick();
    }
  };

  // Call getProducts whenever the query parameter changes
  useEffect(() => {
    dispatch(getProducts(query));
    dispatch(getQuantitys());
  }, [dispatch, query]);

  const handleLogOutClick = (e) => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const handleClearClick = () => {
    setSearchText("");
    setTimeout(() => {
      dispatch(getProducts());
    }, 10);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    const sidebar = document.getElementById("nav-sidebar");
    if (isOpen) {
      sidebar.style.left = "-100vw";
    } else {
      sidebar.style.left = "0";
    }
  };

  return (
    <>
      <nav id="navBar">
        <div className="container-xxl">
          <div className="d-flex gap-2">
            <div
              className="col-6 col-md-4 d-flex align-items-center gap-2 gap-md-4"
              style={{ cursor: "pointer" }}
            >
              {!isOpen && <FaBars fontSize={22} onClick={toggleMenu} />}
              {isOpen && <RxCross2 fontSize={22} onClick={toggleMenu} />}
              <Link to={"/"} className="h4 text-light mt-2" style={{ fontWeight: "600" }}>
                Mangla <br /> Garments
              </Link>
            </div>
            <div className="col-4 d-none d-lg-flex  align-content-center justify-content-center">
              <div
                className="input-group mt-3 mb-0"
                style={{ height: "40px", marginTop: "5px" }}
              >
                <input
                  type="text"
                  className="form-control "
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  id="search-input"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {searchText.length > 0 && (
                  <span
                    className="input-group-text bg-white text-dark border "
                    onClick={handleClearClick}
                  >
                    <BsX className="fs-5" />
                  </span>
                )}
                <span
                  className="input-group-text p-1 bg-dark text-white"
                  id="basic-addon2"
                  onClick={handleSearchClick}
                >
                  <BsSearch className="fs-5" />
                </span>
              </div>
            </div>
            <div className="col-md-4 col-6 d-flex justify-content-end align-items-center me-5">
              {/* * compare button */}
              <Link
                to="/app/compare-products"
                className="d-md-flex d-none"
                style={{ marginRight: "-4px" }}
              >
                <BsArrowRepeat color={"#212529"} fontSize={30} />
                <span className="compareSpan notiSpan text-dark">
                  {compare?.length ? compare.length : 0}
                </span>
              </Link>
              {/* * Wishlist button */}
              <Link to={"/app/wishlist"} className="d-md-block d-none ">
                <BsHeart color={"#212529"} fontSize={22} />
                <span className="mb-0 notiSpan whishlistSpan text-dark ">
                  {wish?.length ? wish.length : 0}
                </span>
              </Link>
              {/* * Cart button */}
              <Link to="/app/cart" className="d-block">
                <BsBag color={"#212529"} fontSize={25} />
                <span className="mb-0 notiSpan whishlistSpan text-dark ">
                  {items.data ? items.data.length : 0}
                </span>
              </Link>

              {/* * User button */}
              <div className="d-flex align-items-center justify-content-center text-white">
                <FaUserCircle
                  color={"#212529"}
                  fontSize={30}
                  style={{ marginRight: "-8px" }}
                />
                <div className="dropdown ">
                  <button
                    className="btn dropdown-toggle userButton"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.firstname ? auth?.f : "Login"}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li className="dropdown-item">
                      {auth?.email ? auth?.email : ""}
                    </li>
                    <li className="dropdown-item">
                      {auth ? (
                        <p
                          onClick={() => {
                            navigate("/forgot-password");
                          }}
                        >
                          Change Password
                        </p>
                      ) : null}
                    </li>
                    <li className="dropdown-item" onClick={handleLogOutClick}>
                      {auth ? "Logout" : ""}
                    </li>
                    <li>
                      <a className="dropdown-item" href="/login">
                        {auth ? "" : "Sign Up"}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="text-white bg-white" style={{height:"80px"}}>
        sdf
      </div>
      <div id="nav-sidebar" className="col-8 col-md-2 shadow">
        <div className="logo-Sidebar d-flex align-items-center justify-content-between gap-4 px-4">
          <Link  onClick={toggleMenu} to={"/"} className="text-dark mt-1 h4" style={{ fontWeight: "600" }}>
            Mangla <br /> Garments
          </Link>
          {!isOpen && <FaBars fontSize={22} onClick={toggleMenu} />}
          {isOpen && <RxCross2 fontSize={22} onClick={toggleMenu} />}
        </div>
        <div className="">
          <div className="d-md-none d-flex align-content-center justify-content-center px-4">
            <div
              className="input-group mb-0"
              style={{ height: "40px", marginTop: "5px" }}
            >
              <input
                type="text"
                className="form-control "
                placeholder="Search Product Here..."
                aria-label="Search Product Here..."
                aria-describedby="basic-addon2"
                id="search-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {searchText.length > 0 && (
                <span
                  className="input-group-text bg-white text-dark border "
                  onClick={handleClearClick}
                >
                  <BsX className="fs-5" />
                </span>
              )}
              <span
                className="input-group-text p-1 bg-dark text-white"
                id="basic-addon2"
                onClick={handleSearchClick}
              >
                <BsSearch className="fs-5" />
              </span>
            </div>
          </div>
          <NavLink className="menubtn" to="/" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink className="menubtn" to="/app/product" onClick={toggleMenu}>
            Store
          </NavLink>
          <NavLink className="menubtn" to="/app/blogs" onClick={toggleMenu}>
            Blogs
          </NavLink>
          <NavLink className="menubtn" to="/app/blogs" onClick={toggleMenu}>
            Blogs
          </NavLink>
          <NavLink className="menubtn" to="/app/contact" onClick={toggleMenu}>
            Contact Us
          </NavLink>
          <NavLink className="menubtn" to="/app/about" onClick={toggleMenu}>
            About Us
          </NavLink>

          <Link
            to="/app/compare-products"
            className="d-md-none d-flex menubtn gap-1"
            style={{ marginRight: "-4px" }}
            onClick={toggleMenu}
          >
            <span className="text-dark">
              Compare 
            </span>
            <BsArrowRepeat color={"#212529"} fontSize={30} />
            {compare?.length ? compare.length : 0}
          </Link>
          {/* * Wishlist button */}
          <Link to={"/app/wishlist"} onClick={toggleMenu} className="d-md-none d-flex gap-1 menubtn">
            <span className="mb-0  text-dark ">
              Wish List 
            </span>
            <BsHeart color={"#212529"} fontSize={20} />
            {wish?.length ? wish.length : 0}
          </Link>
        </div>
      </div>

      <script src="nav.js"></script>
    </>
  );
};

export default Header;
