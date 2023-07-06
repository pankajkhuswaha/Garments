import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import emailService from "./emailservice";


export const getemail = createAsyncThunk(
  "email/get-email",
  async (thunkAPI) => {
    try {
      return await emailService.getemail();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createemail = createAsyncThunk(
  "email/create-email",
  async (sizeData, thunkAPI) => {
    try {
   
      return await emailService.createemail(sizeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAemail = createAsyncThunk(
  "email/getAemail",
  async (id, thunkAPI) => {
    try {

      return await emailService.getAemail(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAemail = createAsyncThunk(
  "email/update-email",
  async (size, thunkAPI) => {
    try {
      return await emailService.updateemail(size);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAemail= createAsyncThunk(
  "email/delete-email",
  async (id, thunkAPI) => {
    try {
      return await emailService.deletesize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const bulk_mail= createAsyncThunk(
  "email/bulk-email",
  async (data, thunkAPI) => {

    try {
      return await emailService.bulkmail(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  email: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getemail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getemail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.email = action.payload;
      })
      .addCase(getemail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createemail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createemail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdsize = action.payload;
      })
      .addCase(createemail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAemail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAemail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedemail = action.payload;
      })
      .addCase(updateAemail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAemail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAemail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Amail = action.payload;
      })
      .addCase(getAemail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAemail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAemail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedsize = action.payload;
      })
      .addCase(deleteAemail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default emailSlice.reducer;
