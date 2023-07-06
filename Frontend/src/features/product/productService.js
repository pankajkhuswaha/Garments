import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async (query) => {

  const response = await axios.get(`${base_url}product/?${query}`);

  return response.data;
};
const getAllProducts = async () => {

  const response = await axios.get(`${base_url}product/admin`,config);;

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};
const rating=async(value)=>{
  const response=await axios.put(`${base_url}product/rating`,value,config)
  return response.data;
}
const getAproduct=async(id)=>{
   const response=await axios.get(`${base_url}product/${id}`)
    return response.data;
}

const deleteProduct=async(id)=>{
const response=await axios.delete(`${base_url}product/${id}`,config);
}

const productService = {
  getProducts,
  createProduct,
  rating,
getAproduct,
deleteProduct,
getAllProducts
};

export default productService;
