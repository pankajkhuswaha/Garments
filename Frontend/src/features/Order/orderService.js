import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const applyCoupen = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);

  return response.data;
};
const orderupdate = async (data) => {

  const response = await axios.put(`${base_url}user/order/update-order/${data?.id?.id}`,{prod:data?.id?.prod,orderStatus:data?.orderStatus}, config);
   return response.data;
};



const couponService = {
  applyCoupen,
  orderupdate

};

export default couponService;
