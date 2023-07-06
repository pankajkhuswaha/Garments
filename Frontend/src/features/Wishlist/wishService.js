import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getwishlis= async () => {
  const response = await axios.get(`${base_url}user/wishlist/`,config);
   

  return response.data;
};

const createwishlist = async (cart) => {
  const response = await axios.put(`${base_url}product/wishlist/`, cart, config);

  return response.data;
};
const deletefromwishlist = async (id) => {
  const response = await axios.delete(`${base_url}user/wishlist/${id}`, config);

  return response.data;

};


const wishlistService = {
  getwishlis,
  createwishlist,
  deletefromwishlist
};

export default wishlistService;
