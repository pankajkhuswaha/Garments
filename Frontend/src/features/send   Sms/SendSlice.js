import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import smsService from "./sendservice";


export const sendsms = createAsyncThunk(
  "send/get-send",
  async (data,thunkAPI) => {
    try {
   
      return await smsService.sendsms(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const initialState = {
  sms: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const smsSlice = createSlice({
  name: "send",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendsms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendsms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sms = action.payload;
      })
      .addCase(sendsms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default smsSlice.reducer;
