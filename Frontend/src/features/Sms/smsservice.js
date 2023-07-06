import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getsms = async () => {
  const response = await axios.get(`${base_url}nimbus/`,config);

 
  return response.data;
};
const createsms = async (size) => {
  const response = await axios.post(`${base_url}nimbus/`, size, config);

  return response.data;
};

const updatesms = async (size) => {
 
  const response = await axios.put(`${base_url}nimbus/${size.id}`,size,config);

  return response.data;
};
const getsm = async (id) => {
  const response = await axios.get(`${base_url}nimbus/${id}`, config);

  return response.data;
};

const deletesms = async (id) => {
  const response = await axios.delete(`${base_url}nimbus/${id}`, config);

  return response.data;
};
const sizeService = {
  getsms,
  createsms,
  updatesms ,
  getsm ,
  deletesms,
};

export default sizeService;
