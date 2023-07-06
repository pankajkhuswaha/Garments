import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateAProduct } from "../features/products/productSlice";
import CustomModal from "../components/CustomModal";
import { getAllProducts } from "../features/product/productSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Stock control",
    dataIndex: "control",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [stockValue, setStockValue] = useState("");
  
  const showModal = (id, stock) => {
    setOpen(true);
    setProductId(id);
    setStockValue(stock);

  };

  const hideModal = () => {
    setOpen(false);
  };
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.Aproduct);

  const data1 = [];

  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i]?.title,
      brand: productState[i]?.brand,
      category: productState[i]?.category,
      color: productState[i]?.color.map((color) => `${color.title},`),
      price: `${productState[i]?.price}`,
      control: (
        <>
          <div className="d-flex align-items-center gap-15">
            <div>
              <select
                name=""
                defaultValue={productState[i]?.stock? productState[i]?.stock: "In Stock"}
                value={productState[i]?.Stock}
                className="form-control form-select w-auto"
                id=""
                onChange={(e) => {
                  showModal(productState[i]._id, e.target.value); 

                }}
              >
                <option value="In Stock">In Stock</option>
                <option value="Out Of Stock">Out Of Stock</option>
              </select>
            </div>
          </div>
        </>
      ),
      action: (
        <>
          {/* <Link to={`/admin/product/${productState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger" to="#" onClick={() => showModal(productState[i]._id)}>
            <AiFillDelete />
          </button> */}
        </>
      ),
    });
  }

  const handleUpdateStock = () => {
    dispatch(updateAProduct(productId, stockValue));
    hideModal();
  };
  return (
    <div className="container">
  <div className="row">
    <div className="col-md-12">
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  </div>
  <CustomModal
    hideModal={hideModal}
    open={open}
    performAction={() => {

    dispatch(updateAProduct({productId,stock:stockValue}));
    setOpen(false);
    }}
    title="Are you sure you want to delete this color?"
  />
</div>

  );
};

export default Productlist;
