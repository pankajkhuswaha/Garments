import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getsizes = async () => {
  const response = await axios.get(
`${base_url}size/`,config
);


  return response.data;
};
const createsize = async (size) => {
  const response = await axios.post(`${base_url}size/`, size, config);

  return response.data;
};

const updatesize = async (size) => {
  const response = await axios.put(
    `${base_url}size/${size.id}`,
    { title: size.sizeData.title },
    config
  );

  return response.data;
};
const getsize = async (id) => {
  
  const response = await axios.get(`${base_url}size/${id}`, config);

  return response.data;
};

const deletesize = async (id) => {
  const response = await axios.delete(`${base_url}size/${id}`, config);

  return response.data;
};
const sizeService = {
  getsizes,
  createsize,
  updatesize,
  getsize,
  deletesize,
};

export default sizeService;
