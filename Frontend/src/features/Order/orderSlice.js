import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./orderService";
import { toast } from "react-toastify";
import {message} from 'antd'
export const applyCoupen = createAsyncThunk(
  "order/applyCoupen",
  async (thunkAPI) => {
    try {
      return await couponService.applyCoupen();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const orderupdate = createAsyncThunk(
  "order/updateorderstatus",
  async (data,thunkAPI) => {
    try {
  
      return await couponService.orderupdate(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  order: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const couponSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyCoupen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(applyCoupen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(orderupdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderupdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.oderstatus = action.payload;
        message.success("order status updated successfully")
      })
      .addCase(orderupdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        message.error("something went wrong")
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
