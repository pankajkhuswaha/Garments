import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
// import { Slider, Switch } from 'antd';
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setQueryParams } from "../features/product/productSlice";
import { Pagination } from "antd";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getBrands } from "../features/brand/brandSlice";
import { getQuantitys } from "../features/Quantity/quantitySlice";
import { Slider, message } from "antd";
import { toast } from "react-toastify";

export default function OurStore() {
  const [grid, setGrid] = useState(4);
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const [select, setSelect] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const category = useSelector((state) => state.pCategory.pCategories);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const clearfilter = async () => {
    setTimeout(() => {
      dispatch(getProducts());
    });
    message.info("Filter clear successfully");

    await dispatch(setQueryParams({ param: "clear", value: "123" }));
  };

  const handleItemClick = (data, item) => {
    setSelectedItem(item);
    dispatch(setQueryParams({ param: data, value: item }));
  };

  const query = useSelector((state) => state?.product?.query);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getQuantitys());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProducts(query));
  }, [dispatch, query]);

  const productState = useSelector((state) => state.product.products);
  const brandState = useSelector((state) => state.brand.brands);
  const quantityState = useSelector((state) => state.Quantity.Quantitys);

  const handleSelect = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setPriceRange((prevState) => ({ ...prevState, min: Number(value) }));
    } else if (name === "maxPrice") {
      setPriceRange((prevState) => ({ ...prevState, max: Number(value) }));
    } else {
      setSelect(value);
    }
  };
  let sortedProducts = [...productState];
  sortedProducts = sortedProducts.filter(
    (product) =>
      product.price >= priceRange.min && product.price <= priceRange.max
  );
  if (select === "AtoZ") {
    sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
  } else if (select === "ZtoA") {
    sortedProducts.sort((a, b) => b.brand.localeCompare(a.brand));
  } else if (select === "lowtohigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (select === "hightolow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (select === "price") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  //for my code of pagination

  const itemsPerPage = 12;
  const totalItems = sortedProducts.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);

  const cards = currentItems.map((item) => (
    <ProductCard grid={item} className="col-12" key={item.id} />
  ));

  return (
    <>
      <Meta title="Our Store"></Meta>
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-3 ">
        <div className="container-xxl " style={{ overflowX: "hidden" }}>
          <div className="row d-flex w-full flex-md-row">
            <div className="col-md-3  d-block ">
              <div className="filter-card mb-3">
                <h5 className="my-0">Sort By </h5>
                <select
                  name=""
                  value={select}
                  onChange={handleSelect}
                  className="form-control form-select bg-light "
                  id=""
                  style={{ width: "auto", border: "none" }}
                >
                  <option value="manual">Featured</option>
                  <option value="best-selling" selected>
                    Best Selling
                  </option>
                  <option value="AtoZ">Alphabatically, A-Z</option>
                  <option value="ZtoA">Alphabatically, Z-A</option>
                  <option value="lowtohigh">Price, Low to High</option>
                  <option value="hightolow">Price, High to Low</option>
                </select>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop by Category</h3>

                <select
                  name="category"
                  style={{ border: "none" }}
                  className="form-control  mb-2"
                  id=""
                  onChange={(e) => handleItemClick("search", e.target.value)}
                >
                  <option value="">Select Category</option>
                  {category.map((i, j) => {
                    return (
                      <option key={j} value={i.title}>
                        {i.title}
                      </option>
                    );
                  })}
                </select>

                <select
                  name="subcategory"
                  style={{ border: "none" }}
                  className="form-control mb-2"
                  id=""
                  onChange={(e) => handleItemClick("search", e.target.value)}
                >
                  <option value="">Select Sub Category</option>
                  {quantityState.map((i, j) => {
                    return (
                      <option key={j} value={i.title}>
                        {i.title}
                      </option>
                    );
                  })}
                </select>

                <select
                  name="brand"
                  style={{ border: "none" }}
                  onChange={(e) => handleItemClick("search", e.target.value)}
                  className="form-control  "
                  id=""
                >
                  <option value="">Select Brand</option>
                  {brandState.map((i, j) => {
                    return (
                      <option key={j} value={i.title}>
                        {i.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By Price</h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex justify-content-center ">
                    <div className="form-floating ">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        name="minPrice"
                        placeholder="From"
                        value={priceRange.min}
                        onChange={handleSelect}
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating ">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        name="maxPrice"
                        placeholder="To"
                        value={priceRange.max}
                        onChange={handleSelect}
                      />

                      <label htmlFor="floatingInput">To</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-12 col-md-9 d-block ">
              <div className="filter-sort-grid mb-3">
                <div className="row  d-flex justify-content-between align-items-center">
                  <div className="col-md-4 d-flex flex-start justify-content-between align-items-center align-content-start">
                    <p
                      className="my-0"
                      onClick={clearfilter}
                      style={{ color: "red" }}
                    >
                      Clear All Filter{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="product-list col-12 d-flex flex-wrap flex-sm-nowrap overflow-hidden">
                <section className="mx-1 mb-2 col-12 ">
                  <div className="row">
                  {cards}
                  </div>
                  <div className="text-center mt-4">
                    <Pagination
                      current={currentPage}
                      total={totalItems}
                      pageSize={itemsPerPage}
                      onChange={handlePageChange}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="d-grid place-items-center justify-content-center m-4"></div> */}
    </>
  );
}
