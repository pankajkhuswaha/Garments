import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import QuantityService from "./quantityService";

export const getQuantitys = createAsyncThunk(
  "Quantitys/get-Quantitys",
  async (thunkAPI) => {
    try {
          
     return await QuantityService.getQuantitys();
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createQuantity = createAsyncThunk(
  "Quantitys/create-Quantity",
  async (QuantityData, thunkAPI) => {
    try {
      return await QuantityService.createQuantity(QuantityData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAQuantity = createAsyncThunk(
  "Quantitys/get-Quantity",
  async (id, thunkAPI) => {
    try {
      return await QuantityService.getQuantity(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAQuantity = createAsyncThunk(
  "Quantitys/update-Quantity",
  async (Quantity, thunkAPI) => {
    try {
      return await QuantityService.updateQuantity(Quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAQuantity = createAsyncThunk(
  "Quantitys/delete-Quantity",
  async (id, thunkAPI) => {
    try {
      return await QuantityService.deleteQuantity(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  Quantitys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const QuantitySlice = createSlice({
  name: "Quantitys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuantitys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuantitys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Quantitys = action.payload;
        
      
      })
      .addCase(getQuantitys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdQuantity = action.payload;
      })
      .addCase(createQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedQuantity = action.payload;
      })
      .addCase(updateAQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.QuantityName = action.payload.title;
      })
      .addCase(getAQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedQuantity = action.payload.title;
      })
      .addCase(deleteAQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);

  },
});
export default QuantitySlice.reducer;
