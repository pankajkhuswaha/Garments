import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getcart= async () => {
  const response = await axios.get(`${base_url}user/cart/`,config);
  return response.data;
};

const createcart = async (cart) => {
  const response = await axios.post(`${base_url}user/cart/`, cart, config);
   return response.data;
};
const daletecart=async(id)=>{
  const response=await axios.delete(`${base_url}user/carts`,id,config)
  return response.data;
}
const deletecartitem=async(productId)=>{
 const response=await axios.delete(`${base_url}user/carts/${productId}`,config)
 return response;
}

const cartService = {
  getcart,
  createcart,
  daletecart,
  deletecartitem,
   
};

export default cartService;
