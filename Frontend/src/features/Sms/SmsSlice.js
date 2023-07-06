import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import smsService from "./smsservice";


export const getsms = createAsyncThunk(
  "sms/get-sm",
  async (thunkAPI) => {
    try {
      return await smsService.getsms();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createsms = createAsyncThunk(
  "sms/create-sms",
  async (sizeData, thunkAPI) => {
    try {
    



      return await smsService.createsms(sizeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAsms = createAsyncThunk(
  "sms/get-sms",
  async (id, thunkAPI) => {
    try {
      return await smsService.getsm(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAsms = createAsyncThunk(
  "sms/update-sms",
  async (size, thunkAPI) => {
    try {
      return await smsService.updatesms(size);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAsms= createAsyncThunk(
  "sms/delete-sms",
  async (id, thunkAPI) => {
    try {
      return await smsService.deletesize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  sms: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const smsSlice = createSlice({
  name: "sms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getsms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getsms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sms = action.payload;
      })
      .addCase(getsms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createsms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createsms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdsize = action.payload;
      })
      .addCase(createsms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAsms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAsms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedsms = action.payload;
      })
      .addCase(updateAsms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAsms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAsms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sizeName = action.payload;
      })
      .addCase(getAsms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAsms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAsms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedsize = action.payload;
      })
      .addCase(deleteAsms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default smsSlice.reducer;
