import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/admin`,config);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};
const updateProduct=async(data)=>{

const response=await axios.put(`${base_url}product/${data?.productId}`,{stock:data?.stock},config)
}

const productService = {
  getProducts,
  createProduct,
  updateProduct
};

export default productService;
