import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getemail = async () => {
  const response = await axios.get(`${base_url}email/`,config);

  
  return response.data;
};
const createemail = async (size) => {
  const response = await axios.post(`${base_url}email/`, size, config);

  return response.data;
};

const updateemail = async (data) => {

  const response = await axios.put(`${base_url}email/${data.id}`,data.body,config);

  return response.data;
};
const getAemail= async (id) => {
  const response = await axios.get(`${base_url}email/${id}`, config);

  return response.data;
};

const deleteemail = async (id) => {
  const response = await axios.delete(`${base_url}email/${id}`, config);

  return response.data;
};
const bulkmail= async (data) => {

  const response = await axios.post(`${base_url}email/bulk`, data,config);

  return response.data;
};

const sizeService = {
  getemail,
  createemail,
  updateemail ,
  getAemail ,
  deleteemail,
  bulkmail
};

export default sizeService;
