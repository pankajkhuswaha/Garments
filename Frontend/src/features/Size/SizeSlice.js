import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import sizeService from "./Sizeservice";


export const getsizes = createAsyncThunk(
  "size/get-sizes",
  async (thunkAPI) => {
    try {
      return await sizeService.getsizes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createsize = createAsyncThunk(
  "size/create-size",
  async (sizeData, thunkAPI) => {
    try {
      return await sizeService.createsize(sizeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAsize = createAsyncThunk(
  "size/get-size",
  async (id, thunkAPI) => {
    try {
      return await sizeService.getsize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAsize = createAsyncThunk(
  "size/update-size",
  async (size, thunkAPI) => {
    try {
      return await sizeService.updatesize(size);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAsize = createAsyncThunk(
  "size/delete-size",
  async (id, thunkAPI) => {
    try {
      return await sizeService.deletesize(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  sizes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getsizes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getsizes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sizes = action.payload;
      })
      .addCase(getsizes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createsize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createsize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdsize = action.payload;
      })
      .addCase(createsize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAsize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAsize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedsize = action.payload;
      })
      .addCase(updateAsize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAsize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAsize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sizeName = action.payload.title;
      })
      .addCase(getAsize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAsize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAsize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedsize = action.payload.title;
      })
      .addCase(deleteAsize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default sizeSlice.reducer;
