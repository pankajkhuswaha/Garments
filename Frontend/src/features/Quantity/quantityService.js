import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";


const getQuantitys = async () => {
  const response = await axios.get(`${base_url}quantity`,config);
 
  return response.data;
};

const createQuantity = async (Quantity) => {

  const response = await axios.post(`${base_url}quantity/`, Quantity, config);

  return response.data;
};

const updateQuantity = async (Quantity) => {
  const response = await axios.put(
    `${base_url}quantity/${Quantity.id}`,
    { title: Quantity.QuantityData.title },
    config
  );

  return response.data;
};
const getQuantity = async (id) => {
  const response = await axios.get(`${base_url}quantity/${id}`, config);

  return response.data;
};

const deleteQuantity = async (id) => {
  const response = await axios.delete(`${base_url}quantity/${id}`, config);

  return response.data;
};
const QuantityService = {
  getQuantitys,
  createQuantity,
  updateQuantity,
  getQuantity,
  deleteQuantity,
};

export default QuantityService;
