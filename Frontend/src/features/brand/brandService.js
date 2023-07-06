import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`,config);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);

  return response.data;
};
const Block= async (id) => {

    const response = await axios.put(`${base_url}user/block-user/${id}`, "",config);
  
    return response.data;
  }
  const Unblock= async (id) => {
    const response = await axios.put(`${base_url}user/unblock-user/${id}`,"", config);
  
    return response.data;
  }
  const UserRights= async (data) => {

    const response = await axios.put(`${base_url}user/edit-role/${data.id}`,data, config);
  
    return response.data;
  }



const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
Block,
Unblock,
UserRights
};

export default brandService;
